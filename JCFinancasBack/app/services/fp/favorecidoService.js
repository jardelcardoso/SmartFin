exports.buscar = function(req, res,next){
     
    var sql = 'SELECT * FROM TB_FP_FAVORECIDO where nro_usuario = ? and (NRO_FAVORECIDO = ? OR 0 = ?)' ;

    var nro_favorecido = 0;
   if (req.query.id_tipo_conta ){
    nro_favorecido = req.query.nro_favorecido;
     }

   
    req.getConnection(function(err, connection) {
       if (err) return next(err);
       connection.query(sql, [req.aut_user.NRO_USUARIO,nro_favorecido,nro_favorecido], function(err, results) {

         if (err) return next(err);

         res.send(results);
       });

     })
};
exports.salvar = function(req, res,next){
 
req.getConnection(function(err, connection) {
    if (err) {
        return next(err);
    }
        
    var favorecido = req.body;
                
    req.assert("nome_favorecido", 'Informe o nome do favorecido!').notEmpty();
    req.assert("nro_usuario", 'Usuário é obrigatório!').notEmpty();
        
    
    var  errors = req.validationErrors();
    if(errors){
        res.format({
            
            json: function(){
                res.status(400).json(errors);
            }
        });
        
        return;
    }

    var sql = 'INSERT INTO TB_FP_FAVORECIDO SET ? ON DUPLICATE KEY UPDATE ?';
    
    connection.query(sql, [favorecido,favorecido], function(err, results) {
        
        if (err){
            res.format({
                    json: function(){
                        res.status(400).json(err);
                    }
                });
            return next(err);
        } 

        res.status(200).json({"erro":0,"msg":"Tipo de conta cadastrado com sucesso"});

    });

})
};

exports.excluir = function(req, res,next){
    var favorecido = req.body;
                    
    req.assert("nro_favorecido", 'Informe o número do favorecido!').notEmpty();
    req.assert("nro_usuario", 'Usuário é obrigatório!').notEmpty();

    var errors = req.validationErrors();
    if(errors){
        res.format({
            
            json: function(){
                res.status(400).json(errors);
            }
        });
        
        return;
    }

    var sql = 'DELETE FROM TB_FP_FAVORECIDO WHERE NRO_FAVORECIDO = ? AND NRO_USUARIO = ?';

    req.getConnection(function(err,connection){

        connection.query(sql, [favorecido.nro_favorecido,favorecido.nro_usuario], function(err, results) {
            
            if (err){
                res.format({
                        json: function(){
                            res.status(400).json(err);
                        }
                    });
                return next(err);
            } 
            var msg = "Exclusão realizada com sucesso!";
            if (results.affectedRows === 0){
                msg = "Nenhum registro excluido, verifique os dados enviados nesta operação! ";
            }
            res.status(200).json({"erro":0,"msg":msg});

        });
    });
};