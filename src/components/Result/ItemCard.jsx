import React from 'react'

//styles
import styles from './ItemCard.module.css'

const ItemCard = ({cardData}) => {
  const contentString = `${cardData.width} x ${cardData.depth} x ${cardData.height}`
  return (
    <div className={styles.itemcard}>
        
        <div>
              {contentString}
        </div>
    </div>
  )
}

export default ItemCard