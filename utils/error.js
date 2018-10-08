module.exports = {
  send: (err, req, res, code = 500)=>
{
    console.log('erro: ${err}');
    res.status(code).json({
    error: err
        });
}

};