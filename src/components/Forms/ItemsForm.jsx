import React from 'react'

// components
import { IconButton, Stack } from '@mui/material'
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import AddIcon from '@mui/icons-material/Add';

// styles
import styles from './ItemsForm.module.css'

const ItemsForm = () => {
  return (
    <div className={styles.binform}>
        <div>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
                <LooksTwoIcon sx={{color: "#e4e4e4"}}/>
                <h3>Items</h3>
            </Stack>
        </div>
        <div className={styles.formcontainer}>
            <form>
                <div className={styles.formbody}> 
                    <div className={styles.formsection}>
                        <Stack direction={"row"} alignItems={"center"} gap={1} justifyContent={'space-evenly'}>
                            <Stack direction={"row"} alignItems={"center"} gap={1}>
                                <div>
                                    L:
                                </div>
                                <input 
                                    className={styles.shorty}
                                    type='number'
                                    required
                                    step="0.01"
                                    max="100.00"
                                    min="0"
                                />
                            </Stack>
                            <Stack direction={"row"} alignItems={"center"} gap={1}>
                                <div>
                                    W:
                                </div>
                                <input 
                                    className={styles.shorty}
                                    type='number'
                                    required
                                    step="0.01"
                                    max="100.00"
                                    min="0"
                                />
                            </Stack>
                            <Stack direction={"row"} alignItems={"center"} gap={1}>
                                
                                <div>
                                    H:
                                </div>
                                <input 
                                    className={styles.shorty}
                                    type='number'
                                    required
                                    step="0.01"
                                    max="100.00"
                                    min="0"
                                />
                            </Stack>
                            <Stack direction={"row"} alignItems={"center"} gap={1}>
                                
                                <IconButton sx={{"&:hover": {backgroundColor: "#666"}}}>
                                    <AddIcon sx={{color: "#fff"}}/>
                                </IconButton>
                            </Stack>
                    </Stack>
                    


                    </div>

                      

                    
                
                    
                </div>

               

            </form>
        </div>
    </div>
  )
}

export default ItemsForm