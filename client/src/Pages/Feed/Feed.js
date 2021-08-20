import React, { useState, useEffect } from 'react';
import JWTGET from '../../Requests/Gets';
import FWPost from '../../Components/Post/FWPost';
import { CircularProgress } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Feeds = () => {
    const [next, setNext] = useState(true);
    const [posts, setPosts] = useState([]);
    const [prev, setPrev] = useState(null);
    useEffect(() => {
        if (next) {
            JWTGET(`/getFeedPosts/${posts.length}`)
                .then((res) => {
                    setPosts([...posts, ...res.posts]);
                    setPrev(res.skipCount);
                });
        }
    }, [posts.length, posts, next]);

    useEffect(() => {
        if (prev) {
            if (prev == posts.length) {
                setNext(false);
            }
        }
    }, [posts.length, prev]);
    const postComponent = posts.map((post, i) => <FWPost key={i} userID={post.userID} caption={post.caption} timestamp={post.timestamp} img={post.img} comments={post.comments} likes={post.likes} setPosts={setPosts} id={post.id} />)
    console.log(posts);
    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    
                    <Typography variant="h6" color="inherit">
                        Whodis Feed
                    </Typography>
                    
                </Toolbar>
            </AppBar>
            <div style={{ width: '50%', margin: 'auto' }}>
                {postComponent}
            </div>
            <div style={{ textAlign: 'center', display: next ? 'block' : 'none' }}>
                <CircularProgress />
            </div>
        </>
    );
}

export default Feeds;