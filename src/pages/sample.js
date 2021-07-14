import React, { useRef } from "react";

const Sample = () => {
    const arrayExample = ["AAAA", "BBBB", "CCCC"];
    const rightDiv = useRef();
    const itemClickHandler = (i) => {
        const newTopHeight =
            document.getElementById("container").children[i].offsetTop;
        rightDiv.current.style.top = newTopHeight + "px";
    };
    return (
        <div
            id="container"
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "500px",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f3f3f3",
            }}
        >
            {arrayExample.map((v, i) => {
                return (
                    <div
                        key={i}
                        style={{
                            width: "50%",
                            padding: 50,
                            border: "1px solid black",
                            marginTop: 15,
                        }}
                        onClick={() => itemClickHandler(i)}
                    >
                        {v}
                    </div>
                );
            })}
            <div
                ref={rightDiv}
                style={{
                    position: "absolute",
                    top: 70,
                    right: "22%",
                    backgroundColor: "#4285F4",
                    width: 50,
                    height: 150,
                    borderRadius: 5,
                    transition: "top 0.5s ease-in-out",
                }}
            >
                moving screen(I want to Change top value)
            </div>
        </div>
    );
};
export default Sample;
