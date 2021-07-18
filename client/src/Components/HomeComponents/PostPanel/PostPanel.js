import React from 'react';
import Post from '../../Post/Post';

const PostPanel = (props) => {
    const postComponent = props.posts.map((post, i) => <Post key={i} userID={post.userID} caption={post.caption} timestamp={post.timestamp} img={post.img} comments={post.comments} likes={post.likes} setPosts={props.setPosts} id={post.id} />).reverse()
    return (
        <div style={{ width: '90%', margin: 'auto', paddingBottom: '10%' }}>
            {postComponent}
        </div>
    );
}

export default PostPanel;