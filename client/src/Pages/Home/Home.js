import React, { useState, useEffect } from 'react';
import Hero from '../../Components/HomeComponents/Hero/Hero'
import Drawer from '../../Components/HomeComponents/Drawer/Drawer'
import ProfilePanel from '../../Components/HomeComponents/ProfilePanel/ProfilePanel';
import JWTGET from '../../Requests/Gets';
import Details from '../../Components/Details/Details';
import Updater from '../../Components/UpdateComponent/Updater';
import { Redirect } from 'react-router-dom'
import FriendPostContainer from '../../Components/FriendPostContainer/FriendPostContainer'
const Home = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [user, setUser] = useState({})
    const [location, setLocation] = useState({})
    const [coverImage, setCoverImage] = useState(null);
    const [dp, setDp] = useState(null);
    const [isCenter, setisCenter] = useState(true);
    const [friendList, setFriendList] = useState([]);
    const [updaterType, setUpdaterType] = useState([]);

    useEffect(() => {
        JWTGET('/userDetails')
            .then(res => {
                if (!res) return localStorage.removeItem('JWTTOKEN')
                setUser(res);
                setLocation(res.location)
                setFriendList(res.friends)
            });
        JWTGET('/coverImage')
            .then(res => {
                if (!res) return localStorage.removeItem('JWTTOKEN')

                if (res.src) {

                    setCoverImage(res.src);
                    setisCenter(res.isCenter)
                }
            })
        JWTGET('/dp')
            .then(res => {
                if (!res) return localStorage.removeItem('JWTTOKEN')

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
                name={`${user.firstName} ${user.lastName}`}
                email={user.email}
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
                friendCount={friendList.length}
                reqsRecieved={user.requestsRecieved}
                reqsSent={user.requestsSent}
            />
            <Details
                gender={user.gender}
                relationshipStatus={user.relationshipStatus}
                dob={user.dateOfBirth}
                setUpdaterType={setUpdaterType}
            />
            <Updater
                type={updaterType}
                setUser={setUser}
            />
            <FriendPostContainer
                friendList={friendList}
                setFriendList={setFriendList}
                dp={dp}
            />


        </div>
    );
}

export default Home;