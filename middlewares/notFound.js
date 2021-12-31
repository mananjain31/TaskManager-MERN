module.exports = function notFound(req, res)
{
    res.status(404).send(`This Route : '${req.path}' Does Not exists.`)
} 