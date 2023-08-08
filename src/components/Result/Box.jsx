import React from 'react'

// styles
import styles from './Box.module.css'

// components
import { Stack } from '@mui/material'
import Level from './Level'

const Box = ({container, index}) => {
    let contents = container.contents.reverse()
    let fillPercentage = (100-container.wastedSpace).toFixed(1)
  return (
    <div className={styles.box}>
        <div className={styles.boxHeader}>
            <Stack direction={'row'} gap={1} justifyContent={'space-between'}>
                <div>Box #{index+1} {`(Fill percentage: ${fillPercentage}%)`}</div>
                <div>{`${container.containerDims.width} x ${container.containerDims.depth} x ${container.containerDims.height}`}</div>
            </Stack>
        </div>
        
        <div style={{borderLeft: '1px solid #fff', borderRight: '1px solid #fff', borderBottom: '1px solid #fff', marginBottom: '1%', borderRadius: '0 0 5px 5px'}}>
            {   
                contents.map((levels, index)=>{
                    return (
                            <div index={index}>
                                <Level content={levels}/>
                            </div>
                        )
                })
            }
        </div>
        
    </div>
    
  )
}

export default Box