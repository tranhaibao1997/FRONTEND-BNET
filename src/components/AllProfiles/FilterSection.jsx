import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { StoreContext } from "../../ThemeContext";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
function FilterSection({ getAllProfiles }) {
    const classes = useStyles();

    let { currentPage, minAge, maxAge, gender } = React.useContext(StoreContext);
    console.log(currentPage,minAge,maxAge,gender)


    const [lookingFor, setLookingFor] = React.useState('');
    const [ageValue, setAgeValue] = React.useState([0, 100]);

    const ageHandleChange = (event, newValue) => {
        setAgeValue(newValue);
        minAge[1](newValue[0])
        maxAge[1](newValue[1])
    };

    const lookingForhandleChange = (event) => {
        let genderString = ""
        if (event.target.value == "Male") {
            genderString = "Female"
            setLookingFor("Female");
        }

        else if (event.target.value == "Female") {
            genderString = "Male"
            setLookingFor("Male");
        }
        else if (event.target.value == "All") {
            genderString = null
            setLookingFor(null)
        }
        gender[1](genderString)
    };
    function filterFriend() {
        console.log(lookingFor)

        getAllProfiles(ageValue[0], ageValue[1], lookingFor)
        // minAge[1](0)
        // maxAge[1](100)
        // currentPage[1](1)
        // gender[1](null)
    }


    return (
        <div>
            <div style={{ padding: "15px" }} className="filter-wrapper">
                <div className="row">


                    <div className=" col-lg-12">
                        <label htmlFor="inputState">Gender</label>
                        <select
                            id="inputState"
                            className="form-control"
                            name="gender"
                            // value={"" || gender}
                            onChange={(e) => lookingForhandleChange(e)}

                        >
                            <option selected>Choose Your Gender...</option>
                            <option>All</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>




                    <div className="col-lg-12">

                        <div style={{ padding: "7x", marginTop: "15px" }} className={classes.root}>

                            <label>Age: {`${ageValue[0]}-${ageValue[1]} `}</label>

                            <Slider
                                min={0}
                                max={100}
                                value={ageValue}
                                onChange={ageHandleChange}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"

                            />
                        </div>
                    </div>


                    <button onClick={() => filterFriend()} type="button" style={{ marginTop: "20px" }} className="btn btn-primary">Search</button>


                </div>

            </div>
        </div>
    );
}

export default FilterSection;