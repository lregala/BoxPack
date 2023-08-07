import React from 'react'

//styles
import styles from './ItemCard.module.css'

const ItemCard = ({cardData}) => {
  return (
    <div className={styles.itemcard}>
        
        <div>
                {cardData.width} x {cardData.depth} x {cardData.height}
        </div>
    </div>
  )
}

export default ItemCard