import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import reportWebVitals from "./reportWebVitals";

// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import 'bootstrap/dist/css/bootstrap.min.css'

// import configureStore from './config/store';
// const { store, persistor } = configureStore();

ReactDOM.render(
    <React.StrictMode>
        {/* <Provider store={store}> */}
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <Router>
            <Routes />
        </Router>
        {/* </PersistGate> */}
        {/* </Provider> */}
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
