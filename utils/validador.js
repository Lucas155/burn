module.exports = {
  
  validar: (app, req, res) => 
  {    
      req.assert('points', ' Points é obrigatorio').notEmpty().isNumeric(),
      req.assert('extra_task', 'Extra_task é obrigatorio').notEmpty().isNumeric(),
      req.assert('data', 'Data invalida').notEmpty().isISO8601({ format: 'YYYY-MM-DD' });

      const errors = req.validationErrors();

    if (errors) 
    {
      app.utils.error.send(errors, req, res);
      return false;
    } else 
    {
      return true;
    }
  }

};
