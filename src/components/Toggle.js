import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "../App.css";
import { useEventCallback } from "@material-ui/core";

const Toggle = ({ active, setToggle }) => {
    return (
        <div
            className={classNames("toggleContainer", { active: active })}
            onClick={() => {
                setToggle();
            }}
        >
            <div className="toggleBar"></div>
            <div
                className={classNames("toggleCircleWrapper", {
                    active: active,
                })}
            >
                <div
                    className={classNames("toggleCircle", { active: active })}
                ></div>
                <div
                    className={classNames("toggleCircleOutside", {
                        active: active,
                    })}
                ></div>
            </div>
        </div>
    );
};

export default Toggle;
