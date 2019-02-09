//modulo de configuração do servidor, 
var app = require('./config/config_server.js');

var dbConfig = require('./config/config_db.js');
dbConfig(app);

var rotas = require('./config/config_routers.js');
rotas(app);


app.listen(8081,function() {
  console.log('%s servidor: %s', app.name, 'Iniciado data: '+ new Date());
});
