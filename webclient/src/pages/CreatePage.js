import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useHistory} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";
import "react-datepicker/dist/react-datepicker.css";


export const CreatePage = () => {
    const [place, setPlace] = useState( ' ')
    const history = useHistory();
    const [brigade, setBrigade] = useState( ' ')
    const [date, setDate] = useState( ' ')
    const auth = useContext(AuthContext)
    const {loading,request, error, clearError} = useHttp()
    const message = useMessage();
    const [endDate, setendDate] = useState(new Date())

    useEffect(() => {
        message(error);
        clearError()
    },[error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async () =>{
        try{
            const data = await request('/api/tsk/createTask', 'POST', {fio: brigade, place: place, datePreventStart: date, dateStart: date, dateEnd: endDate}, {
            Authorization: `Bearer ${auth.token}`
             })
            history.push('/tasks')
        }catch (e) {

        }
    }

    return(
        <div className="row">
            <h3>Новое задание</h3>


            <div className="input-field" style={{marginTop:'25px', alignItems:"center"}}>
                <i className="material-icons prefix">edit_location</i>
                <input placeholder="Введите место планового осмотра"
                       id="place"
                       type="text"
                       className="red-input"
                       style={{border:"4px black", color:"black"}}
                       onChange={e => setPlace(e.target.value)}
                       value={place}
                />
                <label htmlFor="name">Место</label>
            </div>
            <div className="inputs">
                <div className="input-field">
                    <i className="material-icons prefix">info</i>
                    <input placeholder="Введите номер бригады"
                           id="brigade"
                           type="text"
                           className="red-input"
                           value={brigade}
                           style={{border:"4px black"}}
                           onChange={e => setBrigade(e.target.value)}

                           width="800"
                    />
                    <label htmlFor="brigade">Номер бригады</label>
                </div>
            </div>
            <div className="inputs">
                <div className="input-field">
                    <i className="material-icons prefix">event</i>
                    <input placeholder="Введите дату выполнения"
                           id="date"
                           type="text"
                           className="red-input"
                           value={date}
                           style={{border:"4px black"}}
                           onChange={e => setDate(e.target.value)}

                           width="800"
                    />
                    <label htmlFor="date">Время начала</label>
                </div>
                <div className="input-field">
                    <i className="material-icons prefix">event</i>
                    <input placeholder="Введите дату окончания"
                           id="enddate"
                           type="text"
                           className="red-input"
                           value={endDate}
                           style={{border:"4px black"}}
                           onChange={e => setendDate(e.target.value)}

                           width="800"
                    />
                    <label htmlFor="enddate">Время окончания</label>
                </div>
                <button className="btn white darken-4"
                        style={{marginRight: 10, color:"black"}}
                        onClick={pressHandler}
                        disabled={loading}
                >Добавить задание
                </button>


            </div>
        </div>
    )
}
