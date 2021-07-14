import React, { useEffect } from "react";
import { Route, Switch, } from "react-router-dom";
import CreateForm from "./pages/CreateForm"
import TestPage from "./pages/TestPage"
import TestPage2 from "./pages/TestPage2"
import TestPage3 from "./pages/TestPage3"
import sample from "./pages/sample"
import Preview from "./pages/Preview"
import SubmitForm from "./pages/SubmitForm"

const Routes = () => {

    return (
        <Switch>
            <Route exact path="/" component={CreateForm} />
            <Route exact path="/preview" component={Preview} />
            <Route exact path="/submitForm/:uuid" component={SubmitForm} />
        </Switch>
    );
};

export default Routes;
