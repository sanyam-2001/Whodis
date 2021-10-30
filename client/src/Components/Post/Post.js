import React, { useState, useEffect } from 'react';
import styles from './Post.module.css';
import defaultImage from '../../default.jpg';
import moment from 'moment'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import JWTGET from './../../Requests/Gets';
import Backdrop from './../Backdrop/Backdrop';
import CommentPanel from '../CommentPanel/CommentPanel';


const Post = (props) => {
    const timestamp = parseInt(props.timestamp);
    const [likes, setLikes] = useState(props.likes);
    const [user, setUser] = useState({
        location: {
            country: "",
            state: ""
        },
        friends: []
    });
    const [dp, setDp] = useState(null);
    const [myID, setMyID] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        fetch(`/getDp/${props.userID}`)
            .then(res => res.json())
            .then(data => {
                setDp(data.src)
            })
            .catch(err => console.error(err));
        fetch(`/getUser/${props.userID}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
            })
        JWTGET('/myUserID')
            .then(res => {
                setMyID(res.id)
            })
    }, [props.userID]);
    const likePost = () => {
        setLoading(true);
        JWTGET(`/likePost/${props.id}`)
            .then(res => {
                setLikes(prev => [...prev, myID])
                setLoading(false);
            })
    }
    const unlikePost = () => {
        setLoading(true);
        JWTGET(`/unlikePost/${props.id}`)
            .then(res => {
                setLikes(prev => {
                    const deleted = prev.filter(e => e !== myID)
                    return deleted;
                })
                setLoading(false);

            })

    }
    return (
        <div style={{ justifyContent: 'space-between', display: 'flex'}}>
            <Backdrop open={loading} />
            <div className={styles.aesthetic} style={{ width: '40%', padding: '1%', borderRadius: '16px', marginTop: '2.5%', marginBottom: '2.5%' }}>

            </div>
            <div className={styles.postPanel} style={{ backgroundColor: 'white', boxShadow: '4px 4px 10px 10px rgba(0, 0, 0, 0.1)', padding: '1%', borderRadius: '16px', marginTop: '2.5%', marginBottom: '2.5%', display: props.img ? 'block' : 'flex', flexDirection: 'column' }}>
                <CommentPanel comments={props.comments} open={open} setOpen={setOpen} dp={props.dp} postID = {props.id}/>
                <div style={{ display: 'flex', width: '90%', margin: 'auto' }}>
                    <img src={dp || defaultImage} alt="DP" height="50" width="50" style={{ objectFit: 'cover', borderRadius: '50%' }} />
                    <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '16px', flex: 1 }}>{`${user.firstName} ${user.lastName}`}</div>
                        {/* <div>{moment(timestamp).format('dddd')}, {moment(timestamp).format('hh:mm a')}</div> */}
                        <div style={{ fontFamily: 'Helvetica', fontSize: '12px', color: 'grey', flex: 1 }}>{moment(timestamp).calendar()}</div>
                    </div>
                </div>
                <div style={{ width: '90%', margin: 'auto', height: 'inherit', fontSize: !props.img ? '32px' : '24px', marginTop: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', flex: 1 }} className={styles.caption}>
                    {props.caption}
                </div>
                {props.img ?
                    <div style={{ width: '90%', margin: 'auto' }}>
                        <img src={props.img} alt="POST" style={{ width: '100%', borderRadius: '20px', marginTop: '20px', marginBottom: '20px' }} />
                    </div> : null
                }
                <hr style={{ width: '95%', margin: 'auto', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '10px', marginBottom: '10px' }} />
                <div style={{ width: '90%', margin: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        {likes.length} {likes.length === 1 ? "Like" : "Likes"}
                    </div>
                    <div>
                        {props.comments.length} {props.comments.length === 1 ? "Comment" : "Comments"}
                    </div>
                </div>
                <hr style={{ width: '95%', margin: 'auto', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '10px', marginBottom: '10px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', margin: 'auto' }}>
                    {likes.includes(myID) ? <FavoriteIcon style={{ color: 'red', cursor: 'pointer' }} onClick={unlikePost} /> : <FavoriteBorderIcon style={{ color: 'red', cursor: 'pointer' }} onClick={likePost} />}
                    {<ChatIcon style={{ color: 'blue', cursor: 'pointer' }} onClick={()=>setOpen(prev=>!prev)} />}
                </div>
            </div>
        </div >
    );
}

export default Post;