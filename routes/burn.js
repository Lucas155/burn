var db = require('../db/db');

module.exports = app => {
  
  app.put('/burn/:id', (req, res) => {


    if (!app.utils.validador.validar(app, req, res)) return false;
    const id = parseInt(req.params.id);
    const points = req.body.points.substring(0, 150);
    const extra_task = req.body.extra_task.substring(0, 11);
    const data = req.body.data;
    const titulo = req.body.titulo

    db.executa(`UPDATE burn SET points='${points}', extra_task='${extra_task}', data='${data}',titulo='${titulo}' WHERE ID=${id}`, res)
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
    
    db.executa(`INSERT INTO burn (data, points, extra_task, titulo) VALUES('${data}','${points}','${extra_task}','${titulo}')`, res)
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







