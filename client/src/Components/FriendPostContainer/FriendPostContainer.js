import React from 'react';
import FriendPanel from './../FriendPanel/FriendPanel';
import CreatePost from '../../Components/CreatePost/CreatePost'
const FriendPostContainer = (props) => {
    return (
        <div style={{ width: '95%', margin: 'auto', display: 'flex', justifyContent: 'space-between', marginBottom: '5%', marginTop: '7.5%' }}>
            <FriendPanel friendList={props.friendList} setFriendList={props.setFriendList} />
            <CreatePost dp={props.dp} />
        </div>
    );
}

export default FriendPostContainer;