const {Router} = require('express')
const bcrypt = require('bcrypt')
const User = require('../../models/User')
const {check, validationResult} = require('express-validator')
const router = Router()

router.post(
'/register',
[
    check('username', 'Некорректное имя пользователя').isLength({min: 6}),
    check('password', 'Минимальная длинна пароля 8 символов').isLength({min: 8})
],
    async(req, res)=>{
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Введенные данные некорректны'
            })
        }

        const {username, password, role} = req.body
        const candidate = await User.findOne({username})

        if(candidate){
            return res.status(400).json({message: 'Пользователь с такими данными уже существует'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const privateSign = await bcrypt.hash(username, 12)
        const publicSign = await bcrypt.hash(username, 10)

        const user = new User({username, password: hashedPassword, role, privateSign: privateSign, publicSign:publicSign})

        await user.save()

        res.status(201).json({message: 'Пользователь создан'})

    }catch (e){
        res.status(200).json({message:'Ошибка при регистрации'})
    }
    }
)


module.exports = router
