import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Movie, Search, Tv, Whatshot } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#2d313a",
        zIndex: 100,
        color: "white"
    }
});
const iconStyle = {
    color: "white"
}


export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (value === 0) {
            navigate("/");
        } else if (value === 1) {
            navigate("/movies");
        } else if (value === 2) {
            navigate("/series");
        } else {
            navigate("/search");
        }

    }, [value]);

    return (
        <BottomNavigation
            showLabels
            className={classes.root}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}>
            <BottomNavigationAction
                style={iconStyle}
                label="Trending"
                icon={<Whatshot />} />
            <BottomNavigationAction
                style={iconStyle}
                label="Movies"
                icon={<Movie />} />
            <BottomNavigationAction
                style={iconStyle}
                label="TV Series"
                icon={<Tv />} />
            <BottomNavigationAction
                style={iconStyle}
                label="Search"
                icon={<Search />} />
        </BottomNavigation>
    );
}
