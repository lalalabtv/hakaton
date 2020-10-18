const {Router} = require('express')
const Brigade = require('../../models/Brigade')
const auth = require('../../middleware/auth.middleware')
const router = Router()

router.get('/lst', auth , async (req, res) => {
    try{
        const brigades = await Brigade.find()
        res.json(brigades)
    }catch (e) {
        res.status(500).json({message:"Что-то пошло не так, попробуйте снова"})
    }
})

module.exports = router

