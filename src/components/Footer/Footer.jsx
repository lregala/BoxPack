import React, { useEffect, useState } from 'react'

//styles
import styles from './Footer.module.css'

const Footer = () => {
    const [currentYear, setCurrentYear] = useState(null)
    

    useEffect(()=>{
        let year = new Date().getFullYear()
        setCurrentYear(year)
    },[])


  return (
    <div className={styles.footer}>© {currentYear} L. Regala</div>
  )
}

export default Footer