const express = require('express')
const cors = require('cors')
const app = express()
let data = require('./Data')
const { uuid } = require('uuidv4');
const fs = require('fs');

app.use(cors())
app.use(express.json())

app.use((req, res, next)=>{
    console.log(`${req.path} ${req.method}`)
    next()
})
const editFile = (data) => {
    fs.writeFile ("data.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );
}

app
    .route('/data')
    .get((req, res)=>{
        res.status(201).json({data})
    })
    .put((req, res)=>{
        const id = uuid()
        data = [{...req.body, id}, ...data]
        editFile(data)
        res.json({id})
    })
    .patch((req, res)=>{
        console.log(req.body);
        data = data.map((el)=>
            (el.id == req.body.id)
                ? req.body
                : el
        )
        editFile(data)
        res.json({message: "success"})
    })
    .delete((req, res)=>{
        console.log(req.body);
        data = data.filter((el) => el.id !== req.body.id)
        editFile(data)
        res.json({message: "success"})
    })


app.listen(process.env.port ? process.env.port : 5000, ()=>{
    console.log(`server is listening @ port ${process.env.port ? process.env.port : 5000}`)
})





