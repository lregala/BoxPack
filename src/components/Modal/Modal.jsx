import React from 'react'
import ReactDom from 'react-dom'


//components
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack } from '@mui/material';

//styles
import buttonStyles from '../buttonStyles';
import styles from './Modal.module.css'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '5px',
  zIndex: 9999,
  borderRadius: "10px"
}

const MODAL_DARK_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#464646',
  padding: '5px',
  zIndex: 9999,
  borderRadius: "10px",
  color: "#ccc"
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .65)',
  zIndex: 9999
}

export default function Modal({ open, children, onClose, modalTitle }) {
  const mode = 'dark'

  if (!open) return null

  return ReactDom.createPortal(
    <>
        <div style={OVERLAY_STYLES} onClick={onClose}/>
        <div style={MODAL_DARK_STYLES}>
            <div className={styles["modal"]}>
                <div className={styles["modal-header"]}>
                  <Stack direction="row" alignItems="center" justifyContent={'space-between'}>
                      <h3>{modalTitle}</h3>
                      <IconButton sx={buttonStyles.dark} onClick={onClose}>
                          <CloseIcon sx={{color: mode === 'dark' ? '#fff' : '#333'}}/>
                      </IconButton>
                  </Stack>   
                </div>
                <div className="modal-body">
                    {children}
                </div>

            </div>
          
        </div>
    </>,
    document.getElementById('portal')
  )
}