import React, { useState, useEffect } from 'react';
import Hero from '../../Components/HomeComponents/Hero/Hero'
import Drawer from '../../Components/HomeComponents/Drawer/Drawer'
import ProfilePanel from '../../Components/HomeComponents/ProfilePanel/ProfilePanel';
import JWTGET from '../../Requests/Gets';
import { Redirect } from 'react-router-dom'
const Home = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [user, setUser] = useState({})
    const [location, setLocation] = useState({})
    const [coverImage, setCoverImage] = useState(null);
    const [dp, setDp] = useState(null);
    const [isCenter, setisCenter] = useState(true);
    useEffect(() => {
        JWTGET('/userDetails')
            .then(res => {
                setUser(res);
                setLocation(res.location)
            });
        JWTGET('/coverImage')
            .then(res => {
                if (res.src) {
                    setCoverImage(res.src);
                    setisCenter(res.isCenter)
                }
            })
        JWTGET('/dp')
            .then(res => {
                if (res.src) {
                    setDp(res.src)
                }
            })

    }, []);
    if (!localStorage.getItem('JWTTOKEN')) {
        return <Redirect to="/login" />
    }
    return (
        <div>
            <Drawer
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                backgroundImage={coverImage}
                profileImage={dp}
            />
            <Hero
                backgroundImage={coverImage}
                setBackgroundImage={setCoverImage}
                profileImage={dp}
                setDp={setDp}
                name={`${user.firstName} ${user.lastName}`}
                location={`${location.state}, ${location.country}`}
                setDrawerOpen={setDrawerOpen}
                isCenter={isCenter}
                setisCenter={setisCenter}
            />
            <ProfilePanel
                profileImage={dp}
                setDp={setDp}
                about={user.about}
            />
        </div>
    );
}

export default Home;