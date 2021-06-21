import React, { useState, useRef } from 'react';
import styles from '../Auth.module.css'
import {
    IconButton,
    Button,
    TextField,
    Input,
    InputAdornment,
} from '@material-ui/core';
import {
    Visibility,
    VisibilityOff

} from '@material-ui/icons';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { TimelineLite } from 'gsap'
import { Link, Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import POST from '../Requests/Posts'


const Login = () => {
    const [passwordVisibility, setPasswordVisibility] = useState('password');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("JWTTOKEN"));
    let thirdRef = useRef(null)
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

    const loginAttempt = async () => {
        let auth = true;
        if (email.indexOf('@') === -1) {
            toast.error('Please Enter a Valid Email!');
            auth = false;
        }
        if (password.length < 6) {
            toast.error('Password Missing!');
            auth = false;
        }
        if (!auth) return;
        const response = await POST('/login', { email, password });
        if (response.errCode) {
            if (response.errCode === 2) {
                return toast.error('User Not Found!');
            }
            else if (response.errCode === 3) {
                return toast.error('Incorrect Password!');
            }
            else {
                return toast.error('Server Error!');
            }
        }
        localStorage.setItem('JWTTOKEN', response.JWTTOKEN);
        setLoggedIn(response.JWTTOKEN);
    }

    if (loggedIn) {
        return <Redirect to="/home" />
    }


    return (
        <div className={styles.bigContainer}>
            <Link to="/">
                <div className={styles.peak} style={{ writingMode: 'vertical-lr', position: 'fixed', right: '0', top: 0, height: '100vh', width: '5%', backgroundColor: 'white', textAlign: 'center', fontFamily: 'monospace', fontSize: 60, cursor: 'pointer', color: 'black' }} ref={(e) => thirdRef = e} onMouseEnter={peakOut} onMouseLeave={peakBack}>
                    SIGNUP
                </div>
            </Link>
            <div className={styles.mainContainer}>
                <div className={styles.imagePane} style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(https://wallpaperaccess.com/full/1269989.jpg)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                    <div className={styles.textContainer}>
                        <div>
                            <h1 className={styles.fontUltra}>Hey!</h1>
                            <h2 className={styles.fontUltra}>Welcome Back!</h2>
                        </div>
                        <h2 className={styles.fontUltra}>Login to start!</h2>
                    </div>
                </div>
                <div className={styles.actionPane} >
                    <div className={styles.actionContainer}>
                        <h1 className={styles.fontUltra}>Logging In</h1>
                        <hr />
                        <br />
                        <br />
                        <br />
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
                            onClick={loginAttempt}
                        >
                            Login <ArrowRightIcon />
                        </Button>
                    </div>
                </div>
            </div>
            <ToastContainer />

        </div>
    );
}

export default Login;