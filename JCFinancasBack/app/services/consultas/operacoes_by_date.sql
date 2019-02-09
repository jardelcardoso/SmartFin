select op.NRO_MOVIMENTO
      ,op.NOME_PRODUTO
      ,tp.NOME TIPO_PRODUTO
      ,op.DATA_OPERACAO
      ,DATE_FORMAT(op.DATA_OPERACAO,'%d/%m/%Y') DATA_OPERACAO
      ,op.TIPO_OPERACAO
      ,if(op.TIPO_OPERACAO ='C','Compra','Venda') DESC_TIPO_OPERACAO  
      ,FORMAT(op.VR_UNITARIO,2,'de_DE') VR_CUSTO
      ,FORMAT((op.VR_UNITARIO * op.QUANTIDADE),2,'de_DE') VR_CUSTO_TOTAL
      ,op.QUANTIDADE
      ,op.VR_CORRETAGEM
      ,op.VR_EMOLUMENTOS
from tb_operacao op
 inner join tb_carteira ca on ca.NRO_CARTEIRA = op.NRO_CARTEIRA
 INNER JOIN tb_tipo_produto tp on tp.NRO_TIPO_PRODUTO = op.NRO_TIPO_PRODUTO

where ca.NRO_USUARIO = ?
    and op.DATA_OPERACAO >= ?
    and op.DATA_OPERACAO <= ?
order by op.DATA_OPERACAO
;