var db = require('../db/db');

module.exports = app => { 

    app.put('/burn/:id', (req, res) => 
    {
        if (!app.utils.validador.validar(app, req, res)) return false;

        const id = parseInt(req.params.id);
        const points = req.body.points.substring(0, 150);
        const extra_task = req.body.extra_task.substring(0, 11);
        const data = req.body.data;

        db.executa(`UPDATE burn SET points='${points}', extra_task='${extra_task}', data='${data}' WHERE ID=${id}`, res);

    });

    app.post('/burn', (req, res) => {

        if (!app.utils.validador.validar(app, req, res)) return false;

        points = req.body.points.substring(0, 150);
        extra_task = req.body.extra_task;
        data = req.body.data;
        db.executa(`INSERT INTO burn (data, points, extra_task) VALUES('${data}','${points}','${extra_task}')`, res);
    });

    app.delete('/burn/:id', (req, res) => {
        if (!app.utils.validador.validar(app, req, res)) return false;
        
        db.executa('DELETE FROM burn WHERE ID=' + parseInt(req.params.id), res);
    });

    app.get('/burn', (req, res) => {
        db.executa('SELECT * FROM burn', res);
    });

    app.get('/burn/:id', (req, res) => {
        db.executa('SELECT * FROM burn WHERE ID=' + parseInt(req.params.id), res);
    });
 
}







