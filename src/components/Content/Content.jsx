import React from 'react'

//styles
import styles from './Content.module.css'

const Content = ({children}) => {
  return (
    <div className={styles.content}>{children}</div>
  )
}

export default Content