var moment = require('moment');
var fs = require('fs');
//var carteira = require('./carteira');
moment.locale('pt-BR');

exports.salvar = function(req, res,next){

  req.getConnection(function(err,connection){
  		var operacao = req.body;
  		
  		
		  
	   req.assert("NRO_CORRETORA", 'É obrigatório informar uma corretora!').notEmpty();
	   req.assert("NRO_CARTEIRA", 'É obrigatório informar uma carteira!').notEmpty();
       req.assert("NRO_PRODUTO", 'É obrigatório informar um produto!').notEmpty();
	   req.assert("TIPO_OPERACAO", 'É obrigatório informar um tipo de operação!').notEmpty();
	   req.assert("QUANTIDADE", 'É obrigatório informar a quantidade!').notEmpty();
	   req.assert("VR_UNITARIO", 'É obrigatório informar o valor unitário!').notEmpty();
	   req.assert("DATA_OPERACAO", 'Informe a data da operação!').notEmpty();


       var  errors = req.validationErrors();
	
console.log(errors);

		if(errors){
	           res.format({
	               
	               json: function(){
	                   res.status(400).json(errors);
	               }
	           });
	           
	           return;
		       }

		   //Formatação de dados
		   operacao.DATA_OPERACAO = moment(operacao.DATA_OPERACAO).format("YYYY-MM-DD");
		   operacao.VR_UNITARIO = operacao.VR_UNITARIO.replace(',','.');
		   operacao.QUANTIDADE = operacao.QUANTIDADE.replace(',','.');

		   delete operacao.NOME_PRODUTO;
           delete operacao.VR_TOTAL;

		   operacao.VR_TOTAL = operacao.VR_UNITARIO * operacao.QUANTIDADE;

		    if (operacao.VR_CORRETAGEM == ''){
		    	delete operacao.VR_CORRETAGEM;
		    }

		    if (operacao.TX_CORRETAGEM == ''){
		    	delete operacao.TX_CORRETAGEM;
		    }


		   console.log(operacao);

	     req.getConnection(function(err, connection) {
	        if (err) {
	        	return next(err);
	        }

	        var sql = 'INSERT INTO TB_OPERACAO SET ? ON DUPLICATE KEY UPDATE ?';
	        

	        console.log(sql);
	        

	        connection.query(sql, [operacao,operacao], function(err, results) {
	            
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
       
    });

};

exports.resumoPorCarteira = function(req, res,next){
		  
	req.assert("NRO_CARTEIRA", 'Informe a carteira!').notEmpty();

  	req.getConnection(function(err,connection){
       if (err) return next(err);
       var sql = "SELECT  PRD.NOME ATIVO " +
				" 	     ,if(op.TIPO_OPERACAO ='C','Compra','Venda') TIPO_OPERACAO " +
				"	     ,SUM(OP.QUANTIDADE) QUANTIDADE " +
				"	     ,ROUND( SUM(OP.VR_UNITARIO) / (SELECT COUNT(1) " +
				"	        FROM TB_OPERACAO OP2 " +
				"	        WHERE OP2.NRO_PRODUTO = OP.NRO_PRODUTO " +
				"	           AND OP2.TIPO_OPERACAO = OP.TIPO_OPERACAO),2) CUSTO_MEDIO " +
				"	    ,ROUND(SUM(OP.QUANTIDADE) * ROUND( SUM(OP.VR_UNITARIO) / (SELECT COUNT(1) " +
				"	        FROM TB_OPERACAO OP2 " +
				"	        WHERE OP2.NRO_PRODUTO = OP.NRO_PRODUTO " +
				"	           AND OP2.TIPO_OPERACAO = OP.TIPO_OPERACAO),2),2) CUSTO_TOTAL " +
				"				,(SELECT P.VALOR " + 
				"		FROM TB_HIST_PRECIFICACAO P " +
				"		WHERE P.NRO_PRODUTO = OP.NRO_PRODUTO " +
				"		   AND P.DATA = (SELECT MAX(P2.DATA) FROM TB_HIST_PRECIFICACAO P2 WHERE NRO_PRODUTO = P.NRO_PRODUTO) " +
				"          LIMIT 1 "+
				"		) VALOR_ATUAL " +
				"        ,CA.NRO_CARTEIRA "+
				"        ,CA.NOME AS NOME_CARTEIRA "+
				"	FROM TB_OPERACAO OP " +
				"	  INNER JOIN TB_CARTEIRA CA ON CA.NRO_CARTEIRA = OP.NRO_CARTEIRA " +
				"     INNER JOIN TB_PRODUTO PRD ON PRD.NRO_PRODUTO = OP.NRO_PRODUTO " +
				"	WHERE CA.NRO_CARTEIRA in (?) " +
				"         AND CA.NRO_USUARIO = ? "+
				"	GROUP BY OP.NRO_PRODUTO " +
				"			,OP.TIPO_OPERACAO; " ;
          

         var nroCarteira = 0;


              if (req.query.nroCarteira ){
                           nroCarteira = req.query.nroCarteira;

                           console.log(nroCarteira);
                }
                
                connection.query(sql, [nroCarteira, req.aut_user.NRO_USUARIO], function(err, results) {

                  if (err) return next(err);
                  
                  // console.log(results);

                  for (i=0; i<results.length;i++){
                  	var linha = results[i];
                  	linha.VR_TOTAL_ATUAL = linha.QUANTIDADE * linha.VALOR_ATUAL;
                  	linha.LUCRO = linha.VR_TOTAL_ATUAL - linha.CUSTO_TOTAL;
                  }
                  
                  res.send(results);
                });

        
       
    });
  
};

exports.buscarOperacoes = function(req, res,next){
  
  req.getConnection(function(err,connection){
       if (err) return next(err);
      
       var sql = fs.readFileSync('services/consultas/operacoes_by_date.sql', 'utf8');
       
       var param = [];
      var filtro = req.body;
       param.push(req.aut_user.NRO_USUARIO);
       param.push(moment(filtro.DT_INICIAL).format("YYYY-MM-DD") );
       param.push(moment(filtro.DT_FINAL).format("YYYY-MM-DD") );
       

          connection.query(sql, param, function(err, results) {

            if (err) return next(err);
            
            
            res.send(results);
          });

       
       
    });
  
};

exports.excluir = function(req, res,next){

  req.getConnection(function(err,connection){
  		var operacao = req.body;
  		req.assert("NRO_MOVIMENTO", 'É obrigatório informar um movimento!').notEmpty();

  		var sql = 'DELETE FROM TB_OPERACAO WHERE NRO_MOVIMENTO = ?';

  		connection.query(sql, [operacao.NRO_MOVIMENTO], function(err, results) {

            if (err) return next(err);
            
            var mensagem ={};

           if (results.affectedRows > 0) {
           		mensagem.msg = 'Excluido com sucesso!';
            	mensagem.type = true;
           } else {
           		mensagem.msg = 'Operação não excluida!';
            	mensagem.type = false;
           }
            res.send(mensagem);
          });

  		})
};

exports.buscarConfig = function(req, res, next){
	var configFilter = req.body;
	
	var config = {dtAtual : moment()};
    var mesAtual = moment().format("M");
	var anoAtual = moment().format("YYYY");
	var date = moment();
	var meses = new Array();
	for (i = 0; i<12;i++){
		date.month(i);
		var mesCodigo = date.format("M");
		var strMes = date.format("MMMM");
		strMes = strMes.charAt(0).toUpperCase() + strMes.slice(1);

		meses.push({mes:strMes,codigo:mesCodigo, atual:mesAtual==mesCodigo});
	}
		config.meses = meses;

	var date = moment();
	var arrAnos = new Array();
    for (j = 0; j < 6; j++){
		date.add(j==0?0:-1,"years");
		var strYear = date.format("YYYY");
		arrAnos.push({year:strYear,atual:strYear == anoAtual});

	}
	config.years = arrAnos;

	req.getConnection(function(err, connection) {
		if (err) return next(err);
	
		this.bucarCarteiras(connection,req.aut_user.NRO_USUARIO, function(carteiras){
			config.carteiras = carteiras;
			this.bucarTiposProdutos(connection,req.aut_user.NRO_USUARIO, function(tipos){
				config.tipos_produtos = tipos;
				res.send(config);
			});
			//res.send(config);
		});

	  });
}

bucarCarteiras = function (connection,nroUsuario, callback){
	var sql = 'SELECT * FROM tb_carteira '+
				'where ind_ativa = 1 and nro_usuario = ? ' +
				'order by NOME';
	connection.query(sql, [nroUsuario], function(err, results) {

		if (err) return next(err);
		
		callback(results);
	});
}

bucarTiposProdutos = function (connection,nroUsuario, callback){
	
	var sql = 'select NRO_TIPO_PRODUTO, SIGLA, NOME from tb_tipo_produto WHERE IND_ATIVO = 1 ' +
				' AND (NRO_USUARIO IS NULL OR NRO_USUARIO = ?) ORDER BY NRO_TIPO_PRODUTO';
				
	connection.query(sql, [nroUsuario], function(err, results) {

		if (err) return next(err);
		
		callback(results);
	});
}

exports.resumoPorCarteiraData = function(req, res,next){
	//{"carteira":18,"month":9,"year":2018}
		  
	var operacaoFilter = req.body;

  	req.getConnection(function(err,connection){
	   if (err) return next(err);
	   
       var sql = fs.readFileSync('services/consultas/resumo_carteira_data.sql', 'utf8');
          

		 var nroCarteira = 0;
		 var data = null;


              if (operacaoFilter ){
						   nroCarteira = operacaoFilter.carteira;
						   var month =  operacaoFilter.month;
						   var year = operacaoFilter.year;
						   var data = moment();

						
						   data.year(year);
						   data.month(month -1);

						   data.daysInMonth(data.endOf("month"));
                }
                
                connection.query(sql, [nroCarteira, req.aut_user.NRO_USUARIO,data.format("YYYY-MM-DD")], function(err, results) {

				  if (err) return next(err);
				  
				  for (i=0;i<=results.length;i++){
					  var linha = results[i];
					  console.log(linha);
				  }

                  res.send(results);
                });

	});
}