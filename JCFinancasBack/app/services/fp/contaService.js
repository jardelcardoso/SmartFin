
exports.buscarContas = function(req, res,next){
     
        var sql = 'SELECT * FROM tb_conta where nro_usuario =? and (id_conta = ? OR 0 = ?)' ;
 
        var idConta = 0;
       if (req.query.id_conta ){
                 idConta = req.query.id_conta;
         }
 
       
        req.getConnection(function(err, connection) {
           if (err) return next(err);
           connection.query(sql, [req.aut_user.NRO_USUARIO,idConta,idConta], function(err, results) {
 
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
            
        var conta = req.body;
  				  
	    req.assert("descricao", 'Informe a descrição da conta!').notEmpty();
        req.assert("nro_usuario", 'Usuário é obrigatório!').notEmpty();
        req.assert("id_tipo_conta", 'Informe o Tipo da Conta!').notEmpty();
        
        
        var  errors = req.validationErrors();
        if(errors){
            res.format({
                
                json: function(){
                    res.status(400).json(errors);
                }
            });
            
            return;
        }

        var sql = 'INSERT INTO TB_CONTA SET ? ON DUPLICATE KEY UPDATE ?';
        
        connection.query(sql, [conta,conta], function(err, results) {
            
            if (err){
                res.format({
                        json: function(){
                            res.status(400).json(err);
                        }
                    });
                return next(err);
            } 

            res.status(200).json({"erro":0,"msg":"Operação realizada com sucesso"});

        });

	})
};

exports.excluir = function(req, res,next){
    var conta = req.body;
  				  
    req.assert("id_conta", 'Informe o ID da conta!').notEmpty();
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

    var sql = 'DELETE FROM TB_CONTA WHERE ID_CONTA = ? AND NRO_USUARIO = ?';

    req.getConnection(function(err,connection){

        connection.query(sql, [conta.id_conta,conta.nro_usuario], function(err, results) {
            
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