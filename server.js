
const sql = require('mssql')
const express = require("express");
var bodyParser = require('body-parser');

const hostname = '10.199.14.46';
const port = 8021;
const app = express();

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const config = {
    user: 'sa',
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

app.get("/",function(req, res)
{
  res.end('Hello World');
});

// app.get("/",function(req, res)
// {
//   res.sendFile(__dirname + '/index.html')
// });

// DATA DASAR
app.get("/api/DataDasar/", function(req, res)
{
    var query = "select * from DataDasar"
    executeQuery(res, query, null, 0);
});

app.get("/api/DataDasar/:id", function(req, res)
{
    var query = "select * from DataDasar where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});

// JENIS SATKER
app.get("/api/JenisSatker/", function(req, res)
{
    var query = "select * from JenisSatker"
    executeQuery(res, query, null, 0);
});

app.get("/api/JenisSatker/:id", function(req, res)
{
    var query = "select * from JenisSatker where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});

// MASTER INDIKATOR
app.get("/api/MasterIndikator/", function(req, res)
{
    var query = "select * from MasterIndikator"
    executeQuery(res, query, null, 0);
});

app.get("/api/MasterIndikator/:id", function(req, res)
{
    var query = "select * from MasterIndikator where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});

// PERIODE
app.get("/api/Periode/", function(req, res)
{
    var query = "select * from Periode"
    executeQuery(res, query, null, 0);
});

app.get("/api/Periode/:id", function(req, res)
{
    var query = "select * from Periode where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});

// INDIKATOR PERIODE
app.get("/api/IndikatorPeriode/", function(req, res)
{
    var query = "select * from IndikatorPeriode"
    executeQuery(res, query, null, 0);
});

app.get("/api/IndikatorPeriode/:id", function(req, res)
{
    var query = "select * from IndikatorPeriode where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});

// SATUAN KERJA
app.get("/api/SatuanKerja/", function(req, res)
{
    var query = "select * from SatuanKerja"
    executeQuery(res, query, null, 0);
});

app.get("/api/SatuanKerja/:id", function(req, res)
{
    var query = "select * from SatuanKerja where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});

// CAPAIAN UNIT
app.get("/api/CapaianUnit/", function(req, res)
{
    var query = "select * from CapaianUnit"
    executeQuery(res, query, null, 0);
});

app.get("/api/CapaianUnit/:id_satker&:id_datadasar", function(req, res)
{
    var query = "select * from CapaianUnit where id_satker=" + req.params.id_satker +" id_datadasar="+req.params.id_datadasar;
    executeQuery(res, query, null, 0);
});

// INDIKATOR SATUAN KERJA
app.get("/api/IndikatorSatuanKerja/", function(req, res)
{
    var query = "select * from IndikatorSatuanKerja"
    executeQuery(res, query, null, 0);
});

app.get("/api/IndikatorSatuanKerja/:id", function(req, res)
{
    var query = "select * from IndikatorSatuanKerja where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});

// INDIKATOR SATUAN KERJA LOG
app.get("/api/IndikatorSatuanKerjaLog/", function(req, res)
{
    var query = "select * from IndikatorSatuanKerjaLog"
    executeQuery(res, query, null, 0);
});

app.get("/api/IndikatorSatuanKerjaLog/:id", function(req, res)
{
    var query = "select * from IndikatorSatuanKerjaLog where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});


// ---------- POST FUNCTION

// DATA DASAR
app.post("/api/DataDasar/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }    
  ]

  var query = 'insert into DataDasar ( nama, create_date, last_update, expired_date ) values( @nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )';
  executeQuery(res, query, model, 1)
})

// JENIS SATKER
app.post("/api/JenisSatker/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama}     
  ]

  var query = 'insert into JenisSatker ( id, nama, create_date, last_update, expired_date ) values( @id, @nama , CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )';
  executeQuery(res, query, model, 1)
})

// MASTER INDIKATOR
app.post("/api/MasterIndikator/", function( req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_penyebut },
    { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_pembilang },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
    { name: 'default_bobot', sqltype: sql.Int, value: req.body.default_bobot },
  ]

  var query = 'insert into MasterIndikator( id_pembilang, id_penyebut, nama, deskripsi, default_bobot, create_date, last_update, expired_date ) values( @id_pembilang, @id_penyebut, @nama, @deskripsi, @default_bobot, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )';
  executeQuery(res, query, model, 1)
})

// PERIODE
app.post("/api/Periode/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama}  
  ]

  var query = 'insert into Periode( id, nama, create_date, last_update ) values( @id, @nama , CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )';
  executeQuery(res, query, model, 1)
})

// INDIKATOR PERIODE
app.post("/api/IndikatorPeriode/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Int, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot}  
  ]

  var query = 'insert into IndikatorPeriode( id_master, id_periode, bobot ) values( @id_master, @id_periode, @bobot )';
  executeQuery(res, query, model, 1)
})

// SATUAN KERJA
app.post("/api/SatuanKerja/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_ins_satker', sqltype: sql.Int, value: req.body.id_ins_satker },
    { name: 'id_induk_satker', sqltype: sql.VarChar, value: req.body.id_induk_satker },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama},
    { name: 'email', sqltype: sql.VarChar, value: req.body.email}
    
  ]

  var query = 'insert into SatuanKerja( id_ins_satker, id_induk_satker, nama, email ) values( @id_ins_satker, @id_induk_satker, @nama, @email )';
  executeQuery(res, query, model, 1)
})

// CAPAIAN UNIT
app.post("/api/CapaianUnit/", function(req, res)
{
  var model = [
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian}
    
  ]

  var query = 'insert into CapaianUnit( id_satker, id_datadasar, waktu, capaian) values( @id_satker, @id_datadasar, CURRENT_TIMESTAMP, @capaian )';
  executeQuery(res, query, model, 1)
})

// INDIKATOR SATUAN KERJA
app.post("/api/IndikatorSatuanKerja/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_indikator_periode', sqltype: sql.Int, value: req.body.id_indikator_periode },
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot},
    { name: 'target', sqltype: sql.Float, value: req.body.target},
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian}
    
  ]

  var query = 'insert into IndikatorSatuanKerja( id_indikator_periode, id_satker, bobot, target, capaian, last_update) values( @id_indikator_periode, @id_satker, @bobot, target, @capaian, CURRENT_TIMESTAMP )';
  executeQuery(res, query, model, 1)
})

// INDIKATOR SATUAN KERJA LOG
app.post("/api/IndikatorSatuanKerjaLog/", function(req, res)
{
  var model = [
    { name: 'id_indikator_satker', sqltype: sql.Int, value: req.body.id_indikator_satker },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian}
    
  ]

  var query = 'insert into IndikatorSatuanKerjaLog( id_indikator_satker, capaian, create_date) values( @id_indikator_satker, @capaian, CURRENT_TIMESTAMP )';
  executeQuery(res, query, model, 1)
})



// ---------- PUT FUNCTION

// DATA DASAR
app.put("/api/DataDasar/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = 'update DataDasar set nama = @nama last_update=CURRENT_TIMESTAMP where id = @id';
  executeQuery(res, query, model, 1)
})

// JEIS SATKER
app.put("/api/JenisSatker/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = 'update JenisSatker set nama = @nama last_update=CURRENT_TIMESTAMP where id = @id';
  executeQuery(res, query, model, 1)
})

// MASTER INDIKATOR
app.put("/api/MasterIndikator/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_penyebut },
    { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_pembilang },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
    { name: 'default_bobot', sqltype: sql.Int, value: req.body.default_bobot }
  ]

  var query = 'update MasterIndikator set id_pembilang = @id_pembilang id_penyebut=@id_penyebut nama = @nama deskripsi=@deskripsi default_bobot=@default_bobot where id = @id';
  executeQuery(res, query, model, 1)
})

// PERIODE
app.put("/api/Periode/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = 'update Periode set nama = @nama last_update=CURRENT_TIMESTAMP where id = @id';
  executeQuery(res, query, model, 1)
})

// INDIKATOR PERIODE
app.put("/api/IndikatorPeriode/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Int, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot} 
  ]

  var query = 'update IndikatorPeriode set id_master = @id_master id_periode=@id_periode bobot=@bobot where id = @id';
  executeQuery(res, query, model, 1)
})

// SATUAN KERJA
app.put("/api/SatuanKerja/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_ins_satker', sqltype: sql.Int, value: req.body.id_ins_satker },
    { name: 'id_induk_satker', sqltype: sql.VarChar, value: req.body.id_induk_satker },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama},
    { name: 'email', sqltype: sql.VarChar, value: req.body.email} 
  ]

  var query = 'update SatuanKerja set id_ins_satker = @id_ins_satker id_induk_satker=@id_induk_satker nama=@nama email=@email last_update=CURRENT_TIMESTAMP where id = @id';
  executeQuery(res, query, model, 1)
})

// CAPAIAN UNIT
app.put("/api/CapaianUnit/:id", function(req, res) {
  var model = [
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian}
    
  ]

  var query = 'update CapaianUnit set id_satker = @id_satker id_datadasar=@id_datadasar capaian=@capaian where id = @id';
  executeQuery(res, query, model, 1)
})

// INDIKATOR SATUAN KERJA
app.put("/api/IndikatorSatuanKerja/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_indikator_periode', sqltype: sql.Int, value: req.body.id_indikator_periode },
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot},
    { name: 'target', sqltype: sql.Float, value: req.body.target},
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian}
    
  ]

  var query = 'update IndikatorSatuanKerja set id_indikator_periode = @id_indikator_periode id_satker=@id_satker bobot=@bobot target=@target capaian=@capaian where id = @id';
  executeQuery(res, query, model, 1)
})

// INDIKATOR SATUAN KERJA LOG
app.put("/api/IndikatorSatuanKerjaLog/:id", function(req, res) {
  var model = [
    { name: 'id_indikator_satker', sqltype: sql.Int, value: req.body.id_indikator_satker },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian}
  ]

  var query = 'update IndikatorSatuanKerjaLog set id_indikator_periode = @id_indikator_periode id_satker=@id_satker bobot=@bobot target=@target capaian=@capaian where id = @id';
  executeQuery(res, query, model, 1)
})


// ---------- DELETE FUNCTION

// DATA DASAR
app.delete("/api/DataDasar/:id", function(req, res)
{
    var query = "delete * from DataDasar where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});

// JENIS SATKER
app.delete("/api/JenisSatker/:id", function(req, res)
{
    var query = "delete  from JenisSatker where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});

// MASTER INDIKATOR
app.delete("/api/MasterIndikator/:id", function(req, res)
{
    var query = "delete from MasterIndikator where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});

// PERIODE
app.delete("/api/Periode/:id", function(req, res)
{
    var query = "delete  from Periode where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});

// INDIKATOR PERIODE
app.delete("/api/IndikatorPeriode/:id", function(req, res)
{
    var query = "delete from IndikatorPeriode where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});

// SATUAN KERJA
app.delete("/api/SatuanKerja/:id", function(req, res)
{
    var query = "delete from SatuanKerja where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});

// CAPAIAN UNIT
app.delete("/api/CapaianUnit/:id_satker&:id_datadasar", function(req, res)
{
    var query = "delete from CapaianUnit where id_satker=" + req.params.id_satker +" id_datadasar="+req.params.id_datadasar;
    executeQuery(res, query, null, 0);
});

// INDIKATOR SATUAN KERJA
app.delete("/api/IndikatorSatuanKerja/:id", function(req, res)
{
    var query = "delete from IndikatorSatuanKerja where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});

// INDIKATOR SATUAN KERJA LOG
app.delete("/api/IndikatorSatuanKerjaLog/:id_indikator_satker", function(req, res)
{
    var query = "delete from IndikatorSatuanKerjaLog where id_indikator_satker=" + req.params.id_indikator_satker;
    executeQuery(res, query, null, 0);
});


//  LISTEN
app.listen(port, hostname, function () {
  var message = "Server runnning on Port: " + port;
  console.log(message);
});