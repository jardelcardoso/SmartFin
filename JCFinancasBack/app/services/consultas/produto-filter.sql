select PRD.NOME 
		,PRD.NRO_PRODUTO 
		,PRD.SIGLA 
		,PRD.IND_ATIVO 
		,TP.NOME TIPO_PRODUTO 
		,TP.NRO_TIPO_PRODUTO 
 from tb_produto prd 
   inner join tb_tipo_produto tp on tp.NRO_TIPO_PRODUTO = prd.NRO_TIPO_PRODUTO 
 where prd.NOME like ? 
       and prd.SIGLA like ?
       and prd.NRO_TIPO_PRODUTO =  IFNULL(?,prd.NRO_TIPO_PRODUTO ) 