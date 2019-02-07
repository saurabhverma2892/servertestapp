var express = require('express');
var router = express.Router();
let request = require("request");


/* GET home page. */

router.get('/test', function(req,res,next){

    /*'frmBsqExp': 'frmBsqExp',
        'frmBsqExp:busquedaId2': 'frmBsqExp:busquedaId2',
        'frmBsqExp:expedienteId':'163766',
        'javax.faces.ViewState':'8301388994051642504:-2333538308694143700',
        'javax.faces.partial.ajax':'true',
        'javax.faces.partial.execute':'@all',
        'javax.faces.partial.render':'frmBsqExp:pnlBsqExp frmBsqExp:dlgListaExpedientes',
        'javax.faces.source':'frmBsqExp:busquedaId2',
*/

    request.post({
      url: 'http://marcanet.impi.gob.mx/marcanet/vistas/common/dashboard/marcanetDashboardBusquedas.pgi',
      form: {
        'frmBsqReg': 'frmBsqReg',
        'frmBsqReg:busquedaId': 'frmBsqReg:busquedaId',
        'frmBsqReg:registroId': '1080293',
        'javax.faces.ViewState': '8470251173944865134:7163368146752327172',
        'javax.faces.partial.ajax': 'true',
        'javax.faces.partial.execute': '@all',
        'javax.faces.partial.render': 'frmBsqReg:pnlBsqRegistro frmBsqReg:dlgListaRegNac',
        'javax.faces.source': 'frmBsqReg:busquedaId'
      }
    }, function (err, httpResponse, body) { 
        console.log(body);

        console.log(body.indexOf("redirect url"));
        console.log(body[69 + 14]);
        console.log(body.indexOf('</redirect>')-2);

        var mySubString = body.substring(
            body.indexOf("redirect url")+14, 
            body.indexOf("</redirect>")-2
        );

        //request.get("http:/"+mySubString)
        console.log("http://marcanet.impi.gob.mx"+mySubString);

        request.get("http://marcanet.impi.gob.mx"+mySubString,{},function(err,res2,body){
          if(err){
            console.log(err);
          } 
          console.log(body);
          

          
          var string = body.substring(
            body.indexOf("dataApoEmailId"), 
            body.length
            );

          console.log(string.search("</span></td>"));
          string = string.substring(
            16,string.search("</span></td>")

            )
          //res.send(string);
          res.send(body);
        });
    })

    


});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
