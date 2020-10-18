import React from "react";
import {Link} from "react-router-dom";

export const Objects = ({objects}) => {
    if(!objects.length){
        return <p className="center">Нет доступных бригад</p>
    }

    return(
        <>
            { objects.map(party => {
                return(
                    <option value={party.name}>{party.name}</option>
                )
            }) }
        </>

    )

}
