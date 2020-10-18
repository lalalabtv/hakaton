import React from "react";
import {Link} from "react-router-dom";

export const TasksLst = ({tasks}) => {
    if(!tasks.length){
        return <p className="center">Список задач пуст</p>
    }
    var status;

    return(
        <table className="centered">
            <thead>
            <tr>
                <th>Бригада №</th>
                <th>Место проведения осмотра</th>
                <th>Дата начала</th>
                <th>Дата окончания</th>
                <th>Статус</th>
            </tr>
            </thead>

            <tbody>
            { tasks.map(party => {


                return(
                    <tr key={party._id}>
                        <td>{party.fio}</td>
                        <td>{party.place}</td>
                        <td>{party.dateStart}</td>
                        <td>{party.dateEnd}</td>
                        <td>{party.confirmed}</td>
                    </tr>
                )
            }) }
            </tbody>
        </table>
    )
}
