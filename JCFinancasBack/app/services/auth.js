var jwt        = require("jsonwebtoken");
var fs = require('fs');
var segredo = "jardelchavesecretademuitomais";
exports.authenticate = function(req, res,next){
	  req.getConnection(function(err,connection){
       var sql = fs.readFileSync('services/consultas/usuario.sql', 'utf8');
         // var sql = "select NRO_USUARIO,NOME,EMAIL,USER from tb_usuario where EMAIL = ? and PASS = ? ";
          var us = [req.body.EMAIL ,req.body.PASS];
          
          console.log(us);
          // var us = {EMAIL: req.body.email, password: req.body.password};
          //and PASS = '1'
        connection.query(sql, us, function(err, results) {

                  if (err) return next(err);
                  
                 //  console.log(results);
                  var modulos = new Array();
                 // var modulos = new Object();
                  var configUsuario = new Object()
                  if(results.length > 0){
                      
                      
                      for (i = 0; i<results.length;i++){
                          retorno = results[i];
                          configUsuario.MODULO_PADRAO = "INVESTIMENTOS";
                          var modulo =   modulos[retorno.NRO_MODULO];
                          console.log(retorno.NOME_UNICO);
                          console.log(!modulo);
                          if( modulo == null && modulo == undefined){
                               
                              modulo ={
                                      NOME_MODULO : retorno.NOME_MODULO,
                                      NRO_MODULO : retorno.NRO_MODULO,
                                      menu : new Array()
                                  };
                               modulos[retorno.NRO_MODULO] = modulo;
                          }
                          modulo.menu.push({
                              NOME_MENU : retorno.NOME_MENU,
                              HREF : retorno.HREF,
                              CSS_CLASS : retorno.CSS_CLASS,
                              CSS_IMG : retorno.CSS_IMG
                          });
                      }
                      
                      configUsuario.modulos = modulos;
                   // console.log(results);
                      console.log(configUsuario);
                    var user = results[0];
                    //console.log(jwt);
                    var token = jwt.sign({name: user.NOME, username: user.USER,nrousuario:user.NRO_USUARIO}, segredo);

                  /*  var upd = 'UPDATE tb_usuario SET token = ? where NRO_USUARIO = ?'
                    connection.query(upd, [token,user.NRO_USARIO], function(err, results) {
                      if (err) return next(err);
                    });
                    */

                    res.json({
                        type: true,
                        usuario: {name: user.NOME},
                        token: token,
                        config : configUsuario
                         });
                  }else{
                    res.json({
                      type: false,
                      data: "",
                      msg:"Usuário ou senha inválidos"
                  });
                  }
                   
                  // -> 1
                  
                 // res.send(results);

                  
                  
                });
              
       
    });
};

exports.ensureAuthorized = function(req, res,next){

    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    //console.log(bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
       // req.token = bearerToken;
        var decoded = jwt.decode(bearerToken, segredo);
     //   console.log(decoded);


        req.getConnection(function(err,connection){
          var sql = "select NRO_USUARIO,NOME,EMAIL,USER from tb_usuario where NRO_USUARIO = ? ";
//console.log(sql);
//console.log(bearerToken);
          connection.query(sql, decoded.nrousuario, function(err, results) {

                  if (err) return next(err);

                  if(results.length == 1){
                    var user = results[0];
                    req.aut_user = user;
                    next();
                  }else{
                    res.sendStatus(401);
                  }
          });

        });
        
       
    } else {
        res.sendStatus(401);
    }

};

exports.registrar = function(req, res,next){
     var usuario = req.body;

      req.getConnection(function(err,connection){
          if (err) return next(err);
         
          var sql = 'INSERT INTO TB_USUARIO set ? ON DUPLICATE KEY UPDATE ?';
          usuario.user = usuario.email;
          verificarEmail(usuario,res,next,connection, function(usuario, res,next, connection) {

                connection.query(sql, [usuario,usuario], function(err, results) {

                              if (err) return next(err);

                              var mensagem ={};
                              mensagem.msg = 'Incluido com sucesso!';
                              mensagem.type = true;
                              
                              res.send(mensagem);
                          }); 
          } );



        /*  connection.query(sql, [usuario,usuario], function(err, results) {

              if (err) return next(err);

              var mensagem ={};
              mensagem.msg = 'Incluido com sucesso!';
              mensagem.type = true;
              
              res.send(mensagem);
          }); */
       });
    };


    function verificarEmail(usuario, res,next, connection, callback){
          
          var sql = 'SELECT COUNT(1) VALOR FROM TB_USUARIO WHERE EMAIL = ?';
          
          connection.query(sql, [usuario.email], function(err, results) {

              if (err) return next(err);


              if (results[0].VALOR > 0){
                  var mensagem ={};
                  mensagem.msg = 'E-mail já cadastrado! Utilize a opção de recuperar senha!';
                  mensagem.type = true;
                
                  res.send(mensagem);
              }else{
                callback(usuario, res,next, connection);
              }

            
          });
       
    };
