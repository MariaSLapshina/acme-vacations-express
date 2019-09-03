const express = require('express')
const path = require('path')
const app = express()
app.use(express.json())
app.use('/api/vacations', require('./api/vacations'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
    
})

const router = express.Router()
const validator = (item,items) => {
    const { startDate, endDate } = item

    if (!startDate) return 'startDate is required'

    if (!endDate) return 'endDate is required'

    if (items.some(_item => _item.startDate === startDate && _item.endDate === endDate)) return 'vacation time already exists'
}
const db = require('./db')('./vacations.json', validator)


router.get('/', async (req, res, next)=> {
    try {
        res.json(await db.findAll())
    }
    catch(ex){
        res.status(404).json(ex)
 }
  
  });

router.post('/',async (req,res,next)=>{
    try {
        res.status(201).json(await db.create(req.body))
    }
    catch(ex){
       next(ex) 
    }
   
})
router.delete('/:id', async (req, res, next) => {
    try {
        await db.destroy(req.params.id)
        res.send()
    } catch (e) {
        res.status(400).json(e)
    }
})


module.exports = router
app.listen(3000)