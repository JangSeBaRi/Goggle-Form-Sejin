import React, { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import Toggle from "../components/Toggle";
import Input from "../components/Input";
import Title from "../components/Title";
import AutosizeInput from "react-input-autosize";
import classNames from "classnames";
import { uuid } from "uuidv4";
import { makeStyles } from "@material-ui/core/styles";
import {
    Select,
    MenuItem,
    Tooltip,
    IconButton,
    Divider,
    Button,
} from "@material-ui/core";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import DescriptionIcon from "@material-ui/icons/Description";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import WarningIcon from "@material-ui/icons/Warning";
import Drawer from "@material-ui/core/Drawer";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import SubjectIcon from "@material-ui/icons/Subject";

import { useHistory } from "react-router";
import { db, firebaseApp, firebase } from "../firebase";

// @material-ui/core/styles 적용
const useStyles = makeStyles((theme) => ({
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
    icon: {
        marginRight: 10,
    },
    MenuItemList: {
        display: "flex",
        alignItems: "center",
    },
    MenuItemListLabel: {
        marginTop: 3,
        marginLeft: 10,
    },
}));

// form 생성영역
const CreateForm = () => {
    const history = useHistory();
    const classes = useStyles();
    const rightDiv = useRef();
    const headerTitle = useRef();
    const footer = useRef();
    const [title, setTitle] = useState("제목 없는 설문지");
    const [subTitle, setSubTitle] = useState("");
    const [cardIndex, setCardIndex] = useState(1);
    const [focus, setFocus] = useState(false);
    const [optionUuid, setOptionUuid] = useState("");
    const [fillStar, setFillStar] = useState(false);
    const [warningIndex, setWarningIndex] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [color, setColor] = useState("rgba(103, 58, 183");

    const itemClickHandler = (i) => {
        const newTopHeight =
            document.getElementById("cardContainer").children[i].offsetTop;
        rightDiv.current.style.top = newTopHeight + "px";
    };

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const onChangeSubTitle = (e) => {
        setSubTitle(e.target.value);
    };

    useEffect(() => {
        headerTitle.current.style.width =
            (headerTitle.current.value.replace(/\s/gi, "").length + 1) * 18 +
            (headerTitle.current.value.match(/ /g) || []).length * 5 +
            "px";
    }, [title]);

    const [questions, setQuestions] = useState([
        {
            questionType: "RADIO",
            question: "제목없는 질문",
            uuid: uuid(),
            options: [{ text: "옵션 1", uuid: uuid() }],
            required: false,
        },
    ]);

    useEffect(() => {
        console.log(questions);
    }, [questions]);

    const [questionsLength, setQuestionsLength] = useState(1);

    useEffect(() => {
        if (questions.length === questionsLength + 1) {
            setCardIndex(cardIndex + 1);
        } else if (questions.length === questionsLength - 1) {
            if (cardIndex === 1 && questions.length != 0) {
                setCardIndex(cardIndex);
            } else {
                setCardIndex(cardIndex - 1);
            }
        }
        setQuestionsLength(questions.length);
    }, [questions]);

    useEffect(() => {
        footer.current.scrollIntoView({ behavior: "smooth" });
    }, [questions.length]);

    useEffect(() => {
        itemClickHandler(1);
        window.onbeforeunload = function (e) {
            var dialogText = "Dialog text here";
            e.returnValue = dialogText;
            return dialogText;
        };
    }, []);

    const [prevCardIndex, setprevCardIndex] = useState(1);
    useEffect(() => {
        itemClickHandler(cardIndex);
        if (cardIndex != prevCardIndex && cardIndex != 0) {
            document
                .getElementById("cardContainer")
                .children[cardIndex].getElementsByClassName("customTextarea")[0]
                .select();
        }
        setprevCardIndex(cardIndex);
    }, [cardIndex]);

    const shuffleArray = (array) => {
        for (let i = 0; i < array.length; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            const x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
        return array;
    };

    useEffect(() => {
        document.body.onkeydown = (e) => {
            if (e.ctrlKey && e.key === "Enter") {
                if (cardIndex === 0) {
                    return;
                }
                const cp = [...questions];
                cp[cardIndex - 1].options = shuffleArray(
                    cp[cardIndex - 1].options
                );
                setQuestions(cp);
            }
        };
    }, [cardIndex, questions]);

    const [loading, setLoading] = useState(false);

    return (
        <div style={{paddingBottom: 50,}}>
            <div className="topBar">
                <div
                    className=" flex fdr jcsb"
                    style={{
                        paddingTop: 8,
                        paddingLeft: 16,
                        paddingRight: 16,
                    }}
                >
                    <div className="flex fdr aic">
                        <Tooltip title="설문지 홈">
                            <IconButton size={"small"}>
                                <DescriptionIcon
                                    style={{
                                        color: "#673ab7",
                                        fontSize: "45px",
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <div style={{ marginLeft: 16, position: "relative" }}>
                            <input
                                ref={headerTitle}
                                value={title}
                                onChange={(e) => {
                                    onChangeTitle(e);
                                }}
                                style={{
                                    fontSize: 18,
                                    border: "none",
                                    outline: "none",
                                    width: 150,
                                    maxWidth: 590,
                                }}
                                onFocus={() => setFocus(true)}
                                onBlur={() => {
                                    setFocus(false);
                                    if (!title) {
                                        setTitle("제목 없는 설문지");
                                    }
                                }}
                                onClick={(e) => {
                                    e.target.select();
                                }}
                            />
                            <div
                                className={classNames(
                                    "customTextareaBottomBorder",
                                    {
                                        active: focus,
                                    }
                                )}
                                style={{
                                    backgroundColor: focus
                                        ? "black"
                                        : undefined,
                                    bottom: -5,
                                }}
                            ></div>
                        </div>
                        <Tooltip title="폴더로 이동">
                            <IconButton size={"small"}>
                                <FolderOpenIcon style={{ color: "#5f6368" }} />
                            </IconButton>
                        </Tooltip>
                        {!fillStar ? (
                            <Tooltip
                                title="별표"
                                style={{ marginLeft: 8 }}
                                onClick={() => {
                                    setFillStar((prev) => !prev);
                                }}
                            >
                                <IconButton size={"small"}>
                                    <StarBorderIcon
                                        style={{ color: "#5f6368" }}
                                    />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip
                                title="별표"
                                style={{ marginLeft: 8 }}
                                onClick={() => {
                                    setFillStar((prev) => !prev);
                                }}
                            >
                                <IconButton size={"small"}>
                                    <StarIcon style={{ color: "#5f6368" }} />
                                </IconButton>
                            </Tooltip>
                        )}
                    </div>

                    <div className="flex fdr aic">
                        <Tooltip
                            title="테마 맞춤설정"
                            style={{ marginRight: 20 }}
                            onClick={() => {
                                setOpenDrawer(true);
                            }}
                        >
                            <IconButton size={"small"}>
                                <ColorLensOutlinedIcon
                                    style={{ color: "#5f6368" }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="미리보기"
                            style={{ marginRight: 20 }}
                            onClick={() => {
                                const cp = [...questions];
                                cp.forEach((v, i) => {
                                    if (v.questionType === "TEXT") {
                                        delete v.options;
                                    }
                                });
                                // const win = window.open("/", "_blank")
                                // win.focus()
                                history.push("/preview", {
                                    data: {
                                        title: title,
                                        subTitle: subTitle,
                                        questions: cp,
                                        color: color,
                                    },
                                });
                            }}
                        >
                            <IconButton size={"small"}>
                                <VisibilityOutlinedIcon
                                    style={{ color: "#5f6368" }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="설정" style={{ marginRight: 20 }}>
                            <IconButton size={"small"}>
                                <SettingsOutlinedIcon
                                    style={{ color: "#5f6368" }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Button
                            variant="contained"
                            onClick={async () => {
                                setLoading(true);
                                const uid = uuid();
                                const cp = [...questions];
                                cp.forEach((v, i) => {
                                    if (v.questionType === "TEXT") {
                                        delete v.options;
                                    }
                                });
                                try {
                                    await db.collection("forms").doc(uid).set({
                                        title: title,
                                        subTitle: subTitle,
                                        questions: cp,
                                        color: color,
                                    });
                                    setLoading(false);
                                    history.push(`/submitForm/${uid}`);
                                } catch (error) {
                                    console.log(error.message);
                                    setLoading(false);
                                }
                            }}
                            disabled={loading}
                            style={{
                                color: "white",
                                backgroundColor: "rgb(103, 58, 183)",
                                borderRadius: 5,
                                fontSize: 14,
                            }}
                        >
                            Send
                        </Button>
                        <Tooltip
                            title="더보기"
                            style={{ marginLeft: 20, marginRight: 20 }}
                        >
                            <IconButton size={"small"}>
                                <MoreVertIcon style={{ color: "#5f6368" }} />
                            </IconButton>
                        </Tooltip>
                        <div className="flex aic jcc circlePurple">뚱</div>
                    </div>
                </div>
            </div>
            <div
                style={{ width: 768, margin: "0 auto", position: "relative" }}
                onmouse
                id={"cardContainer"}
            >
                <Card
                    barPosition={["top", "left"]}
                    onClick={() => {
                        setCardIndex(0);
                        itemClickHandler(0);
                    }}
                    active={cardIndex === 0 ? true : false}
                    cardTopBarColor={`${color},1)`}
                >
                    <Input
                        active={cardIndex === 0 ? true : false}
                        placeholder={"설문지 제목"}
                        value={title}
                        onChange={onChangeTitle}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                e.preventDefault();
                            }
                        }}
                        onBlur={() => {
                            if (!title) {
                                setTitle("제목 없는 설문지");
                            }
                        }}
                        fontSize={32}
                        height={50}
                    />
                    <Input
                        active={cardIndex === 0 ? true : false}
                        placeholder={"설문지 설명"}
                        value={subTitle}
                        onChange={onChangeSubTitle}
                        fontSize={14}
                        height={24}
                        constainerStyle={{ marginTop: 8 }}
                    />
                </Card>
                {questions.map((v, i) => {
                    return (
                        <Card
                            barPosition={["left"]}
                            onClick={() => {
                                setCardIndex(i + 1);
                                itemClickHandler(i + 1);
                            }}
                            active={cardIndex === i + 1 ? true : false}
                        >
                            {cardIndex === i + 1 ? (
                                <div>
                                    <div className="flex fdr">
                                        <Input
                                            constainerStyle={{
                                                width: "100%",
                                                padding: 16,
                                                marginRight: 60,
                                                paddingBottom: 10,
                                            }}
                                            active={
                                                cardIndex === i + 1
                                                    ? true
                                                    : false
                                            }
                                            height={28}
                                            fontSize={16}
                                            backgroundColor={"#f8f8f8"}
                                            bottomBorderColor={"black"}
                                            value={v.question}
                                            placeholder={"질문"}
                                            onChange={(e) => {
                                                const cp = [...questions];
                                                const index = cp.findIndex(
                                                    (x) => x.uuid === v.uuid
                                                );
                                                cp[index] = {
                                                    ...cp[index],
                                                    question: e.target.value,
                                                };
                                                setQuestions(cp);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key == "Enter") {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 25,
                                                right: 238,
                                            }}
                                        >
                                            <IconButton>
                                                <ImageOutlinedIcon
                                                    style={{ color: "#5f6368" }}
                                                />
                                            </IconButton>
                                        </div>
                                        <div>
                                            <Select
                                                value={v.questionType}
                                                onChange={(e) => {
                                                    const cp = [...questions];
                                                    cp[
                                                        cardIndex - 1
                                                    ].questionType =
                                                        e.target.value;
                                                    setQuestions(cp);
                                                }}
                                                renderValue={(value) => {
                                                    switch (value) {
                                                        case "TEXT":
                                                            return (
                                                                <div
                                                                    className={
                                                                        classes.MenuItemList
                                                                    }
                                                                >
                                                                    <SubjectIcon />
                                                                    <span
                                                                        className={
                                                                            classes.MenuItemListLabel
                                                                        }
                                                                    >
                                                                        장문형
                                                                    </span>
                                                                </div>
                                                            );
                                                        case "RADIO":
                                                            return (
                                                                <div
                                                                    className={
                                                                        classes.MenuItemList
                                                                    }
                                                                >
                                                                    <RadioButtonCheckedIcon />
                                                                    <span
                                                                        className={
                                                                            classes.MenuItemListLabel
                                                                        }
                                                                    >
                                                                        객관식
                                                                        질문
                                                                    </span>
                                                                </div>
                                                            );
                                                        case "CHECK_BOX":
                                                            return (
                                                                <div
                                                                    className={
                                                                        classes.MenuItemList
                                                                    }
                                                                >
                                                                    <CheckBoxIcon />{" "}
                                                                    <span
                                                                        className={
                                                                            classes.MenuItemListLabel
                                                                        }
                                                                    >
                                                                        체크박스
                                                                    </span>
                                                                </div>
                                                            );
                                                        case "DROP_DOWN":
                                                            return (
                                                                <div
                                                                    className={
                                                                        classes.MenuItemList
                                                                    }
                                                                >
                                                                    <ArrowDropDownCircleIcon />
                                                                    <span
                                                                        className={
                                                                            classes.MenuItemListLabel
                                                                        }
                                                                    >
                                                                        드롭다운
                                                                    </span>
                                                                </div>
                                                            );
                                                    }
                                                }}
                                                variant="outlined"
                                                className={classes.select}
                                            >
                                                <MenuItem
                                                    value={"TEXT"}
                                                    className={classes.MenuItem}
                                                >
                                                    <SubjectIcon
                                                        className={classes.icon}
                                                    />
                                                    장문형
                                                </MenuItem>
                                                <Divider
                                                    style={{
                                                        marginTop: 10,
                                                        marginBottom: 10,
                                                    }}
                                                />
                                                <MenuItem
                                                    value={"RADIO"}
                                                    className={classes.MenuItem}
                                                >
                                                    <RadioButtonCheckedIcon
                                                        className={classes.icon}
                                                    />
                                                    객관식 질문
                                                </MenuItem>
                                                <MenuItem
                                                    value={"CHECK_BOX"}
                                                    className={classes.MenuItem}
                                                >
                                                    <CheckBoxIcon
                                                        className={classes.icon}
                                                    />
                                                    체크박스
                                                </MenuItem>
                                                <MenuItem
                                                    value={"DROP_DOWN"}
                                                    className={classes.MenuItem}
                                                >
                                                    <ArrowDropDownCircleIcon
                                                        className={classes.icon}
                                                    />
                                                    드롭다운
                                                </MenuItem>
                                            </Select>
                                        </div>
                                    </div>

                                    {v.questionType != "TEXT" ? (
                                        <div>
                                            {v.options.map((val, idx) => {
                                                return (
                                                    <div
                                                        className="flex fdr aic optionsContainer"
                                                        style={{
                                                            marginTop:
                                                                idx === 0
                                                                    ? 15
                                                                    : 0,
                                                            position:
                                                                "relative",
                                                            height: 48,
                                                        }}
                                                        onMouseOver={() => {
                                                            setOptionUuid(
                                                                val.uuid
                                                            );
                                                        }}
                                                        onMouseLeave={() => {
                                                            setOptionUuid("");
                                                        }}
                                                        onClick={(event) => {
                                                            document
                                                                .getElementsByClassName(
                                                                    "cardWrapper"
                                                                )
                                                                [
                                                                    i + 1
                                                                ].getElementsByClassName(
                                                                    "customTextarea"
                                                                )
                                                                [
                                                                    idx + 1
                                                                ].select();
                                                            event.stopPropagation();
                                                        }}
                                                    >
                                                        {optionUuid ===
                                                            val.uuid && (
                                                            <div
                                                                style={{
                                                                    position:
                                                                        "absolute",
                                                                    left: -19,
                                                                    top: 12,
                                                                }}
                                                            >
                                                                <DragIndicatorIcon
                                                                    style={{
                                                                        color: "#B3B3B3",
                                                                        fontSize:
                                                                            "20px",
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                        {v.questionType ===
                                                        "RADIO" ? (
                                                            <RadioButtonUncheckedOutlinedIcon
                                                                style={{
                                                                    color: "#B3B3B3",
                                                                    position:
                                                                        "relative",
                                                                    top: -2,
                                                                }}
                                                            />
                                                        ) : v.questionType ===
                                                          "CHECK_BOX" ? (
                                                            <CheckBoxOutlineBlankIcon
                                                                style={{
                                                                    color: "#B3B3B3",
                                                                    position:
                                                                        "relative",
                                                                    top: -2,
                                                                }}
                                                            />
                                                        ) : (
                                                            <span
                                                                style={{
                                                                    fontSize: 14,
                                                                    position:
                                                                        "relative",
                                                                    top: -2,
                                                                }}
                                                            >
                                                                {idx + 1}
                                                            </span>
                                                        )}

                                                        <Input
                                                            customTextareaBottomBorderColor={
                                                                warningIndex ===
                                                                `${i}-${idx}`
                                                                    ? "#E46337"
                                                                    : ""
                                                            }
                                                            onBlur={() => {
                                                                const cp = [
                                                                    ...questions,
                                                                ];
                                                                const options =
                                                                    cp[
                                                                        cardIndex -
                                                                            1
                                                                    ].options;
                                                                if (
                                                                    !options[
                                                                        idx
                                                                    ].text.replace(
                                                                        /\s/gi,
                                                                        ""
                                                                    )
                                                                ) {
                                                                    options[
                                                                        idx
                                                                    ].text = `옵션 ${
                                                                        idx + 1
                                                                    }`;
                                                                    setQuestions(
                                                                        cp
                                                                    );
                                                                } else if (
                                                                    warningIndex ===
                                                                    `${i}-${idx}`
                                                                ) {
                                                                    const optionsIndex =
                                                                        options.findIndex(
                                                                            (
                                                                                value
                                                                            ) => {
                                                                                return (
                                                                                    value.uuid ===
                                                                                    val.uuid
                                                                                );
                                                                            }
                                                                        );
                                                                    options[
                                                                        optionsIndex
                                                                    ].text = `옵션 ${options.length}`;
                                                                    setQuestions(
                                                                        cp
                                                                    );
                                                                    setWarningIndex(
                                                                        ""
                                                                    );
                                                                }
                                                            }}
                                                            constainerStyle={{
                                                                width: "90%",
                                                                marginLeft: 10,
                                                            }}
                                                            fontSize={14}
                                                            height={24}
                                                            value={val.text}
                                                            borderBottom={
                                                                optionUuid ===
                                                                val.uuid
                                                            }
                                                            onChange={(e) => {
                                                                const cp = [
                                                                    ...questions,
                                                                ];
                                                                const index =
                                                                    cp.findIndex(
                                                                        (x) =>
                                                                            x.uuid ===
                                                                            v.uuid
                                                                    );
                                                                const options =
                                                                    cp[index]
                                                                        .options;
                                                                const optionsIndex =
                                                                    options.findIndex(
                                                                        (
                                                                            value
                                                                        ) => {
                                                                            return (
                                                                                value.uuid ===
                                                                                val.uuid
                                                                            );
                                                                        }
                                                                    );

                                                                options[
                                                                    optionsIndex
                                                                ] = {
                                                                    ...options[
                                                                        optionsIndex
                                                                    ],
                                                                    text: e
                                                                        .target
                                                                        .value,
                                                                };
                                                                if (
                                                                    options
                                                                        .map(
                                                                            (
                                                                                vv
                                                                            ) => {
                                                                                return vv.text;
                                                                            }
                                                                        )
                                                                        .filter(
                                                                            (
                                                                                vvv,
                                                                                iii
                                                                            ) => {
                                                                                return (
                                                                                    iii !=
                                                                                    idx
                                                                                );
                                                                            }
                                                                        )
                                                                        .indexOf(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ) === -1
                                                                ) {
                                                                    setWarningIndex(
                                                                        ""
                                                                    );
                                                                } else {
                                                                    setWarningIndex(
                                                                        `${i}-${idx}`
                                                                    );
                                                                }

                                                                setQuestions(
                                                                    cp
                                                                );
                                                            }}
                                                            onKeyDown={(e) => {
                                                                if (
                                                                    e.ctrlKey &&
                                                                    e.key ===
                                                                        "Enter"
                                                                ) {
                                                                    e.preventDefault();
                                                                } else if (
                                                                    e.key ==
                                                                    "Enter"
                                                                ) {
                                                                    const cp = [
                                                                        ...questions,
                                                                    ];
                                                                    const index =
                                                                        cp.findIndex(
                                                                            (
                                                                                x
                                                                            ) =>
                                                                                x.uuid ===
                                                                                v.uuid
                                                                        );
                                                                    const options =
                                                                        cp[
                                                                            index
                                                                        ]
                                                                            .options;
                                                                    const optionsIndex =
                                                                        options.findIndex(
                                                                            (
                                                                                xx
                                                                            ) =>
                                                                                xx.uuid ===
                                                                                val.uuid
                                                                        );
                                                                    options.splice(
                                                                        optionsIndex +
                                                                            1,
                                                                        0,
                                                                        {
                                                                            uuid: uuid(),
                                                                            text: `옵션 ${
                                                                                v
                                                                                    .options
                                                                                    .length +
                                                                                1
                                                                            }`,
                                                                        }
                                                                    );
                                                                    setQuestions(
                                                                        cp
                                                                    );
                                                                    if (
                                                                        warningIndex ===
                                                                        `${i}-${idx}`
                                                                    ) {
                                                                        const cp =
                                                                            [
                                                                                ...questions,
                                                                            ];
                                                                        const options =
                                                                            cp[
                                                                                cardIndex -
                                                                                    1
                                                                            ]
                                                                                .options;
                                                                        const optionsIndex =
                                                                            options.findIndex(
                                                                                (
                                                                                    value
                                                                                ) => {
                                                                                    return (
                                                                                        value.uuid ===
                                                                                        val.uuid
                                                                                    );
                                                                                }
                                                                            );
                                                                        options[
                                                                            optionsIndex
                                                                        ].text = `옵션 ${
                                                                            options.length -
                                                                            1
                                                                        }`;
                                                                        setQuestions(
                                                                            cp
                                                                        );
                                                                        setWarningIndex(
                                                                            ""
                                                                        );
                                                                    }
                                                                    e.preventDefault();
                                                                    setTimeout(
                                                                        () => {
                                                                            document
                                                                                .getElementsByClassName(
                                                                                    "cardWrapper"
                                                                                )
                                                                                [
                                                                                    i +
                                                                                        1
                                                                                ].getElementsByClassName(
                                                                                    "customTextarea"
                                                                                )
                                                                                [
                                                                                    idx +
                                                                                        2
                                                                                ].select();
                                                                        },
                                                                        1
                                                                    );
                                                                } else if (
                                                                    e.key ==
                                                                        "Backspace" &&
                                                                    !val.text &&
                                                                    v.options
                                                                        .length !=
                                                                        1
                                                                ) {
                                                                    const cp = [
                                                                        ...questions,
                                                                    ];
                                                                    const options =
                                                                        cp[
                                                                            cardIndex -
                                                                                1
                                                                        ]
                                                                            .options;
                                                                    const optionsIndex =
                                                                        options.findIndex(
                                                                            (
                                                                                value
                                                                            ) => {
                                                                                return (
                                                                                    value.uuid ===
                                                                                    val.uuid
                                                                                );
                                                                            }
                                                                        );
                                                                    options.splice(
                                                                        optionsIndex,
                                                                        1
                                                                    );
                                                                    setQuestions(
                                                                        cp
                                                                    );
                                                                    e.preventDefault();
                                                                    if (
                                                                        idx ===
                                                                        0
                                                                    ) {
                                                                        setTimeout(
                                                                            () => {
                                                                                document
                                                                                    .getElementsByClassName(
                                                                                        "cardWrapper"
                                                                                    )
                                                                                    [
                                                                                        i +
                                                                                            1
                                                                                    ].getElementsByClassName(
                                                                                        "customTextarea"
                                                                                    )[1]
                                                                                    .select();
                                                                            },
                                                                            1
                                                                        );
                                                                    } else {
                                                                        setTimeout(
                                                                            () => {
                                                                                document
                                                                                    .getElementsByClassName(
                                                                                        "cardWrapper"
                                                                                    )
                                                                                    [
                                                                                        i +
                                                                                            1
                                                                                    ].getElementsByClassName(
                                                                                        "customTextarea"
                                                                                    )
                                                                                    [
                                                                                        idx
                                                                                    ].select();
                                                                            },
                                                                            1
                                                                        );
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                        {warningIndex ===
                                                            `${i}-${idx}` && (
                                                            <Tooltip
                                                                title="중복옵션은 지원되지 않습니다."
                                                                onClick={(
                                                                    event
                                                                ) => {
                                                                    const cp = [
                                                                        ...questions,
                                                                    ];
                                                                    const options =
                                                                        cp[
                                                                            cardIndex -
                                                                                1
                                                                        ]
                                                                            .options;
                                                                    const optionsIndex =
                                                                        options.findIndex(
                                                                            (
                                                                                value
                                                                            ) => {
                                                                                return (
                                                                                    value.uuid ===
                                                                                    val.uuid
                                                                                );
                                                                            }
                                                                        );
                                                                    options[
                                                                        optionsIndex
                                                                    ].text = `옵션 ${options.length}`;
                                                                    setQuestions(
                                                                        cp
                                                                    );
                                                                    setWarningIndex(
                                                                        ""
                                                                    );
                                                                    document
                                                                        .getElementsByClassName(
                                                                            "cardWrapper"
                                                                        )
                                                                        [
                                                                            i +
                                                                                1
                                                                        ].getElementsByClassName(
                                                                            "customTextarea"
                                                                        )
                                                                        [
                                                                            idx +
                                                                                1
                                                                        ].blur();
                                                                    event.stopPropagation();
                                                                }}
                                                            >
                                                                <IconButton>
                                                                    <WarningIcon
                                                                        style={{
                                                                            color: "#E46337",
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>
                                                        )}
                                                        {v.options.length >
                                                            1 && (
                                                            <Tooltip
                                                                title="삭제"
                                                                onClick={() => {
                                                                    const cp = [
                                                                        ...questions,
                                                                    ];
                                                                    const options =
                                                                        cp[
                                                                            cardIndex -
                                                                                1
                                                                        ]
                                                                            .options;
                                                                    const optionsIndex =
                                                                        options.findIndex(
                                                                            (
                                                                                value
                                                                            ) => {
                                                                                return (
                                                                                    value.uuid ===
                                                                                    val.uuid
                                                                                );
                                                                            }
                                                                        );
                                                                    options.splice(
                                                                        optionsIndex,
                                                                        1
                                                                    );
                                                                    setQuestions(
                                                                        cp
                                                                    );
                                                                }}
                                                            >
                                                                <IconButton>
                                                                    <ClearIcon
                                                                        style={{
                                                                            color: "#5f6368",
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                            <div
                                                className="flex fdr aic"
                                                style={{
                                                    height: 44,
                                                }}
                                            >
                                                {v.questionType === "RADIO" ? (
                                                    <RadioButtonUncheckedOutlinedIcon
                                                        style={{
                                                            color: "#B3B3B3",
                                                        }}
                                                    />
                                                ) : v.questionType ===
                                                  "CHECK_BOX" ? (
                                                    <CheckBoxOutlineBlankIcon
                                                        style={{
                                                            color: "#B3B3B3",
                                                        }}
                                                    />
                                                ) : (
                                                    <span
                                                        style={{
                                                            fontSize: 14,
                                                        }}
                                                    >
                                                        {v.options.length + 1}
                                                    </span>
                                                )}

                                                {v.questionType ===
                                                "DROP_DOWN" ? (
                                                    <div
                                                        style={{
                                                            fontSize: 14,
                                                            marginLeft: 12,
                                                        }}
                                                    >
                                                        <span
                                                            className="addOption"
                                                            style={{
                                                                display:
                                                                    "inline-flex",
                                                                color: "#7f7f7f",
                                                                height: 35,
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                            onClick={() => {
                                                                const cp = [
                                                                    ...questions,
                                                                ];
                                                                const index =
                                                                    cp.findIndex(
                                                                        (x) =>
                                                                            x.uuid ===
                                                                            v.uuid
                                                                    );
                                                                const options =
                                                                    cp[index]
                                                                        .options;
                                                                options.push({
                                                                    uuid: uuid(),
                                                                    text: `옵션 ${
                                                                        v
                                                                            .options
                                                                            .length +
                                                                        1
                                                                    }`,
                                                                });
                                                                setQuestions(
                                                                    cp
                                                                );
                                                            }}
                                                        >
                                                            옵션 추가
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={{
                                                            fontSize: 14,
                                                            marginLeft: 12,
                                                        }}
                                                    >
                                                        <span
                                                            className="addOption"
                                                            style={{
                                                                display:
                                                                    "inline-flex",
                                                                color: "#7f7f7f",
                                                                height: 35,
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                            onClick={() => {
                                                                const cp = [
                                                                    ...questions,
                                                                ];
                                                                const index =
                                                                    cp.findIndex(
                                                                        (x) =>
                                                                            x.uuid ===
                                                                            v.uuid
                                                                    );
                                                                const options =
                                                                    cp[index]
                                                                        .options;
                                                                options.push({
                                                                    uuid: uuid(),
                                                                    text: `옵션 ${
                                                                        v
                                                                            .options
                                                                            .length +
                                                                        1
                                                                    }`,
                                                                });
                                                                setQuestions(
                                                                    cp
                                                                );
                                                            }}
                                                        >
                                                            옵션 추가
                                                        </span>{" "}
                                                        또는{" "}
                                                        <span
                                                            className="addOther"
                                                            style={{
                                                                display:
                                                                    "inline-flex",
                                                                color: "#4285F4",
                                                                alignItems:
                                                                    "center",
                                                                padding:
                                                                    "0 5px",
                                                                marginLeft: -3,
                                                                borderRadius: 4,
                                                                height: 35,
                                                            }}
                                                        >
                                                            '기타' 추가
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                marginTop: 20,
                                                marginBottom: 15,
                                                fontSize: 14,
                                                color: "gray",
                                                borderBottom:
                                                    "1px dotted black",
                                                paddingBottom: 5,
                                                width: 350,
                                            }}
                                        >
                                            장문형 텍스트
                                        </div>
                                    )}
                                    <div
                                        style={{
                                            position: "relative",
                                            top: 26,
                                            width: 720,
                                            height: 65,
                                            borderTop: "1px solid #d9d9d9",
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        <Tooltip
                                            title="복사"
                                            onClick={() => {
                                                const cp = [...questions];
                                                cp.splice(cardIndex, 0, {
                                                    ...cp[cardIndex - 1],
                                                    uuid: uuid(),
                                                    options: cp[
                                                        cardIndex - 1
                                                    ].options.map((x) => {
                                                        return {
                                                            text: x.text,
                                                            uuid: uuid(),
                                                        };
                                                    }),
                                                });
                                                setQuestions(cp);
                                            }}
                                        >
                                            <IconButton>
                                                <FileCopyOutlinedIcon
                                                    style={{ color: "#5f6368" }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            title="삭제"
                                            onClick={() => {
                                                const cp = [...questions];
                                                const index = cp.findIndex(
                                                    (x) => {
                                                        return x.uuid == v.uuid;
                                                    }
                                                );
                                                cp.splice(index, 1);
                                                setQuestions(cp);
                                            }}
                                        >
                                            <IconButton>
                                                <DeleteOutlineIcon
                                                    style={{ color: "#5f6368" }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                        <div
                                            style={{
                                                height: 30,
                                                borderLeft: "1px solid #d9d9d9",
                                                marginLeft: 15,
                                                marginRight: 20,
                                            }}
                                        ></div>
                                        <div className="flex fdr jcfe">
                                            <div className="flex fdr aic">
                                                <span
                                                    style={{
                                                        marginRight: 16,
                                                        fontSize: 14,
                                                    }}
                                                >
                                                    필수
                                                </span>
                                                <Toggle
                                                    active={
                                                        questions[i].required
                                                    }
                                                    setToggle={() => {
                                                        const cp = [
                                                            ...questions,
                                                        ];
                                                        cp[
                                                            cardIndex - 1
                                                        ].required =
                                                            !cp[cardIndex - 1]
                                                                .required;
                                                        setQuestions(cp);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <IconButton style={{ marginLeft: 5 }}>
                                            <MoreVertIcon
                                                style={{ color: "#5f6368" }}
                                            />
                                        </IconButton>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div>
                                        {v.question ? v.question : "질문"}{" "}
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
                                    {v.questionType != "TEXT" ? (
                                        v.options.map((val, idx) => {
                                            return (
                                                <div
                                                    className="flex fdr aic optionsContainer"
                                                    style={{
                                                        marginTop:
                                                            idx === 0 ? 15 : 0,
                                                        position: "relative",
                                                        height: 48,
                                                    }}
                                                    onClick={(event) => {
                                                        setTimeout(() => {
                                                            document
                                                                .getElementsByClassName(
                                                                    "cardWrapper"
                                                                )
                                                                [
                                                                    i + 1
                                                                ].getElementsByClassName(
                                                                    "customTextarea"
                                                                )
                                                                [
                                                                    idx + 1
                                                                ].select();
                                                            event.stopPropagation();
                                                        }, 1);
                                                    }}
                                                >
                                                    {v.questionType ===
                                                    "RADIO" ? (
                                                        <RadioButtonUncheckedOutlinedIcon
                                                            style={{
                                                                color: "#B3B3B3",
                                                                position:
                                                                    "relative",
                                                                top: 1,
                                                            }}
                                                        />
                                                    ) : v.questionType ===
                                                      "CHECK_BOX" ? (
                                                        <CheckBoxOutlineBlankIcon
                                                            style={{
                                                                color: "#B3B3B3",
                                                                position:
                                                                    "relative",
                                                                top: 1,
                                                            }}
                                                        />
                                                    ) : (
                                                        <span
                                                            style={{
                                                                fontSize: 14,
                                                                position:
                                                                    "relative",
                                                                top: 1,
                                                            }}
                                                        >
                                                            {idx + 1}
                                                        </span>
                                                    )}
                                                    <span
                                                        style={{
                                                            fontSize: 14,
                                                            marginLeft: 10,
                                                        }}
                                                    >
                                                        {val.text}
                                                    </span>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div
                                            style={{
                                                marginTop: 20,
                                                marginBottom: 15,
                                                fontSize: 14,
                                                color: "gray",
                                                borderBottom:
                                                    "1px dotted black",
                                                paddingBottom: 5,
                                                width: 350,
                                            }}
                                        >
                                            장문형 텍스트
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>
                    );
                })}
                <div ref={footer} style={{ height: 1 }}></div>
                <div
                    ref={rightDiv}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        position: "absolute",
                        top: 0,
                        right: -60,
                        backgroundColor: "white",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        fontSize: 25,
                        border: "1px solid #dadce0",
                        boxShadow: "0px 1px 1px rgb(148, 146, 146)",
                        transition: "top 0.25s ease-in-out",
                    }}
                >
                    <Tooltip
                        title="질문 추가"
                        onClick={() => {
                            const cp = [...questions];
                            cp.splice(cardIndex, 0, {
                                questionType: "RADIO",
                                question: "",
                                uuid: uuid(),
                                options: [
                                    {
                                        text: "옵션 1",
                                        uuid: uuid(),
                                    },
                                ],
                                required: false,
                            });
                            setQuestions(cp);
                        }}
                    >
                        <IconButton size={"small"}>
                            <AddCircleOutlineIcon
                                style={{ color: "#5f6368" }}
                            />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <Drawer
                anchor={"right"}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 15,
                        width: 300,
                        borderBottom: "1px solid skyBlue",
                        boxShadow: "0px 1px 1px rgb(148, 146, 146)",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <ColorLensOutlinedIcon />
                        <span style={{ marginLeft: 10 }}>테마 옵션</span>
                    </div>
                    <div>
                        <ClearIcon
                            onClick={() => {
                                setOpenDrawer(false);
                            }}
                        />
                    </div>
                </div>
                <div style={{ padding: 15, borderBottom: "1px solid skyBlue" }}>
                    <div>테마 색상</div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Tooltip
                            title="빨간색 #db4437"
                            onClick={() => {
                                setColor("rgba(219, 68, 55");
                                document.body.style.backgroundColor =
                                    "rgba(219, 68, 55, 0.15)";
                                document.getElementsByClassName(
                                    "cardTopBar"
                                )[0].style.backgroundColor =
                                    "rgba(219, 68, 55, 1)";
                            }}
                        >
                            <IconButton size={"small"}>
                                <FiberManualRecordIcon
                                    style={{
                                        color: "rgba(219, 68, 55, 1)",
                                        fontSize: 50,
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="자주색 #673ab7"
                            onClick={() => {
                                setColor("rgba(103, 58, 183");
                                document.body.style.backgroundColor =
                                    "rgba(103, 58, 183, 0.15)";
                                document.getElementsByClassName(
                                    "cardTopBar"
                                )[0].style.backgroundColor =
                                    "rgba(103, 58, 183, 1)";
                            }}
                        >
                            <IconButton size={"small"}>
                                <FiberManualRecordIcon
                                    style={{
                                        color: "rgba(103, 58, 183, 1)",
                                        fontSize: 50,
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="남색 #3f51b5"
                            onClick={() => {
                                setColor("rgba(63, 81, 181");
                                document.body.style.backgroundColor =
                                    "rgba(63, 81, 181, 0.15)";
                                document.getElementsByClassName(
                                    "cardTopBar"
                                )[0].style.backgroundColor =
                                    "rgba(63, 81, 181, 1)";
                            }}
                        >
                            <IconButton size={"small"}>
                                <FiberManualRecordIcon
                                    style={{
                                        color: "rgba(63, 81, 181, 1)",
                                        fontSize: 50,
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div style={{ padding: 15, borderBottom: "1px solid skyBlue" }}>
                    <div>배경 색상</div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Tooltip
                            title="연한"
                            onClick={() => {
                                document.body.style.backgroundColor = `${color}, 0.15)`;
                            }}
                        >
                            <IconButton size={"small"}>
                                <FiberManualRecordIcon
                                    style={{
                                        color: `${color}, 0.15)`,
                                        fontSize: 50,
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="중간"
                            onClick={() => {
                                document.body.style.backgroundColor = `${color}, 0.25)`;
                            }}
                        >
                            <IconButton size={"small"}>
                                <FiberManualRecordIcon
                                    style={{
                                        color: `${color}, 0.25)`,
                                        fontSize: 50,
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="어두운"
                            onClick={() => {
                                document.body.style.backgroundColor = `${color}, 0.35)`;
                            }}
                        >
                            <IconButton size={"small"}>
                                <FiberManualRecordIcon
                                    style={{
                                        color: `${color}, 0.35)`,
                                        fontSize: 50,
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </Drawer>
            <div
                style={{
                    fontSize: 20,
                    color: "gray",
                    textAlign: "center",
                    marginTop: 5,
                }}
            >
                색상변경 및 미리보기가 가능합니다.
                <br />
                옵션을 섞고싶은 카드를 선택한 뒤 Ctrl + Enter를 입력하시면
                옵션을 무작위로 섞을 수 있습니다.
            </div>
        </div>
    );
};

export default CreateForm;
