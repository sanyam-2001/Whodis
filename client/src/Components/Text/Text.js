import React from 'react';

const Text = (props) => {
    return (
        <div style={{ display: 'flex', justifyContent: props.sentMessage ? 'flex-end' : 'flex-start' }}>
            <div style={{ color: 'white', backgroundColor: props.sentMessage ? 'rgb(5,97,98)' : 'rgb(38,45,49)', marginTop: '5px', marginBottom: '5px', maxWidth: '60%', minWidth: '30%', borderRadius: '20px', padding: '10px', position: 'relative' }}>
                <div style={{ fontSize: '10px', color: 'rgb(221,222,223)', textAlign: 'left', width: '90%', margin: 'auto' }}>{props.date}</div>
                <div style={{ width: '90%', margin: 'auto' }}>{props.message}</div>
                <div style={{ fontSize: '10px', color: 'rgb(221,222,223)', textAlign: 'right', width: '90%', margin: 'auto' }}>{props.time}</div>
            </div>
        </div >
    );
}

export default Text;