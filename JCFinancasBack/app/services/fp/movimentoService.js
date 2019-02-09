var moment = require('moment');
const movCategoria = require('./movCategoriaService');

exports.buscar = function(req, res,next){
     
    var sql = 'SELECT * FROM TB_FP_MOVIMENTO where nro_usuario = ? and (NRO_MOVIMENTO = ? OR 0 = ?)' ;

    var nro_movimento = 0;
   if (req.query.id_tipo_conta ){
    nro_movimento = req.query.nro_movimento;
     }

   
    req.getConnection(function(err, connection) {
       if (err) return next(err);
       connection.query(sql, [req.aut_user.NRO_USUARIO,nro_movimento,nro_movimento], function(err, results) {

         if (err) return next(err);

         res.send(results);
       });

     })
};
exports.salvar = function(req, res,next){
    var movimento = req.body;
                
    req.assert("descricao", 'Informe uma descricao!').notEmpty();
    req.assert("nro_usuario", 'Usuário é obrigatório!').notEmpty();
    req.assert("tipo_recorrencia", 'Informe o Tipo de Recorrencia!').notEmpty(); 
    req.assert("sinal_rec_desp", 'Informe se o movimento eh receita ou despesa').notEmpty(); 
    
    req.assert("id_conta", 'Informe uma conta para o movimento').notEmpty(); 
  
    req.assert("vr_total", 'Informe o valor total').notEmpty();

    req.check("dt_vencimento", 'Informe a data de vencimento').exists()
          .isValidDate();

    req.check("qtde_parcelas",'Informe a quantidade de correta de parcelas').exists()
          .custom((value) => value >0);
    
    req.check("qtde_parcelas",'Para tipo de recorrencia UNICA a quantidade de parcelas deve ser 1.').exists()
          .custom((value) =>  movimento.tipo_recorrencia ==='U'? value == 1:value > 0);

    var  errors = req.validationErrors();
    if(errors){
        res.format({
            
            json: function(){
                res.status(400).json(errors);
            }
        });
        
        return;
    }

    
    var categoria = {"nro_categoria":movimento.nro_categoria,"vr_mov_categoria":movimento.vr_total};
    var categoria2 = {"nro_categoria":movimento.nro_categoria,"vr_mov_categoria":movimento.vr_total};
    delete movimento.nro_categoria;

    req.getConnection(function(err, connection) {
        if (err) {
            return next(err);
        }
        connection.beginTransaction(function(err) {

            

            var sql = 'INSERT INTO TB_FP_MOVIMENTO SET ? ON DUPLICATE KEY UPDATE ?';
            connection.query(sql, [movimento,movimento], function(err, results) {
            //,"nro_categoria":5
                if (err){
                    res.format({
                            json: function(){
                                res.status(400).json(err);
                            }
                        });
                    return connection.rollback(function() {
                        throw err;
                      });;
                } 
                const nroMovimento = results.insertId? results.insertId :movimento.nro_movimento;

                categorias = new Array();
               
                categoria.nro_movimento = nroMovimento;
                categoria.desc_mov_categoria = movimento.descricao;
                categoria.id_conta = movimento.id_conta;
                categorias.push(categoria);
                
                categoria2.nro_movimento = nroMovimento;
                categoria2.desc_mov_categoria = movimento.descricao;
                categoria2.id_conta = movimento.id_conta;
                categoria2.desc_mov_categoria = 'posto 3 g1';
                categoria2.vr_mov_categoria = 10;
                
                categorias.push(categoria2);
                console.log(categorias);

                movCategoria.salvar(connection,res,nroMovimento,categorias, function(conn, resp){

                    conn.commit(function(err) {
                        if (err) {
                          return connection.rollback(function() {
                            throw err;
                          });
                        }
                        resp.status(200).json({"erro":0,"msg":"Tipo de conta cadastrado com sucesso"});
                      });
                });

            });

        });
        
       
        
        

    })
};

exports.excluir = function(req, res,next){
    var movimento = req.body;
                    
    req.assert("nro_movimento", 'Informe o número do movimento!').notEmpty();
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

    var sql = 'DELETE FROM TB_FP_MOVIMENTO WHERE NRO_MOVIMENTO = ? AND NRO_USUARIO = ?';

    req.getConnection(function(err,connection){

        connection.query(sql, [movimento.nro_movimento,movimento.nro_usuario], function(err, results) {
            
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