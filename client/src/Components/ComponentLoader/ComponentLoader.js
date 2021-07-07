import React from 'react';
import styles from './ComponentLoader.module.css'
const ComponentLoader = () => {
    return (
        <div className={styles.loading}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

export default ComponentLoader;