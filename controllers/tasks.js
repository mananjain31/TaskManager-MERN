const Task = require('../models/Task');

async function getAll(req, res)
{
    try{
        const tasks = await Task.find({});
        res.status(200).json({tasks});
    } catch (err) {
        res.status(500).json({err});
    }
}
async function getOne(req, res)
{
    try{
        const task = await Task.findOne( { "_id" : req.params.id } );
        
        if(!task) return res.status(404).json({msg : `No task with id ${req.params.id}`});

        res.status(201).json({task});
    } catch (err) {
        res.status(500).json({err});
    }
}
async function createOne(req, res)
{
    try{
        const task = await Task.create(req.body);
        res.status(201).json({task});
    } catch (err) {
        res.status(500).json({err});
    }
}
async function updateOne(req, res)
{
    try{
        const task = await Task.findOneAndUpdate( { "_id" : req.params.id } , req.body, {
            new : true,
            runValidators : true,
        });

        if(!task) return res.status(404).json({msg : `No task with id ${req.params.id}`});

        res.status(201).json({task});
    } catch (err) {
        res.status(500).json({err});
    }
}
async function deleteOne(req, res)
{
    try{
        const task = await Task.findOneAndDelete( { "_id" : req.params.id } );

        if(!task) return res.status(404).json({msg : `No task with id ${req.params.id}`});

        res.status(201).json({task});
    } catch (err) {
        res.status(500).json({err});
    }
}

module.exports = {
    getAll,getOne,createOne,deleteOne,updateOne
}