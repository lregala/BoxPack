import React from 'react'

// styles
import styles from './Rack.module.css'

const Rack = ({title, children}) => {
  return (
    <div className={styles.rack}>
        <div>
            <h3>{title}</h3>
        </div>
        <div className={styles.rackbody}>
            {children}
        </div> 
    </div>
  )
}

export default Rack