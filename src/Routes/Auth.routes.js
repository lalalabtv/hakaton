const {Router} = require('express')
const bcrypt = require('bcrypt')
const User = require('../../models/User')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const router = Router()

router.post(
    '/login',
    [
        check('username', 'Введите корректное имя пользователя'),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Введенные данные некорректны'
                })
            }

            const {username, password} = req.body

            const user = await User.findOne({ username })

            if(!user){
                return res.status(400).json({message: 'Пользователя с таким eMail не существует'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({token , userId: user.id })


        }
        catch (e){
            res.status(500).json({message:"Что-то пошло не так, попробуйте снова"})
        }

    })


module.exports = router
