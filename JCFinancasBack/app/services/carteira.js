
exports.buscar = function(req, res,next){
  req.getConnection(function(err,connection){
       
       var sql = 'SELECT * FROM tb_carteira where ind_ativa = ? and nro_usuario =1 and nro_carteira = ? OR 0 = ?' ;


       var nrocarteira = 0;
      if (req.query.nrocarteira ){
                   nrocarteira = req.query.nrocarteira;
        }

      
       req.getConnection(function(err, connection) {
          if (err) return next(err);
          connection.query(sql, [req.aut_user.NRO_USUARIO,nrocarteira,nrocarteira], function(err, results) {

            if (err) return next(err);
            
           //  console.log(results);
            // -> 1
            
            res.send(results);
          });

        })
       
    });
  
};

exports.salvar = function(req, res,next){
     var carteira = req.body;

     if (!carteira.NRO_USUARIO || carteira.NRO_USUARIO == null){
      carteira.NRO_USUARIO = req.aut_user.NRO_USUARIO;
     }

      req.getConnection(function(err,connection){
          if (err) return next(err);
          var sql = 'INSERT INTO tb_carteira set ? ON DUPLICATE KEY UPDATE ?';

          connection.query(sql, [carteira,carteira], function(err, results) {

              if (err) return next(err);

              var mensagem ={};
              mensagem.msg = 'Incluido com sucesso!';
              mensagem.type = true;
              
              res.send(mensagem);
          });
       });
};

exports.excluir = function(req, res,next){

  req.getConnection(function(err,connection){
      var carteira = req.body;
      req.assert("NRO_CARTEIRA", 'É obrigatório informar a cartira!').notEmpty();

      var sql = 'DELETE FROM TB_CARTEIRA WHERE NRO_CARTEIRA = ?';

      connection.query(sql, [carteira.NRO_CARTEIRA], function(err, results) {
      	 var mensagem ={};
		      if (err) {
		      	if (err.errno == 1451 ){
		      	   mensagem.msg = 'A carteira não pode ser excluida por pussuir operações associadas!';
		           mensagem.type = false;
		           
		           res.send(mensagem);

			      }else{
			      	return next(err);
			      }
		      }else{

			     if (results.affectedRows > 0) {
		              mensagem.msg = 'Excluido com sucesso!';
		              mensagem.type = true;
		           } else {
		              mensagem.msg = 'Operação não excluida!';
		              mensagem.type = false;
		           }
	            res.send(mensagem);

		      }
          });

      })
};

