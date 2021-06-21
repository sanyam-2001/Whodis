import React from 'react';
import styles from './ProfilePanel.module.css'
import { Fab } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
const ProfilePanel = (props) => {
    return (
        <div className={styles.profileContainer}>
            <div className={styles.picture} style={{ backgroundImage: `url(${props.profileImage})`, width: '100%', height: '60vh' }}>
                <div style={{ position: 'absolute', right: '5%', bottom: '0%', transform: 'translateY(50%)', zIndex: '5' }}>
                    <Fab color="secondary" aria-label="edit">
                        <PublishIcon />
                    </Fab>
                </div>
            </div>
            <div>

                <div className={styles.blockquote}>

                    <h1><span className="Cdefault">&#8220;About</span></h1>
                    <hr style={{ margin: '5px' }} />
                    <p>{props.about}
                    </p>
                </div>
                <div className={styles.blockquote}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                        <h4 style={{ color: 'black' }}>Friends</h4>
                        <h4>200</h4>
                    </div>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                        <h4 style={{ color: 'black' }}>Requests Sent</h4>
                        <h4>50</h4>
                    </div>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                        <h4 style={{ color: 'black' }}>Requests Recieved</h4>
                        <h4>150</h4>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProfilePanel;