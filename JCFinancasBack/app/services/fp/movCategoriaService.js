exports.salvar = function(connection, res, nroPrincipal, categorias, callback){

   

    console.log("Exluindo "+nroPrincipal);

    const sqlDel = 'DELETE FROM TP_FP_MOV_CATEGORIA WHERE NRO_MOVIMENTO = ?';
    connection.query(sqlDel, [nroPrincipal], function(err, results) {
            if (err){
                return connection.rollback(function() {
                    throw err;
                  });
                }

                //const sql = 'INSERT INTO TP_FP_MOV_CATEGORIA ( NRO_CATEGORIA, NRO_MOV_PARCELA, NRO_MOVIMENTO, VR_MOV_CATEGORIA, DESC_MOV_CATEGORIA, ID_CONTA) values  (?) (?) ';
                var sql = 'INSERT INTO TP_FP_MOV_CATEGORIA ( '+ Object.keys(categorias[0]).toString()+') VALUES ';

                var virgula ='';
                var valores = [];
                categorias.forEach(element => {
                    sql += virgula+'(?)';
                    virgula = ',';
                   valores.push( Object.values(element));
                });
                console.log(sql);

               //const sql = 'INSERT INTO TP_FP_MOV_CATEGORIA SET  (?) (?) '; 
               connection.query(sql, valores, function(err, results) {
                        if (err){
                            res.format({
                                json: function(){
                                    res.status(400).json(err);
                                }
                            });

                            return connection.rollback(function() {
                                throw err;
                              });

                           /* res.format({
                                    json: function(){
                                        res.status(400).json(err);
                                    }
                                });*/
                            }
            
                            callback(connection,res);   
                });

                
    });
}