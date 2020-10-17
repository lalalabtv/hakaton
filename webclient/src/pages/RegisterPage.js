import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";

export const RegisterPage = () => {
    const {loading, error, request, clearError} = useHttp()
    const message = useMessage();
    const [username, setUsername] = useState( '')
    const [password, setPassword] = useState( '')
    const [role, setRole] = useState( '')

    const registerHandler = async () => {
        try{
            console.log(username, password)
            const data = await request('/api/create/register', 'POST', {username: username,  password: password,  role: role})
            message(data.message)
            console.log('Data', data)
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
                <h1 style={{textAlign:"center"}}>РОССЕТИ</h1>
                <div className="card text-darken-1 black-text">
                    <div className="card-content black-text">
                        <span className="card-title" style={{textAlign:"center"}}>Регистрация</span>
                        <div>


                            <div className="input-field">
                                <input placeholder="Введите имя пользователя"
                                       id="username"
                                       type="text"
                                       name="username"
                                       className="red-input"
                                       onChange={e => setUsername(e.target.value)}
                                />
                                <label htmlFor="username">Имя пользователя</label>
                            </div>

                            <div className="input-field">
                                <input placeholder="Введите пароль"
                                       id="password"
                                       type="password"
                                       name="password"
                                       className="red-input"
                                       onChange={e => setPassword(e.target.value)}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>

                            <div className="input-field">
                                <input placeholder="Введите код должности"
                                       id="role"
                                       type="text"
                                       name="role"
                                       className="red-input"
                                       onChange={e => setRole(e.target.value)}
                                />
                                <label htmlFor="password">Код должности</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn white darken-4"
                                style={{marginRight: 10, color:"black"}}
                                onClick={registerHandler}
                                disabled={loading}
                        >Зарегестрироваться
                        </button>
                        <button className="btn white lighten-1"
                                >
                            <Link to="/auth" className="linked">Вернуться</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
