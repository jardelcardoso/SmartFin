exports.buscar = function(req, res,next){
     
    var sql = 'SELECT * FROM TB_FP_CATEGORIA where nro_usuario = ? and (nro_pf_categoria = ? OR 0 = ?)' ;

    var nro_pf_categoria = 0;
   if (req.query.id_tipo_conta ){
    nro_pf_categoria = req.query.nro_pf_categoria;
     }

   
    req.getConnection(function(err, connection) {
       if (err) return next(err);
       connection.query(sql, [req.aut_user.NRO_USUARIO,nro_pf_categoria,nro_pf_categoria], function(err, results) {

         if (err) return next(err);

         var treeCat = determinaArvore(results);

         res.send(treeCat);
       });

     })
};

determinaArvore = function(treeCat){
    treeCat.forEach(function(item, index){
        var filhos = buscaFilhos(item,treeCat);
        if(filhos.length > 0){
            item.filhos = filhos;
            determinaArvore(filhos);
        }
    });

   return treeCat.filter(categoria => categoria.NRO_PF_CATEGORIA_PAI == undefined || categoria.NRO_PF_CATEGORIA_PAI == null);

}

buscaFilhos = function(node, nodeArray){
    return nodeArray.filter(filho => filho.NRO_PF_CATEGORIA_PAI == node.NRO_PF_CATEGORIA);
}

exports.salvar = function(req, res,next){

    req.getConnection(function(err, connection) {
        if (err) {
            return next(err);
        }
            
        var categora = req.body;
                    
        req.assert("desc_categoria", 'Informe o nome da categoria!').notEmpty();
        req.assert("sinal_rec_desp", 'Informa se é receita ou despesa!').notEmpty();
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

        var sql = 'INSERT INTO TB_FP_CATEGORIA SET ? ON DUPLICATE KEY UPDATE ?';
        
        connection.query(sql, [categora,categora], function(err, results) {
            
            if (err){
                res.format({
                        json: function(){
                            res.status(400).json(err);
                        }
                    });
                return next(err);
            } 

            res.status(200).json({"erro":0,"msg":"Categoria cadastrada com sucesso"});

        });

    })
};

exports.excluir = function(req, res,next){
    var categoria = req.body;
                    
    req.assert("nro_pf_categoria", 'Informe o número do favorecido!').notEmpty();
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

    var sql = 'DELETE FROM TB_FP_CATEGORIA WHERE NRO_PF_CATEGORIA = ? AND NRO_USUARIO = ?';

    req.getConnection(function(err,connection){

        connection.query(sql, [categoria.nro_pf_categoria,categoria.nro_usuario], function(err, results) {
            
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