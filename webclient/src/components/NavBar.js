import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {

    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
    }

    return (
        <nav>
            <div className="nav-wrapper black-text white">
                <a href="/" className="brand-logo" style={{marginLeft: 10, color:"black"}}>РОССЕТИ</a>
                <ul id="nav-mobile" className="right black-text hide-on-med-and-down" style={{color:"black"}}>
                    <li><NavLink to="/addtask" className="l_element">Новая задача</NavLink></li>
                    <li><NavLink to="/" className="l_element">Список задач</NavLink></li>
                    <li><a href="/" onClick={logoutHandler} className="l_element">Exit</a></li>
                </ul>
            </div>
        </nav>
    )
}
