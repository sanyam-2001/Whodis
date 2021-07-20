import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css'
import defaultCover from '../../defaultCover.jpg'
import defaultImg from '../../default.jpg';
import FWPost from '../Post/FWPost';
import Backdrop from './../../Components/Backdrop/Backdrop';

const Profile = (props) => {
    const [user, setUser] = useState({
        location: {
            country: '',
            state: ''
        },
        friends: [],
        searchRequestsSent: [],
        searchRequestsRecieved: []
    });
    const [dp, setDp] = useState(null);
    const [cover, setCover] = useState(null);
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const dp = await fetch(`/getDp/${props.id}`);
            const cover = await fetch(`/coverImage/${props.id}`);
            const dpJson = await dp.json();
            const coverJson = await cover.json();
            const user = await fetch(`/getUser/${props.id}`)
            const userJson = await user.json();
            setDp(dpJson.src);
            setCover(coverJson.src);
            console.log(userJson)
            setUser(userJson);
            setLoading(false);
        }
        if (props.id) {
            getData();

        }
    }, [props.id]);

    useEffect(() => {
        if (props.id) {
            fetch(`/getPosts/${props.id}`)
                .then(res => res.json())
                .then(data => {
                    setPosts(data)
                })
        }
    }, [props.id]);

    const postComponent = posts.map((post, i) => <FWPost key={i} userID={post.userID} caption={post.caption} timestamp={post.timestamp} img={post.img} comments={post.comments} likes={post.likes} setPosts={props.setPosts} id={post.id} />).reverse()

    return (
        <div style={{ display: props.open ? 'block' : 'none' }} className={styles.backdrop} onClick={() => props.setOpen(false)}>
            <Backdrop open={loading} />
            <div className={styles.profile} style={{ overflow: 'hidden scroll' }} onClick={(e) => e.stopPropagation()}>
                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${cover || defaultCover})`, height: '30vh', backgroundSize: 'cover' }}></div>
                <img src={dp || defaultImg} alt="DP" height="70" width="70" style={{ position: 'absolute', right: '5%', transform: 'translateY(-50%)', objectFit: 'cover', borderRadius: '50%' }} />
                <div style={{ marginTop: '45px', fontFamily: 'monospace', fontSize: '40px', textAlign: 'center' }}>
                    {user.relationshipStatus} - {user.gender}
                </div>
                {postComponent}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ height: '2px', flex: 1, backgroundColor: 'black' }}></div>
                    <div style={{ padding: '2em', fontSize: '32px', fontFamily: 'monospace' }}>End Of Wall</div>
                    <div style={{ height: '2px', flex: 1, backgroundColor: 'black' }}></div>
                </div>
            </div>

        </div>
    );
}

export default Profile;