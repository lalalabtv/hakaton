import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {AuthPage} from "./pages/AuthPage";
import {RegisterPage} from "./pages/RegisterPage";
import {Tasks} from "./pages/Tasks";
import {CreatePage} from "./pages/CreatePage";

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/tasks" exact>
                    <Tasks />
                </Route>
                <Route path="/addtask" exact>
                    <CreatePage />
                </Route>
                <Route path="/register" exact>
                    <RegisterPage />
                </Route>
                <Redirect to="/tasks" />
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}
