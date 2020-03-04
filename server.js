const express = require("express");
const app = express();
const sql = require('mssql')
const hostname = 'localhost';
const port = 8021;

// //CORS Middleware
// app.use(function (req, res, next) {
//   //Enabling CORS
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
//   next();
// });

// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())

const config = {
    user: 'su',
    password: 'SaSa1212',
    server: '10.199.13.253',
    database: 'nrp05111740000107'
};

var executeQuery = function(res, query, param, reqType) {
  sql.connect(config, function(err){
    if(err) {
      res.end('Connection Error\n' + err)
    }
    else {
      var request = new sql.Request()
      if(reqType != 0) {
        param.forEach(function(p)
        {
          request.input(p.name, p.sqltype, p.value);
        });
      }
      request.query(query, function(err, response){
        if(err) {
          console.log('Query Error\n' + err)
        }
        else{
          res.send(response.recordset)
        }
     })
    }
  })
}

// app.get("/",function(req, res)
// {
//   res.end('Hello World');
// });

app.get("/", function(req, res)
{
  var query = "SELECT * FROM mahasiswa";
  executeQuery(res, query, null, 0);
});

// app.post("/api/mahasiswa", function(req, res)
// {
//   var param = [
//     { name: 'nrp', sqltype: sql.Char, value: req.body.nrp },
//     { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
//     { name: 'angkatan', sqltype: sql.Char, value: req.body.angkatan },
//     { name: 'jenis_kelamin', sqltype: sql.VarChar, value: req.body.jenis_kelamin },
//     { name: 'tgl_lahir', sqltype: sql.Date, value: req.body.tgl_lahir },
//     { name: 'ukt', sqltype: sql.VarChar, value: req.body.ukt },
//     { name: 'foto', sqltype: sql.Image, value: req.body.foto },
//     { name: 'status', sqltype: sql.VarChar, value: req.body.status}
//   ]

//   var query = 'INSERT INTO mahasiswa ( nrp, nama, angkatan, jenis_kelamin, tgl_lahir, ukt, foto, status ) values( @nrp, @nama, @angkatan, @jenis_kelamin, @tgl_lahir, @ukt, @foto, @status)';
//   executeQuery(res, query, param, 1)
// })

// app.put("/api/mahasiswa/:id", function(req, res)
// {
//   var param = [
//     { name: 'id', sqltype: sql.Int, value: req.body.id }, 
//     { name: 'nrp', sqltype: sql.Char, value: req.body.nrp },
//     { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
//     { name: 'angkatan', sqltype: sql.Char, value: req.body.angkatan },
//     { name: 'jenis_kelamin', sqltype: sql.VarChar, value: req.body.jenis_kelamin },
//     { name: 'tgl_lahir', sqltype: sql.Date, value: req.body.tgl_lahir },
//     { name: 'ukt', sqltype: sql.VarChar, value: req.body.ukt },
//     { name: 'foto', sqltype: sql.Image, value: req.body.foto },
//     { name: 'status', sqltype: sql.VarChar, value: req.body.status}
//   ]

//   var query = "UPDATE mahasiswa SET nrp=@nrp, nama=@nama, angkatan=@angkatan, jenis_kelamin=@jenis_kelamin, tgl_lahir=@tgl_lahir, ukt=@ukt, foto=@foto, status=@status WHERE id=@id";
//   executeQuery(res, query, param, 1)
// })

// app.delete("/api/mahasiswa/:id", function(req, res)
// {
//   var query = "DELETE FROM mahasiswa WHERE id=" + req.params.id;
//   executeQuery(res, query, null, 0);
// })

app.listen(port, hostname, function () {
  var message = "Server runnning on Port: " + port;
  console.log(message);
});