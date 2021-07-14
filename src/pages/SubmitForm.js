import Card from "../components/Card";
import React, { useState, useEffect, useRef } from "react";
import {
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    Select,
    MenuItem,
    Divider,
} from "@material-ui/core";
import Input from "../components/Input";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { db, firebaseApp, firebase } from "../firebase";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "white",
        color: "gray",
        boxShadow: "none",
        padding: "0 10px",
        fontSize: 14,
        height: 36,
        "&:hover": {
            backgroundColor: "#f8f8f8",
            boxShadow: "none",
        },
    },
    select: {
        backgroundColor: "white",
        width: 208,
        height: 48,
        color: "#5f6368",
        outline: "none",
        inline: "none",
        "&:focus": {
            backgroundColor: "white",
        },
        "&:hover": {
            backgroundColor: "white",
        },
        "&:active": {
            backgroundColor: "white",
        },
        "&:link": {
            backgroundColor: "white",
        },
        "&:visited": {
            backgroundColor: "white",
        },
    },
    MenuItem: {
        color: "#5F6368",
        "&:hover": {
            backgroundColor: "#EEEEEE",
        },
        "&:focus": {
            backgroundColor: "rgba(26,115,232,0.078)",
        },
        "&:focus:hover": {
            backgroundColor: "rgba(26,115,232,0.039)",
        },
    },
}));

const SubmitForm = (props) => {
    const { uuid } = useParams();
    const [data, setData] = useState({});
    const classes = useStyles();
    const [radioArray, setRadioArray] = useState([]);
    const [checkBoxArray, setCheckBoxArray] = useState([]);
    const [dropDownArray, setDropDownArray] = useState([]);
    const [textArray, setTextArray] = useState([]);
    const [isRequiredItem, setIsRequiredItems] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const ref = await db.collection("forms").doc(uuid).get();
                setData(ref.data());
            } catch (error) {
                console.log(error.message);
            }
        })();
    }, []);

    useEffect(() => {
        if (data.hasOwnProperty("title")) {
            const newRadioArray = data.questions
                .filter((v, i) => {
                    return v.questionType === "RADIO";
                })
                .map((value, index) => {
                    return {
                        uuid: value.uuid,
                        value: "",
                        radioList: value.options,
                    };
                });
            setRadioArray(newRadioArray);
            const newCheckBoxArray = data.questions
                .filter((v, i) => {
                    return v.questionType === "CHECK_BOX";
                })
                .map((value, index) => {
                    return {
                        uuid: value.uuid,
                        checkList: value.options.map((val, idx) => {
                            return {
                                uuid: val.uuid,
                                text: val.text,
                                isChecked: false,
                            };
                        }),
                    };
                });
            setCheckBoxArray(newCheckBoxArray);
            const newDropDownArray = data.questions
                .filter((v, i) => {
                    return v.questionType === "DROP_DOWN";
                })
                .map((value, index) => {
                    return {
                        uuid: value.uuid,
                        value: "select",
                        dropDownList: value.options,
                    };
                });
            setDropDownArray(newDropDownArray);
            data.questions.forEach((v, i) => {
                if (v.required) {
                    setIsRequiredItems(true);
                    return;
                }
            });
            const newTextArray = data.questions
                .filter((v, i) => {
                    return v.questionType === "TEXT";
                })
                .map((value, index) => {
                    return {
                        uuid: value.uuid,
                        text: "",
                    };
                });
            setTextArray(newTextArray);
            window.onbeforeunload = function (e) {
                var dialogText = "Dialog text here";
                e.returnValue = dialogText;
                return dialogText;
            };
        }
    }, [data]);

    if (data.hasOwnProperty("title")) {
        return (
            <div
                style={{ width: 768, margin: "0 auto", position: "relative", paddingBottom: 50 }}
                onmouse
                id={"cardContainer"}
            >
                <Card
                    barPosition={["top"]}
                    display={"none"}
                    cardTopBarColor={`${data.color},1)`}
                >
                    <div style={{ fontSize: 32, height: 50 }}>{data.title}</div>
                    {data.subTitle && (
                        <div style={{ fontSize: 14, height: 24, marginTop: 5 }}>
                            {data.subTitle}
                        </div>
                    )}
                    {isRequiredItem && (
                        <div
                            style={{
                                fontSize: 13,
                                marginTop: 5,
                                color: "rgba(219, 68, 55, 1)",
                            }}
                        >
                            * 필수항목
                        </div>
                    )}
                </Card>
                {data.questions.map((v, i) => {
                    const selectedRadioObject = radioArray.filter((val) => {
                        return val.uuid === v.uuid;
                    })[0];
                    const selectedDropDownObject = dropDownArray.filter(
                        (val) => {
                            return val.uuid === v.uuid;
                        }
                    )[0];
                    const selectedTextObject = textArray.filter((val) => {
                        return val.uuid === v.uuid;
                    })[0];
                    return v.questionType === "RADIO" ? (
                        <Card barPosition={[]}>
                            <div>
                                {v.question}{" "}
                                {v.required && (
                                    <span
                                        style={{
                                            fontSize: 13,
                                            color: "rgba(219, 68, 55, 1)",
                                            position: "relative",
                                            top: -3,
                                        }}
                                    >
                                        *
                                    </span>
                                )}
                            </div>
                            {radioArray.length > 0 && (
                                <div>
                                    <RadioGroup
                                        style={{ marginTop: 15 }}
                                        value={selectedRadioObject.value}
                                        onChange={(e) => {
                                            const cp = [...radioArray];
                                            const ind = cp.findIndex(
                                                (x) => x.uuid === v.uuid
                                            );
                                            cp[ind].value = e.target.value;
                                            setRadioArray(cp);
                                        }}
                                    >
                                        {selectedRadioObject.radioList.map(
                                            (value, index) => {
                                                return (
                                                    <FormControlLabel
                                                        value={value.uuid}
                                                        control={
                                                            <Radio
                                                                style={{
                                                                    color:
                                                                        selectedRadioObject.value ===
                                                                        value.uuid
                                                                            ? `${data.color},1)`
                                                                            : undefined,
                                                                }}
                                                            />
                                                        }
                                                        label={value.text}
                                                    />
                                                );
                                            }
                                        )}
                                    </RadioGroup>
                                    {!v.required && (
                                        <div
                                            style={{
                                                textAlign: "end",
                                                height: selectedRadioObject.value
                                                    ? 36
                                                    : 0,
                                                overflow: "hidden",
                                                transition:
                                                    "height 0.1s ease-in-out",
                                            }}
                                        >
                                            <Button
                                                className={classes.button}
                                                variant="contained"
                                                onClick={(e) => {
                                                    const cp = [...radioArray];
                                                    const ind = cp.findIndex(
                                                        (x) => x.uuid === v.uuid
                                                    );
                                                    cp[ind].value = "";
                                                    setRadioArray(cp);
                                                }}
                                            >
                                                선택해제
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>
                    ) : v.questionType === "CHECK_BOX" ? (
                        <Card barPosition={[]}>
                            <div>
                                {v.question}{" "}
                                {v.required && (
                                    <span
                                        style={{
                                            fontSize: 13,
                                            color: "rgba(219, 68, 55, 1)",
                                            position: "relative",
                                            top: -3,
                                        }}
                                    >
                                        *
                                    </span>
                                )}
                            </div>
                            {checkBoxArray.length > 0 &&
                                checkBoxArray
                                    .filter((val, idx) => {
                                        return val.uuid === v.uuid;
                                    })[0]
                                    .checkList.map((value, index) => {
                                        return (
                                            <div
                                                style={{
                                                    marginTop:
                                                        index === 0 ? 15 : 0,
                                                }}
                                            >
                                                <FormControlLabel
                                                    label={value.text}
                                                    control={
                                                        <Checkbox
                                                            checked={
                                                                value.isChecked
                                                            }
                                                            style={{
                                                                color: value.isChecked
                                                                    ? `${data.color},1)`
                                                                    : undefined,
                                                            }}
                                                            onChange={() => {
                                                                const cp = [
                                                                    ...checkBoxArray,
                                                                ];
                                                                const ind =
                                                                    cp.findIndex(
                                                                        (x) =>
                                                                            x.uuid ===
                                                                            v.uuid
                                                                    );
                                                                const newCheckList =
                                                                    cp[ind]
                                                                        .checkList;
                                                                const idxx =
                                                                    newCheckList.findIndex(
                                                                        (xx) =>
                                                                            xx.uuid ===
                                                                            value.uuid
                                                                    );
                                                                newCheckList[
                                                                    idxx
                                                                ] = {
                                                                    ...newCheckList[
                                                                        idxx
                                                                    ],
                                                                    isChecked:
                                                                        !newCheckList[
                                                                            idxx
                                                                        ]
                                                                            .isChecked,
                                                                };
                                                                setCheckBoxArray(
                                                                    cp
                                                                );
                                                            }}
                                                            // name="gilad"
                                                        />
                                                    }
                                                />
                                            </div>
                                        );
                                    })}
                        </Card>
                    ) : v.questionType === "DROP_DOWN" ? (
                        <Card barPosition={[]}>
                            <div>
                                {v.question}{" "}
                                {v.required && (
                                    <span
                                        style={{
                                            fontSize: 13,
                                            color: "rgba(219, 68, 55, 1)",
                                            position: "relative",
                                            top: -3,
                                        }}
                                    >
                                        *
                                    </span>
                                )}
                            </div>
                            {dropDownArray.length > 0 && (
                                <div>
                                    <Select
                                        value={selectedDropDownObject.value}
                                        onChange={(e) => {
                                            const cp = [...dropDownArray];
                                            const ind = cp.findIndex(
                                                (x) => x.uuid === v.uuid
                                            );
                                            cp[ind].value = e.target.value;
                                            setDropDownArray(cp);
                                        }}
                                        variant="outlined"
                                        className={classes.select}
                                        style={{ marginTop: 30, width: 300 }}
                                    >
                                        <MenuItem
                                            value={"select"}
                                            className={classes.MenuItem}
                                        >
                                            선택
                                        </MenuItem>
                                        <Divider
                                            style={{
                                                marginTop: 10,
                                                marginBottom: 10,
                                            }}
                                        />
                                        {selectedDropDownObject.dropDownList.map(
                                            (value, index) => {
                                                return (
                                                    <MenuItem
                                                        value={value.uuid}
                                                        className={
                                                            classes.MenuItem
                                                        }
                                                    >
                                                        {value.text}
                                                    </MenuItem>
                                                );
                                            }
                                        )}
                                    </Select>
                                </div>
                            )}
                        </Card>
                    ) : (
                        <Card barPosition={[]}>
                            <div>
                                {v.question}{" "}
                                {v.required && (
                                    <span
                                        style={{
                                            fontSize: 13,
                                            color: "rgba(219, 68, 55, 1)",
                                            position: "relative",
                                            top: -3,
                                        }}
                                    >
                                        *
                                    </span>
                                )}
                            </div>
                            {textArray.length > 0 && (
                                <div style={{ marginTop: 40 }}>
                                    <Input
                                        active={true}
                                        placeholder={"내 답변"}
                                        value={selectedTextObject.text}
                                        onChange={(e) => {
                                            const cp = [...textArray];
                                            const ind = cp.findIndex(
                                                (x) => x.uuid === v.uuid
                                            );
                                            cp[ind].text = e.target.value;
                                            setTextArray(cp);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key == "Enter") {
                                                e.preventDefault();
                                            }
                                        }}
                                        fontSize={14}
                                        height={24}
                                    />
                                </div>
                            )}
                        </Card>
                    );
                })}
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: `${data.color},1)`,
                        color: "white",
                        padding: "0 24px",
                        fontSize: 14,
                        height: 36,
                    }}
                >
                    제출
                </Button>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default SubmitForm;
