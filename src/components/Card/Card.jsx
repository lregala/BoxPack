import React from 'react'

//components
import { IconButton, Stack } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

//styles
import styles from './Card.module.css'

const Card = ({cardData, title, index, onDelete}) => {

    const handleDelete = (idx)=>{
        onDelete(idx)
    }

  return (
    <div className={styles.card}>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={'center'}>
            <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
                <div>
                    <h4>{`${title} #${index+1}`}</h4>
                </div>
                <div>
                    {cardData.width} x {cardData.depth} x {cardData.height}
                </div>
            </Stack>
            {onDelete && <IconButton sx={{"&:hover": {backgroundColor: "#FF8C42"}}} onClick={()=>handleDelete(index)}>
                <CloseIcon sx={{color: "#fff"}}/>
            </IconButton>}
        </Stack>
       
        
    </div>
  )
}

export default Card