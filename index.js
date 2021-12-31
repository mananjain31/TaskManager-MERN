const express = require("express");
const { connectDB } = require("./db/connect");
const tasks = require("./routes/tasks");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3001;

app.use(express.static('./client/build'));
app.use(express.json());

/*  
get     '/api/v1/tasks'         - get all tasks
post    '/api/v1/tasks'         - post a task
get     '/api/v1/tasks/:id'     - get a task
patch   '/api/v1/tasks/:id'     - update a task
delete  '/api/v1/tasks/:id'     - delete a task
*/

// router
app.use('/api/v1/tasks',tasks);

const run = async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, err=> console.log(err ? err : `listening at localhost:${port}`));
    }
    catch (err) {
        console.log(err);
    }
}

run();