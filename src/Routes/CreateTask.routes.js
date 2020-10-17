const {Router} = require('express')
const Task = require('../../models/Task')
const router = Router()

router.post(
    '/createTask',
    [
    ],
    async (req, res) => {
        try{
            const {place, fio, datePreventStart, dateStart, dateEnd} = req.body

            const task = new Task({fio, datePreventStart: datePreventStart, place, dateStart: dateStart, dateEnd: dateEnd})

            await task.save()

            res.status(201).json({message: 'Задача добавлена'})


        }catch (e) {
            res.status(200).json({message:'Ошибка при формировании задачи'})
        }
    }
)

module.exports = router
