import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const {loading, error, request, clearError} = useHttp()
    const message = useMessage();
    const [form, setForm] = useState( {
        username: '',
        password: ''
    })

    const changeHandler = event => {
        setForm({ ...form , [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            console.log(data.token)
            message(data.message)
            auth.login(data.token, data.userId)
        }
        catch (e){

        }
    }

    useEffect(() => {
        message(error);
        clearError()
    },[error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 style={{textAlign: "center"}}>РОССЕТИ</h1>
                <div className="card text-darken-1 black-text" style={{position:"relative", margin: "0 auto"}}>
                    <div className="card-content white-text">
                        <span className="card-title" style={{color: "black", textAlign:"center"}}>Авторизация</span>
                        <div>

                            <div className="input-field" style={{marginTop:'30px'}}>
                                <input placeholder="Введите имя пользователя"
                                       id="username"
                                       type="text"
                                       name="username"
                                       className="red-input"
                                       onChange={changeHandler}
                                       value={form.username}
                                />
                                <label htmlFor="username">Имя пользователя</label>
                            </div>

                            <div className="input-field" style={{marginTop:'15px'}}>
                                <input placeholder="Введите пароль"
                                       id="password"
                                       type="password"
                                       name="password"
                                       className="red-input"
                                       onChange={changeHandler}
                                       value={form.password}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action" style={{justifyContent:"center",color:"black"}}>
                        <p style={{color:"black"}}>
                            <button className="btn white darken-4" style={{marginRight: 10, color: "black"}} onClick={loginHandler} >Войти</button>

                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
