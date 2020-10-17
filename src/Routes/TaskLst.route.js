const {Router} = require('express')
const Task = require('../../models/Task')
const auth = require('../../middleware/auth.middleware')
const router = Router()

router.get('/lst', auth, async (req, res) => {
    try{
        const tasks = await Task.find()
        res.json(tasks)
    }catch (e) {
        res.status(500).json({message:"Что-то пошло не так, попробуйте снова"})
    }
})

module.exports = router
