module.exports = function(app){
var mysql = require('mysql'),
		myConnection = require('express-myconnection');

        app.use(
            
            myConnection(mysql,{
                                host: 'localhost',
                                user: 'controlfin',
                                password : '2530',
                                port : 3306, //port mysql
                                database:'controle_fin' }, 'single')
);
}