import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {TasksLst} from "../components/TasksLst";

export const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchParties = useCallback(async () => {
        try{
            const fetched = await request('/api/t/lst', 'GET' , null , {
                Authorization: `Bearer ${token}`
            })
            setTasks(fetched)
        }catch (e) {}
    }, [token, request])

    useEffect(()=>{
        fetchParties()
    },[fetchParties])

    if(loading){
        return <Loader />
    }


    return(
        <>
        <div style={{textAlign:"center"}}>
            <h3>Журнал задач</h3>
        </div>
            {!loading && <TasksLst tasks={tasks} />}
        </>
    )
}
