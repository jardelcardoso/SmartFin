exports.salvar = function(req, res,next){

  req.getConnection(function(err,connection){
  		var corretora = req.body;
  		
  	
		  
	   req.assert("NOME", 'Nome da corretora é obrigatório!').notEmpty();
	   req.assert("CNPJ", 'CNPJ é obrigatório!').notEmpty();
	   req.assert("DESCRICAO", 'Informe o nome completo da corretora').notEmpty();
       

       var  errors = req.validationErrors();
	


		if(errors){
	           res.format({
	               
	               json: function(){
	                   res.status(400).json(errors);
	               }
	           });
	           
	           return;
		       }

		 if (!corretora.NRO_USUARIO || corretora.NRO_USUARIO == null){
	      	corretora.NRO_USUARIO = req.aut_user.NRO_USUARIO;
	     }

	     req.getConnection(function(err, connection) {
	        if (err) {
	        	return next(err);
	        }

	        var sql = 'INSERT INTO TB_CORRETORA SET ? ON DUPLICATE KEY UPDATE ?';

	        connection.query(sql, [corretora,corretora], function(err, results) {
	            
	            if (err){
	        		res.format({
			               json: function(){
			                   res.status(400).json(err);
			               }
			           });
	            	return next(err);
	            } 
	            var mensagem ={};
	              	mensagem.msg = 'Incluido com sucesso!';
	              	mensagem.type = true;
	            res.send(mensagem);

	        });

	  })
       
    });

};


exports.buscar = function(req, res,next){
  req.getConnection(function(err,connection){
       
        var nrocorretora = 0;
        if (req.query.nrocorretora ){
            nrocorretora = req.query.nrocorretora;
        }
	    req.getConnection(function(err, connection) {
	        if (err) return next(err);

	        connection.query('SELECT * FROM TB_CORRETORA where NRO_USUARIO = ? AND NRO_CORRETORA = ? OR 0 = ?'
	        	             , [req.aut_user.NRO_USUARIO,nrocorretora,nrocorretora], function(err, results) {

	          if (err) return next(err);

	          res.send(results);
	        });

         })
       
    });
  
};

exports.excluir = function(req, res,next){

  req.getConnection(function(err,connection){
  		var corretora = req.body;

	   req.assert("NRO_CORRETORA", 'Informe a corretora!').notEmpty();
	         

       var  errors = req.validationErrors();

		if(errors){
	           res.format({
	               
	               json: function(){
	                   res.status(400).json(errors);
	               }
	           });
	           
	           return;
		 }

	     req.getConnection(function(err, connection) {
	        if (err) {
	        	return next(err);
	        }

	        var sql = 'DELETE FROM TB_CORRETORA WHERE NRO_CORRETORA = ?';
	       
	        connection.query(sql, [corretora.NRO_CORRETORA], function(err, results) {
	            var mensagem ={};
	           		 if (err){
						if (err.errno == 1451 ){
						   mensagem.msg = 'A corretora não pode ser excluida por pussuir operações associadas!';
						   mensagem.type = false;
						   
						   //res.send(mensagem);

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
						 
					 }

		            res.send(mensagem);

	        });

	  })
       
    });

};