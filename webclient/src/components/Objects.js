import React, {useState} from "react";
import {Link} from "react-router-dom";

export const Obj = ({objects}) => {

    if(!objects.length){
        return <p className="center">Нет доступных объектов</p>
    }



    return(
        <>
            { objects.map(party => {
                return(
                    <option value={party.id}>{party.name}</option>
                )
            }) }
        </>

    )


}
