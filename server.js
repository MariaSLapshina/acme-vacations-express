const express = require('express')
const path = require('path')
const app = express()
const db = require('./db')
console.log(db)
app.use(express.json())

app.get('/', (req, res, next)=> {
 
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.get('/api/vacations', async (req,res,next)=>{
    try{
        res.send(await db.findAll())
    }
    catch(ex){
        next(ex)
    }
})
app.post('/api/vacations',async (req,res,next)=>{
    try {
    res.send(await db.create(req.body))
    }
    catch(ex){
       next(ex) 
    }
   
})
app.listen(3000)