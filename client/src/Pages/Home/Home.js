import React, { useState, useEffect } from 'react';
import Hero from '../../Components/HomeComponents/Hero/Hero'
import Drawer from '../../Components/HomeComponents/Drawer/Drawer'
import ProfilePanel from '../../Components/HomeComponents/ProfilePanel/ProfilePanel';
import profileImage from '../../dp.jpg'
import JWTGET from '../../Requests/Gets'
const Home = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [user, setUser] = useState({})
    const [location, setLocation] = useState({})
    const [coverImage, setCoverImage] = useState(null)
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

    }, []);

    return (
        <div>
            <Drawer
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                backgroundImage={coverImage}
                profileImage={profileImage}
            />
            <Hero
                backgroundImage={coverImage}
                setBackgroundImage={setCoverImage}
                profileImage={profileImage}
                name={`${user.firstName} ${user.lastName}`}
                location={`${location.state}, ${location.country}`}
                setDrawerOpen={setDrawerOpen}
                isCenter={isCenter}
                setisCenter={setisCenter}
            />
            <ProfilePanel
                profileImage={profileImage}
                about={user.about}
            />
        </div>
    );
}

export default Home;