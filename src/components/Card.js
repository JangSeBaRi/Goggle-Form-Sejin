import React, { useEffect, useState } from "react";
import classNames from "classnames";

const Card = ({ children, barPosition, active, onClick, cardTopBarColor, display }) => {
    const [hover, setHover] = useState(false);
    return (
        <div style={{ position: "relative" }}>
            {active ? (
                <div
                    className={classNames("cardWrapperFinal", {
                        active: active,
                    })}
                    onClick={onClick}
                    onMouseOver={() => {
                        setHover(true);
                    }}
                    onMouseLeave={() => {
                        setHover(false);
                    }}
                >
                    {barPosition.length == 1 ? (
                        <div
                            style={{
                                fontSize: 11,
                                color: "#B3B3B3",
                                position: "absolute",
                                top: 7,
                                left: 0,
                                width: "100%",
                                textAlign: "center",
                                lineHeight: 0.5,
                                letterSpacing: 2,
                                display: active || hover ? "block" : "none",
                                cursor: "all-scroll",
                                zIndex: 1,
                            }}
                        >
                            •••
                            <br />
                            •••
                        </div>
                    ) : null}
                    {barPosition.includes("left") && (
                        <div
                            className="cardLeftBar"
                            style={{
                                display: active ? "block" : "none",
                            }}
                        ></div>
                    )}

                    {barPosition.includes("top") && (
                        <div className="cardTopBar"></div>
                    )}

                    <div className="cardWrapper">{children}</div>
                </div>
            ) : (
                <div
                    className={classNames("cardWrapperFinal", {
                        active: active,
                    })}
                    onClick={onClick}
                    onMouseOver={() => {
                        setHover(true);
                    }}
                    onMouseLeave={() => {
                        setHover(false);
                    }}
                >
                    {barPosition.length == 1 ? (
                        <div
                            style={{
                                fontSize: 11,
                                color: "#B3B3B3",
                                position: "absolute",
                                top: 7,
                                left: 0,
                                width: "100%",
                                textAlign: "center",
                                lineHeight: 0.5,
                                letterSpacing: 2,
                                display: display ? display : active || hover ? "block" : "none",
                                cursor: "all-scroll",
                                zIndex: 1,
                            }}
                        >
                            •••
                            <br />
                            •••
                        </div>
                    ) : null}
                    {barPosition.includes("left") && (
                        <div
                            className="cardLeftBar"
                            style={{
                                display: active ? "block" : "none",
                            }}
                        ></div>
                    )}

                    {barPosition.includes("top") && (
                        <div className="cardTopBar" style={{backgroundColor: cardTopBarColor && cardTopBarColor}}></div>
                    )}

                    <div className="cardWrapper">{children}</div>
                </div>
            )}
        </div>
    );
};

export default Card;
