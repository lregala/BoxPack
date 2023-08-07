import React from 'react'

// styles
import styles from './FormHeader.module.css'

const FormHeader = ({children}) => {
  return (
    <div className={styles.formheader}>{children}</div>
  )
}

export default FormHeader