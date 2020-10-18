const {Router} = require('express')
const Object = require('../../models/Objects')
const Defect = require('../../models/Defect')
const auth = require('../../middleware/auth.middleware')
const router = Router()
import '../UnusedLib/priority'

router.get('/check', auth, async (req , res) => {
    try{

    }catch (e) {
        res.status(500).json({message:"Что-то пошло не так, попробуйте снова"})
    }
})

router.post(
    '/create',
    [

    ],
    async (req, res) => {
        try{


            const {place, defect , dateLooking} = req.body

            const object = await Object.findOne({ place })

            var dLine = 0;

            defect.map(async def => {
                const id = def._id
                const current = await Defect.findById({id})

                const pr = CalculatePriority(current.state, current.uState)

                current.priority = pr;
                await current.save()

                dLine = dLine + CalculateTimeCompliting(dateLooking , pr)


            })

            object.dateEnd = dLine
            await object.save()


            res.status(201).json({message:"Все завершилось успешно"})

        }
        catch (e){
            res.status(500).json({message:"Что-то пошло не так, попробуйте снова"})
        }

    })


module.exports = router
