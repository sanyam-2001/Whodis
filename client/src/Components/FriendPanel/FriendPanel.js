import React, { useState } from 'react';
import ComponentLoader from './../ComponentLoader/ComponentLoader';
import styles from './FriendPanel.module.css';
import {
    TextField
} from '@material-ui/core';
import {
    withStyles
} from '@material-ui/core/styles';
import FriendBar from './FriendBar';
import PureFriendBar from './PureFriendBar';
const WhiteInput = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#FFC288',
        },
        '& label': {
            color: 'whitesmoke',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        "& .MuiInputBase-root": {
            color: "#FCECDD",
            "& input": {
                textAlign: "left"
            }
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: '#FFC288',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#FF6701',
            },
        },
    },
})(TextField);


const FriendPanel = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const [friends, setFriends] = useState([]);
    const allFriends = props.friendList.map((friend) => {
        return <FriendBar id={friend} key={friend} setFriends={setFriends} />
    });
    const result = friends.filter((f) => f.name.includes(searchValue))
    const resultComponent = result.map((friend) => <PureFriendBar id={friend.id} key={friend.id} setFriends={setFriends} />)
    return (
        <div className={styles.mainContainer}>
            <div className={styles.friendList}>
                <h3>Friend List</h3>
                <hr />
                {allFriends}
            </div>
            <div className={styles.searchPanel}>
                <div className={styles.searchBox}>

                    <WhiteInput
                        id="iwia121t"
                        fullWidth
                        style={{ borderBottom: '2px solid white' }}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search Friends..."

                    />
                </div>
                <div className={styles.searchResults}>
                    {searchValue === '' ? <ComponentLoader /> : resultComponent}
                </div>
            </div>
        </div>
    );
}

export default FriendPanel;