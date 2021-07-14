import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

const Input = ({
    active,
    fontSize,
    placeholder,
    value,
    onChange,
    height,
    width,
    customTextareaBottomBorderColor,
    onKeyDown,
    onBlur,
    constainerStyle,
    backgroundColor,
    bottomBorderColor,
    borderBottom,
}) => {
    const [focus, setFocus] = useState(false);
    const ref = useRef();
    const resizeHeight = () => {
        if (ref === null || ref.current === null) {
            return;
        }
        ref.current.style.height = height + "px";
        ref.current.style.height = ref.current.scrollHeight + "px";
    };

    useEffect(() => {
        resizeHeight();
    }, [value]);

    const [hover, setHover] = useState(false);

    return (
        <div
            className="customTextareaWrapper"
            style={{
                ...constainerStyle,
                backgroundColor:
                    active && hover && backgroundColor
                        ? "#f1f3f4"
                        : active && backgroundColor
                        ? backgroundColor
                        : undefined,
            }}
            onMouseOver={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
        >
            <textarea
                ref={ref}
                className={classNames("customTextarea", { active: active })}
                onFocus={(e) => {
                    setFocus(true);
                }}
                onBlur={
                    onBlur
                        ? () => {
                              onBlur();
                              setFocus(false);
                          }
                        : () => {
                              setFocus(false);
                          }
                }
                style={{
                    fontSize: fontSize,
                    height: height,
                    backgroundColor:
                        active && hover && backgroundColor
                            ? "#f1f3f4"
                            : active && backgroundColor
                            ? backgroundColor
                            : undefined,
                }}
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    onChange(e);
                }}
                onKeyDown={onKeyDown}
                onClick={(e) => {
                    e.target.select();
                }}
            />

            <div
                className="customTextareaDefaultBottomBorder"
                style={{
                    display: active
                        ? undefined
                        : borderBottom
                        ? undefined
                        : "none",
                    backgroundColor: bottomBorderColor
                        ? bottomBorderColor
                        : undefined,
                }}
            ></div>
            <div
                className={classNames("customTextareaBottomBorder", {
                    active: focus,
                })}
                style={{
                    backgroundColor:
                        focus && customTextareaBottomBorderColor
                            ? customTextareaBottomBorderColor
                            : undefined,
                }}
            ></div>
        </div>
    );
};

export default Input;
