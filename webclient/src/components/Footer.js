import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Footer = () => {

    return (
        <footer className="page-footer">
            <div class="footer-copyright">
                <div class="container">
                    © 2020 Dungeon Masters
                </div>
            </div>
        </footer>
    )
}
