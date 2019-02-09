var moment = require('moment');
var fs = require('fs');


exports.buscarProduto = function(req, res,next){
  req.getConnection(function(err,connection){
       
          var sql = "select PRD.NOME NOME_PRODUTO "+
					"        ,PRD.NRO_PRODUTO "+
					"        ,TP.NOME TIPO_PRODUTO "+
                    "        ,TP.NRO_TIPO_PRODUTO "+
					" from tb_produto prd "+
					"   inner join tb_tipo_produto tp on tp.NRO_TIPO_PRODUTO = prd.NRO_TIPO_PRODUTO "+
					" where prd.NOME like ?";

         var ativo = 'XXXX';
              if (req.query.ativo ){
                           ativo = req.query.ativo;
                }
             req.getConnection(function(err, connection) {
                if (err) return next(err);
                connection.query(sql, ["%"+ativo+"%"], function(err, results) {

                  if (err) return next(err);
                  
                  res.send(results);
                });

          })
       
    });
  
};

exports.buscarProdutoByFilter = function(req, res,next){
	
	 var filtro = req.body;
	 console.log(filtro);
	 
  req.getConnection(function(err,connection){
       
          var sql = fs.readFileSync('services/consultas/produto-filter.sql', 'utf8');

         var nome = "%"+filtro.nome+"%";
		 var sigla = "%"+filtro.sigla+"%";
         var tipo = filtro.tipo;
			  console.log(nome);
			  console.log(sigla);
			  console.log(tipo);
             req.getConnection(function(err, connection) {
                if (err) return next(err);
                connection.query(sql, [nome,sigla,tipo], function(err, results) {

                  if (err) return next(err);
                  
                  res.send(results);
                });

          })
       
    });
  
};

exports.busacasTodosTiposProdutos = function(req, res,next){
  req.getConnection(function(err,connection){
       
          var sql = "select NRO_TIPO_PRODUTO "+
                    "           ,NOME "+
                    "           ,SIGLA "+
                    "    from tb_tipo_produto "+
                    "    WHERE NRO_USUARIO IS NULL OR NRO_USUARIO = ? ";

               var param = [];
               param.push(req.aut_user.NRO_USUARIO);
      
             req.getConnection(function(err, connection) {
                if (err) return next(err);
                connection.query(sql, param, function(err, results) {

                  if (err) return next(err);
                  
                  res.send(results);
                });

          })
       
    });
  
};