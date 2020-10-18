const {Router} = require('express')
const Object = require('../../models/Objects')
const auth = require('../../middleware/auth.middleware')
const router = Router()

router.get('/list', auth , async (req, res) => {
    try{
        const objects = await Object.find()
        res.json(objects)
    }catch (e) {
        res.status(500).json({message:"Что-то пошло не так, попробуйте снова"})
    }
})

module.exports = router
