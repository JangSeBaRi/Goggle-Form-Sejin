import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem } from "@material-ui/core";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import { SwapVertTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    select: {
        backgroundColor: "white",
        width: 208,
        height: 48,
        color: "#5f6368",
        outline: 'none',
        inline: 'none',
        '&:focus': {
            backgroundColor: 'white',
        },
        '&:hover': {
            backgroundColor: 'white',
        },
        '&:active': {
            backgroundColor: 'white',
        },
        '&:link': {
            backgroundColor: 'white',
        },
        '&:visited': {
            backgroundColor: 'white',
        },
    },
    MenuItem: {
        color: "#5F6368",
        '&:hover': {
            backgroundColor: '#EEEEEE',
        },
        '&:focus': {
            backgroundColor: 'rgba(26,115,232,0.078)'
        },
        '&:focus:hover': {
            backgroundColor: 'rgba(26,115,232,0.039)'
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

const TestPage3 = () => {
    const classes = useStyles();
    const [select, setSelect] = useState("RADIO");
    const handleChange = (e) => {
        setSelect(e.target.value);
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                margin: 0,
                width: "100%",
                height: "100vh",
            }}
        >
            <Select
                value={select}
                onChange={handleChange}
                renderValue={(value) => {
                    switch (value) {
                        case "RADIO":
                            return (
                                <div className={classes.MenuItemList}>
                                    <RadioButtonCheckedIcon />
                                    <span className={classes.MenuItemListLabel}>
                                        객관식 질문
                                    </span>
                                </div>
                            );
                        case "CHECK_BOX":
                            return (
                                <div className={classes.MenuItemList}>
                                    <CheckBoxIcon />{" "}
                                    <span className={classes.MenuItemListLabel}>
                                        체크박스
                                    </span>
                                </div>
                            );
                        case "DROP_DOWN":
                            return (
                                <div className={classes.MenuItemList}>
                                    <ArrowDropDownCircleIcon />
                                    <span className={classes.MenuItemListLabel}>
                                        드롭다운
                                    </span>
                                </div>
                            );
                    }
                }}
                variant="outlined"
                className={classes.select}
            >
                <MenuItem value={"RADIO"} className={classes.MenuItem}>
                    <RadioButtonCheckedIcon className={classes.icon} />
                    객관식 질문
                </MenuItem>
                <MenuItem value={"CHECK_BOX"} className={classes.MenuItem}>
                    <CheckBoxIcon className={classes.icon} />
                    체크박스
                </MenuItem>
                <MenuItem value={"DROP_DOWN"} className={classes.MenuItem}>
                    <ArrowDropDownCircleIcon className={classes.icon} />
                    드롭다운
                </MenuItem>
            </Select>
        </div>
    );
};

export default TestPage3;
