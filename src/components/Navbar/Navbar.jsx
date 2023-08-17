import React, { useState } from 'react'

//styles
import styles from './Navbar.module.css'

// components
import { IconButton, Stack } from '@mui/material'
import WidgetsIcon from '@mui/icons-material/Widgets';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Modal from '../Modal/Modal';
import About from '../../pages/About/About';

const Navbar = ({currentPage, onPageChange}) => {

    const [isOpenAdd, setIsOpenAdd] = useState(false)


    const handleClick=(pageName)=>{
        onPageChange(pageName)
    }
   
  return (

    <div className={styles.navbar}>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <div className={styles.navbarlogo} onClick={()=>handleClick("Home")}>
                <Stack direction={"row"} alignItems={"center"} gap={0.2}>
                        <WidgetsIcon sx={{color: "#ff4257"}} />
                        <div>
                            <h1>BoxPack</h1>
                        </div>
                </Stack>
            </div>
            {<div className={styles.navbutton}>
                <IconButton onClick={() => setIsOpenAdd(true)}>
                    <HelpOutlineIcon sx={{color: '#fff', "&:hover":  {
                           color: "#ff4257"
                        }}}/>
                </IconButton>
            </div>}
    
            <Modal open={isOpenAdd} onClose={() => setIsOpenAdd(false)} modalTitle="About">
                        <About/>
                        {/* <AddCardModal uid={user.uid} onClose={() => setIsOpenAdd(false)} handleAdd={handleAdd}/> */}
            </Modal>
        </Stack>
       
    </div>
  )
}

export default Navbar