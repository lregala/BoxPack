import React from 'react'

// styles
import styles from './Result.module.css'

// components
import Box from './Box'

const Result = ({resultData}) => {
  return (
    <div className={styles.result}>
        <div className={styles.resultHeader}><h3>Result</h3></div>
        {resultData.length!==0 ? <div className={styles.resultBody}>
            
            {resultData.map((container, index)=>{
                return (
                        <div index={index}>
                            <Box container={container} index={index}/>
                        </div>
                    )
                })
            }
            
        </div>:
        <div style={{marginTop: '2%', color: '#ff4257'}}>Error: Unable to pack with the provided dimensions!</div>}
    </div>
  )
}

export default Result