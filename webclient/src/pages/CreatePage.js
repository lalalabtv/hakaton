import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useHistory} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Brigades} from "../components/Brigades";
import {Objects} from "../components/Objects";



export const CreatePage = () => {
    const [place, setPlace] = useState( ' ')
    const history = useHistory();
    const [brigade, setBrigade] = useState( ' ')
    const [brigades, setBrigades] = useState([])
    const [objects, setObjects] = useState( [])
    const [startDate, setStartDate] = useState( new Date())
    const auth = useContext(AuthContext)
    const {loading,request, error, clearError} = useHttp()
    const message = useMessage();
    const {token} = useContext(AuthContext)

    const fetchBrigades = useCallback(async () => {
        try{
            const fetched = await request('/api/b/lst', 'GET' , null , {
                Authorization: `Bearer ${token}`
            })
            setBrigades(fetched)
        }catch (e) {}
    }, [token, request])

    const fetchObjects = useCallback(async () => {
        try{
            const fetched = await request('/api/o/list', 'GET' , null , {
                Authorization: `Bearer ${token}`
            })
            setBrigades(fetched)
        }catch (e) {}
    }, [token, request])

    useEffect(()=>{
        fetchObjects()
    },[fetchObjects])

    useEffect(()=>{
        fetchBrigades()
    },[fetchBrigades])



    useEffect(() => {
        message(error);
        clearError()
    },[error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async () =>{
        try{
            const data = await request('/api/tsk/createTask', 'POST', {fio: brigade, place: place, datePreventStart: startDate, dateStart: startDate}, {
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
                <div style={{marginLeft: '50px'}}>
                    <select className="browser-default" onChange={e=> setPlace(e.target.value)}>
                        <option value="" disabled selected>Выберите объект</option>
                        <Objects objects={objects}/>
                    </select>

                </div>
            </div>
            <div className="inputs">
                <div className="input-field" id="brigade">
                    <i className="material-icons prefix">people</i>
                    <div style={{marginLeft: '50px'}}>
                        <select className="browser-default" onChange={e=> setBrigade(e.target.value)}>
                            <option value="" disabled selected>Выберите бригаду</option>
                            <Brigades brigades={brigades}/>
                        </select>

                    </div>

                </div>
            </div>
            <div className="inputs">
                <div className="input-field">
                    <i className="material-icons prefix">event</i>
                    <label>Дата начала работ</label>
                    <div style={{marginLeft: '200px'}}>
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                    </div>

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
