import React, { useState, useRef } from 'react';
import styles from '../Auth.module.css'
import {
    Select,
    MenuItem,
    IconButton,
    Button,
    TextField,
    Input,
    InputAdornment,
    InputLabel
} from '@material-ui/core';
import {
    Visibility,
    VisibilityOff

} from '@material-ui/icons';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment';
import countryOptions from '../Components/Country'
import { TimelineLite } from 'gsap'
import { Link, Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import POST from '../Requests/Posts'

const Signup = () => {
    const [passwordVisibility, setPasswordVisibility] = useState('password');
    const [selectedDate, handleDateChange] = useState(new Date());
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [gender, setGender] = useState('');
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('JWTTOKEN'));

    let firstRef = useRef(null);
    let secondRef = useRef(null);
    let thirdRef = useRef(null);

    const handleSubmit = async () => {
        let auth = true;
        if (firstName.length < 2 || lastName.length < 2) {
            toast.error('Please Enter a Valid Name!');
            auth = false;
        }
        if (password.length < 6) {
            toast.error('Please Enter a Password!');
            auth = false;
        }
        if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            toast.error('Please Enter a Valid Email Address!');
            auth = false;
        }
        if (!auth) return navigatetoFirst();
        if (country === "" || state === "") {
            toast.error('Please Enter Valid Location Parameters!');
            auth = false;
        }
        if (gender === "") {
            toast.error('Please Enter Your Orientation Information!');
            auth = false;
        }
        if (!auth) return;
        const payload = {
            firstName,
            lastName,
            email,
            password,
            selectedDate,
            gender,
            location: {
                country,
                state
            },
            relationshipStatus: 'Unset',
            about: 'Tell People Something about Yourself. \n Hobbies, Interests or a Pretentious Quote... \n Noone Would Judge ;)',
            friends: []
        }
        const token = await POST('/signup', payload);
        if (token.JWTTOKEN) {
            localStorage.setItem('JWTTOKEN', token.JWTTOKEN);
            setLoggedIn(token.JWTTOKEN);
        }
        else {
            if (token.errCode === 1) {
                toast('Email Already Exists!');
                return navigatetoFirst();
            }
            else {
                toast.error('Server Error...')
            }
        }
    }

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((loc) => {
            const { latitude, longitude } = loc.coords;
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=61ca76559d2148ec8094058f94ec76d8`)
                .then(response => response.json())
                .then(data => {
                    setState(data.results[0].components.state);
                    setCountry(data.results[0].components.country)
                });
        }, (err) => console.log(err))
    }

    const navigatetoSecond = () => {
        let tl = new TimelineLite({ paused: true });
        tl.to(firstRef, { left: '-70%' })
        tl.to(secondRef, { left: "50%" })
        tl.play()
    }
    const navigatetoFirst = () => {
        let tl = new TimelineLite({ paused: true });
        tl.to(secondRef, { left: '150%' })
        tl.to(firstRef, { left: "50%" })
        tl.play()
    }
    const peakOut = () => {
        let tl = new TimelineLite({ paused: true });
        tl.to(thirdRef, { width: '10%' })
        tl.to(thirdRef, { fontSize: 80, letterSpacing: '70px', backgroundColor: 'black', color: 'white' })
        tl.play()
    }
    const peakBack = () => {
        let tl = new TimelineLite({ paused: true });
        tl.to(thirdRef, { width: '5%' })
        tl.to(thirdRef, { fontSize: 60, letterSpacing: '1px', backgroundColor: 'white', color: 'black' })
        tl.play()
    }


    if (loggedIn) {
        return <Redirect to="/home" />
    }
    return (
        <div className={styles.bigContainer}>
            <Link to="/login">
                <div className={styles.peak} style={{ writingMode: 'vertical-lr', position: 'fixed', right: '0', top: 0, height: '100vh', width: '5%', backgroundColor: 'white', textAlign: 'center', fontFamily: 'monospace', fontSize: 60, cursor: 'pointer', color: 'black' }} ref={(e) => thirdRef = e} onMouseEnter={peakOut} onMouseLeave={peakBack}>
                    LOGIN
                </div>
            </Link>
            {/* First Pane */}

            <div className={styles.mainContainer} ref={(e) => firstRef = e}>
                <div className={styles.imagePane} style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(https://wallpaperaccess.com/full/1269989.jpg)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                    <div className={styles.textContainer}>
                        <div>
                            <h1 className={styles.fontUltra}>Hey!</h1>
                            <h2 className={styles.fontUltra}>You Look New Here!</h2>
                        </div>
                        <h2 className={styles.fontUltra}>Join Our Community Now</h2>
                    </div>
                </div>
                <div className={styles.actionPane} >
                    <div className={styles.actionContainer}>
                        <h1 className={styles.fontUltra}>Getting Started</h1>
                        <hr />
                        <br />
                        <div style={{ display: 'flex', marginTop: '20px', marginBottom: '' }}>
                            <TextField
                                label="First Name"
                                style={{ margin: 8 }}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                            />
                            <TextField
                                label="Last Name"
                                style={{ margin: 8 }}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                            />
                        </div>
                        <br /> <br />
                        <TextField
                            label="Email"
                            style={{ margin: 8 }}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                        />
                        <br /><br /><br />

                        <Input
                            id="standard-adornment-password"
                            type={passwordVisibility}
                            fullWidth
                            placeholder="Password"
                            style={{ margin: 8 }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setPasswordVisibility((prev) => prev === 'password' ? 'text' : 'password')}
                                    >
                                        {passwordVisibility === 'password' ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />

                    </div>
                    <div style={{ position: 'absolute', bottom: '5%', right: '5%' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={navigatetoSecond}
                        >
                            Next <ArrowRightIcon />
                        </Button>

                    </div>
                </div>
            </div>

            {/* Second Pane */}

            <div className={styles.mainContainer} style={{ left: '150%' }} ref={(e) => secondRef = e}>
                <div className={styles.actionPane} >
                    <div className={styles.actionContainer}>
                        <h1 className={styles.fontUltra}>Finishing Up</h1>
                        <hr />
                        <br />
                        <div style={{ display: 'flex', marginTop: '20px', marginBottom: '', alignItems: 'baseline' }}>
                            <Select
                                style={{ margin: 8, width: '40%' }}
                                placeholder="Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <MenuItem value={""} disabled={true}>Country</MenuItem>
                                {countryOptions}
                            </Select>
                            <TextField
                                label="State"
                                style={{ margin: 8, width: '40%' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                            <LocationSearchingIcon style={{ cursor: 'pointer' }} onClick={getLocation} />
                        </div>
                        <br />
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
                                style={{ width: '100%' }}
                            />
                        </MuiPickersUtilsProvider>
                        <br /><br /> <br />
                        <div>
                            <InputLabel id="demo-simple-select-helper-label" style={{ fontSize: '12px', marginLeft: '10px' }}>Gender</InputLabel>
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

                    </div>
                    <div style={{ position: 'absolute', bottom: '5%', right: '5%', width: '90%', margin: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={navigatetoFirst}
                        >
                            Back <ArrowLeftIcon />
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Signup <ArrowRightIcon />
                        </Button>


                    </div>
                </div>
                <div className={styles.imagePane} style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(https://images.unsplash.com/photo-1502899576159-f224dc2349fa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGNpdHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                    <div className={styles.textContainer}>
                        <div>
                            <h1 className={styles.fontUltra}>Almost Now!</h1>
                            <h2 className={styles.fontUltra}>Get us these Final Bits</h2>
                        </div>
                        <h2 className={styles.fontUltra}>Jump Right In!</h2>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Signup;