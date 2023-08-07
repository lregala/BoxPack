import React from 'react'

// styles
import styles from './Level.module.css'

// components
import { Stack } from '@mui/material'
import ItemCard from './ItemCard'

const Level = ({content}) => {
  return (
    <div className={styles.level}>
        {
            <Stack direction={"row"} gap={1}>
                {
                    content.map((item, index)=>{
                    return (
                            <div index={index}>
                                <ItemCard cardData={item}/>
                            </div>
                        )
                    })
                }

            </Stack>
           
        }
    </div>
  )
}

export default Level