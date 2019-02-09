select  MO.NOME_UNICO
	   ,mn.NRO_MODULO
	   ,MO.NOME NOME_MODULO
       ,ME.NOME NOME_MENU
       ,ME.HREF
       ,ME.CSS_CLASS
       ,ME.CSS_IMG
       ,us.NRO_USUARIO
       ,us.NOME
       ,us.EMAIL
       ,us.USER
from tb_menu me
 inner join tb_modulo_menu mn on mn.NRO_MENU = me.NRO_MENU
 INNER JOIN tb_usuario_modulo UM ON UM.NRO_MODULO = MN.NRO_MODULO
 INNER JOIN tb_usuario US ON US.NRO_USUARIO = UM.NRO_USUARIO
 INNER JOIN tb_modulo MO ON MO.NRO_MODULO = UM.NRO_MODULO
where US.EMAIL = ?
   and US.PASS = ?
order by mo.NRO_MODULO, mn.ORDEM