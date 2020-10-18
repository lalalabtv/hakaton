import React, {useState} from "react";
import {Link} from "react-router-dom";

export const Brigades = ({brigades}) => {

    if(!brigades.length){
        return <p className="center">Нет доступных бригад</p>
    }



    return(
        <>
            { brigades.map(party => {
                return(
                    <option value={party.name}>{party.name}</option>
                )
            }) }
        </>

    )

}
