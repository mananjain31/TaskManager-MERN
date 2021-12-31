const Task = require('../models/Task');
const asyncWrapper = require('../middlewares/asyncWrapper');
const {CustomError, createCustomError} = require('../errors/CustomError');
const getAll = asyncWrapper( async(req, res, next) => {
    const tasks = await Task.find({});
    res.status(200).json({tasks});
})

const getOne = asyncWrapper( async(req, res , next) => {
    const task = await Task.findOne( { "_id" : req.params.id } );
    if(!task) 
        return next( createCustomError(`No task with id ${req.params.id}`, 404) );
    res.status(201).json({task});
})

const createOne = asyncWrapper(  async(req, res, next) => {
    const task = await Task.create(req.body);
    res.status(201).json({task});
})

const updateOne = asyncWrapper( async(req, res, next) => {
    const task = await Task.findOneAndUpdate( { "_id" : req.params.id } , req.body, {
        new : true,
        runValidators : true,
    });
    if(!task) 
        return next(createCustomError(`No task with id ${req.params.id}`, 404))
    res.status(201).json({task});
})

const deleteOne = asyncWrapper( async(req, res, next) => {
    const task = await Task.findOneAndDelete( { "_id" : req.params.id } );
    if(!task) 
        return next(createCustomError(`No task with id ${req.params.id}`, 404))
    res.status(201).json({task});
})

module.exports = {
    getAll,getOne,createOne,deleteOne,updateOne
}