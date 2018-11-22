var db = require('../db/db');

module.exports = app => {
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

  app.put('/burn', (req, res) => {
    if (!app.utils.validador.validar(app, req, res)) return false;
    const points = req.body.points.substring(0, 150);
    const extra_task = req.body.extra_task.substring(0, 11);
    const data = req.body.datas;
    const titulo = req.body.titulo

    db.executa(`UPDATE burn SET points='${points}', extra_task='${extra_task}', data ='${data}' WHERE data=${data}`, res)
      .then(resposta => {
        console.log(resposta);
        res.json(resposta);
      })
      .catch(error => {
        console.error('Deu erro ', error);
      });

  });

  app.post('/burn', (req, res) => {
    if (!app.utils.validador.validar(app, req, res)) return false;
    console.log(req.body);
    points = req.body.points.substring(0, 150);
    extra_task = req.body.extra_task;
    data = req.body.data;
    titulo = req.body.titulo
    
    db.executa(`INSERT INTO burn (data, points, extra_task) VALUES('${data}','${points}','${extra_task}')`, res)
      .then(resposta => {
        console.log(resposta);
        res.json(resposta);
      })
      .catch(error => {
        console.error('Deu erro ', error);
      });
  });

  app.delete('/burn/:id', (req, res) => {
    if (!app.utils.validador.validar(app, req, res)) return false;

    db.executa('DELETE FROM burn WHERE ID=' + parseInt(req.params.id), res)
      .then(resposta => {
        console.log(resposta);
        res.json(resposta);
      })
      .catch(error => {
        console.error('Deu erro ', error);
      });
  });

  app.get('/burn', (req, res) => {
    //res.render('site/burndown');

    db.executa('SELECT * FROM burn', res)
      .then(resposta => {
        console.log(resposta);
        res.json(resposta);
      })
      .catch(error => {
        console.error('Deu erro ', error);
      });
  });

  app.get('/burn/:id', (req, res) => {
    db.executa('SELECT * FROM burn WHERE ID=' + parseInt(req.params.id), res)
      .then(resposta => {
        console.log(resposta);
        res.json(resposta);
      })
      .catch(error => {
        console.error('Deu erro ', error);
      });
  });
}







