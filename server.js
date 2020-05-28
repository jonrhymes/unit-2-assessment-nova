/***** EXPRESS *****/
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection;
const methodOverride = require('method-override');

const Todo = require('./models/todos.js');

/***** MIDDLEWARE *****/
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
mongoose.connect('mongodb://localhost:27017/todos', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});

db.once('open', () => {
    console.log('Mongo connected')
})

/***** ROUTES *****/
app.get('/', (req, res) => {
    res.send('<a href="/todos">Go to ToDo\'s</a>')
})

/***** INDEX *****/
app.get('/todos', (req, res) => {

    const next = (error, allToDos) => {
        if(error){
            console.log(error)
        } else {
            const props = {
                todos: allToDos 
            }
        res.render('Index', props)
        }
    }
    Todo.find({}, next)
})

/***** SEED *****/
app.get('/todos/seed', (req, res) => {
    Todo.create([
        {
            name: 'do work',
            done: false
        }
    ])
})

/***** CREATE *****/
app.post('/todos/', (req, res) => {
    console.log(req.body)
    // req.body.done === false 
    // ? req.body.done = 
    Todo.create(req.body, (error, createdTodo) => {
        if(error){
            console.log(error)
        } else {
            res.redirect('/todos')
        }
    })
})

/***** DELETE *****/
app.delete('/todos/:id', (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (error, foundTodo) => {
        res.redirect('/todos')
    })
})

/***** UPDATE *****/
// app.put('/:id', (req, res)= >{
//     Todo.fin
// })

app.listen(3000, () => {
    console.log('listening');
})