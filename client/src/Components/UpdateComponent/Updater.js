import React, { useState, useRef, useEffect } from 'react';
import styles from './Update.module.css'
import {
    Select,
    MenuItem,
    Button,
    InputLabel
} from '@material-ui/core';
import { TimelineLite } from 'gsap';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment';
import JWTGET from '../../Requests/Gets';
import { toast, ToastContainer } from 'react-toastify';
const Updater = (props) => {
    const [gender, setGender] = useState('');
    const [selectedDate, handleDateChange] = useState(new Date());
    const [relationship, setRelationship] = useState('');
    let firstRef = useRef(null), secondRef = useRef(null), thirdRef = useRef(null);
    const open = () => {
        let tl = new TimelineLite({ paused: true });
        tl.to(firstRef, { left: '0', duration: 0.5, });
        tl.to(secondRef, { left: '0', duration: 0.5, delay: '-0.2' });
        tl.to(thirdRef, { left: '0', duration: 0.5, delay: '-0.3' });
        tl.play();
    }
    const close = () => {
        let tl = new TimelineLite({ paused: true });
        tl.to(firstRef, { left: '-100%', duration: 1, });
        tl.to(secondRef, { left: '-100%', duration: 1, delay: '-0.5' });
        tl.to(thirdRef, { left: '-100%', duration: 1, delay: '-0.5' });
        tl.play();
    }

    useEffect(() => {
        if (props.type === "AGE" || props.type === "GENDER" || props.type === "RELATIONSHIP") {
            open()
        }
    }, [props.type]);

    const handleUpdate = () => {
        if (props.type === "AGE") {
            JWTGET(`/updateAge/${selectedDate}`)
                .then(data => {
                    if (data.code === 200) {
                        props.setUser(data.user)
                    }
                });
            close();
            toast("User Information Updated!")

        }
        else if (props.type === "GENDER") {
            if (!gender) return;
            JWTGET(`/updateGender/${gender}`)
                .then(data => {
                    if (data.code === 200) {
                        props.setUser(data.user)
                    }
                });
            close();
            toast("User Information Updated!")

        }
        else {
            if (!relationship) return;
            JWTGET(`/updateRelationshipStatus/${relationship}`)
                .then(data => {
                    if (data.code === 200) {
                        props.setUser(data.user)
                    }
                });
            close();
            toast("User Information Updated!")

        }
    }
    return (
        <div>
            <ToastContainer />
            <div ref={(e) => firstRef = e} className={styles.heading} style={{ position: 'fixed', width: '100%', top: 0, height: '33.34%', backgroundColor: 'black', zIndex: 15, color: 'white', left: '-100%' }}>
                <h1>UPDATE RELATIONSHIP STATUS</h1>
            </div>
            <div ref={(e) => secondRef = e} style={{ position: 'fixed', width: '100%', top: '33.34%', height: '33.34%', backgroundColor: 'black', zIndex: 15, left: '-100%', display: 'flex', alignItems: 'center' }}>
                {props.type === 'GENDER' ?
                    <div style={{ width: '50%', marginLeft: '5%', backgroundColor: 'white', color: 'black', padding: '20px' }} >
                        <InputLabel id="iplabel1" style={{ fontSize: '12px', marginLeft: '10px' }}>Gender</InputLabel>
                        <Select
                            style={{ width: '100%', textAlign: 'left', marginTop: '8px' }}
                            placeholder="Gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <MenuItem value={""} disabled={true}>Gender</MenuItem>
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                            <MenuItem value={"Non Binary"}>Non Binary</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </div>
                    : null
                }
                {props.type === 'RELATIONSHIP' ?
                    <div style={{ width: '50%', marginLeft: '5%', backgroundColor: 'white', color: 'black', padding: '20px' }} >
                        <InputLabel id="iplabel2" style={{ fontSize: '12px', marginLeft: '10px' }}>Relationship Status</InputLabel>
                        <Select
                            style={{ width: '100%', textAlign: 'left', marginTop: '8px' }}
                            placeholder="Relationship Status"
                            value={relationship}
                            onChange={(e) => setRelationship(e.target.value)}
                        >
                            <MenuItem value={""} disabled={true}>Status</MenuItem>
                            <MenuItem value={"Single"}>Single</MenuItem>
                            <MenuItem value={"Committed"}>Committed</MenuItem>
                            <MenuItem value={"Complicated"}>Complicated</MenuItem>
                            <MenuItem value={"Unset"}>Unset</MenuItem>
                        </Select>
                    </div>
                    : null
                }
                {props.type === 'AGE' ?
                    <MuiPickersUtilsProvider utils={MomentUtils} >
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Birth Date"
                            format="MMM Do YYYY"
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            onChange={handleDateChange}
                            value={selectedDate}
                            style={{ width: '50%', marginLeft: '5%', backgroundColor: 'white', color: 'black', padding: '20px' }}

                        />
                    </MuiPickersUtilsProvider>
                    : null
                }

            </div>
            <div ref={(e) => thirdRef = e} className={styles.heading} style={{ position: 'fixed', width: '100%', top: '66.67%', height: '33.34%', backgroundColor: 'black', zIndex: 15, left: '-100%' }}>
                <Button onClick={handleUpdate} variant="contained" color="primary" style={{ padding: '10px', width: '25%', position: 'absolute', right: '5%' }}>
                    Update
                </Button>
            </div>

        </div>
    );
}

export default Updater;