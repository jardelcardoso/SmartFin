
module.exports = function(app){

var auth = require('../services/auth'); 


app.post('/authenticate',auth.authenticate);
app.post('/registrar',auth.registrar);


var produto = require('../services/produto'); 
app.get('/produto/buscarProduto',auth.ensureAuthorized,produto.buscarProduto);
app.post('/produto/buscarProdutoByFilter',auth.ensureAuthorized,produto.buscarProdutoByFilter);
app.get('/produto/busacasTodosTiposProdutos',auth.ensureAuthorized,produto.busacasTodosTiposProdutos);

var carteira = require('../services/carteira'); 
app.get('/carteira/buscar',auth.ensureAuthorized,carteira.buscar);
app.post('/carteira/salvar',auth.ensureAuthorized,carteira.salvar);
app.post('/carteira/excluir',auth.ensureAuthorized,carteira.excluir);

var corretora = require('../services/corretora'); 
app.get('/corretora/buscar',auth.ensureAuthorized, corretora.buscar);
app.post('/corretora/salvar',auth.ensureAuthorized, corretora.salvar);
app.post('/corretora/excluir',auth.ensureAuthorized, corretora.excluir);

var operacao = require('../services/operacao'); 
app.post('/buscarOperacoes',auth.ensureAuthorized,operacao.buscarOperacoes);
app.post('/excluirOperacao',auth.ensureAuthorized,operacao.excluir);
app.post('/operacao/salvar',auth.ensureAuthorized,operacao.salvar);
app.get('/operacao/resumoPorCarteira',auth.ensureAuthorized, operacao.resumoPorCarteira);
app.post('/operacao/buscarOperacoes',auth.ensureAuthorized, operacao.buscarOperacoes);
app.post('/operacao/excluir',auth.ensureAuthorized, operacao.excluir);
app.post('/operacao/buscarConfig',auth.ensureAuthorized, operacao.buscarConfig);
app.post('/operacao/resumoPorCarteiraData',auth.ensureAuthorized, operacao.resumoPorCarteiraData);

var conta = require('../services/fp/contaService');
app.post('/conta/buscarContas',auth.ensureAuthorized,conta.buscarContas);
app.post('/conta/salvar',auth.ensureAuthorized,conta.salvar);
app.post('/conta/excluir',auth.ensureAuthorized,conta.excluir);

var tipoConta = require('../services/fp/tipoContaService');
app.post('/tpconta/buscarTPContas',auth.ensureAuthorized,tipoConta.buscarTPContas);
app.post('/tpconta/salvar',auth.ensureAuthorized,tipoConta.salvar);
app.post('/tpconta/excluir',auth.ensureAuthorized,tipoConta.excluir);

var favorecido = require('../services/fp/favorecidoService');
app.post('/favorecido/buscar',auth.ensureAuthorized,favorecido.buscar);
app.post('/favorecido/salvar',auth.ensureAuthorized,favorecido.salvar);
app.post('/favorecido/excluir',auth.ensureAuthorized,favorecido.excluir);

var categoria = require('../services/fp/categoriaService');
app.post('/categoria/buscar',auth.ensureAuthorized,categoria.buscar);
app.post('/categoria/salvar',auth.ensureAuthorized,categoria.salvar);
app.post('/categoria/excluir',auth.ensureAuthorized,categoria.excluir);

var movimento = require('../services/fp/movimentoService');
app.get('/movimento/buscar',auth.ensureAuthorized,movimento.buscar);
app.post('/movimento/salvar',auth.ensureAuthorized,movimento.salvar);
app.post('/movimento/excluir',auth.ensureAuthorized,movimento.excluir);

}