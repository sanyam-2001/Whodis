import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
const Backdrop = (props) => {
    return (
        <div style={{ position: 'fixed', height: '100vh', top: 0, left: 0, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: props.open ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
            <div>
                <CircularProgress />
            </div>
        </div>
    );
}

export default Backdrop;