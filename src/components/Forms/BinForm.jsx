import React, { useEffect, useState } from 'react'

// components
import { IconButton, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

// styles
import styles from './BinForm.module.css'

const BinForm = ({onAdd, isDisabled, maxDepth=100.00, maxWidth=100.00, maxHeight=100.00, totalQty, maxQty, mode=""}) => {
    

    const [formFields, setFormFields] = useState({
        depth: '',
        width: '',
        height: '',
        qty: 1,
        enabled: true
    })

    const [isInvalid, setIsInvalid] = useState(false)

    const [total, setTotal] = useState(totalQty)



    const handleChange = (e)=>{
        let {value, name} = e.target

        setFormFields((prevValue) => ({ ...prevValue, [name]: value }));
    }

    const handleSubmit = ()=>{

        if (formFields.depth<=maxDepth && formFields.width<=maxWidth && formFields.height<=maxHeight){
            if (formFields.depth>0 && formFields.width>0 && formFields.height>0 && formFields.qty>0 && total+formFields.qty<=maxQty){
                
                const submissionArray = []
                for (let n=0; n<formFields.qty; n++){
                    
                    let newFormFields = {depth: formFields.depth, width: formFields.width, height: formFields.height, enabled: true}
                    
                    submissionArray.push(newFormFields)
                }
           
                onAdd(submissionArray)
                
                setFormFields({
                    depth: '',
                    width: '',
                    height: '',
                    qty: 1,
                    enabled: true
                })
            }
        }
    }

    useEffect(()=>{
        if (formFields.depth===0 || formFields.width===0 || formFields.height===0 || formFields.qty===0){
            setIsInvalid(true)
        } else{
            setIsInvalid(false)
        }


        if (formFields.depth>maxDepth || formFields.width>maxWidth || formFields.height>maxHeight || formFields.qty+total>maxQty){
            setIsInvalid(true)
        } else{
            setIsInvalid(false)
        }

        if (formFields.depth===""|| formFields.width==="" || formFields.height==="" || formFields.qty==="" || formFields.qty==="0"){
            setIsInvalid(true)
        } else{
            setIsInvalid(false)
        }
    },[formFields])

    useEffect(()=>{
        setTotal(totalQty)
    },[totalQty])


  return (
    <div className={styles.binform}>
        <div className={styles.formcontainer}>
                <div className={styles.formbody}>
                    <div className={styles.formsection}>
                        <Stack direction={"row"} alignItems={"center"}  justifyContent={'space-evenly'} spacing={{ xs: 1, sm: 2, md: 4} }>
                            
                            <Stack direction={"row"} alignItems={"center"} gap={1}>
                                <div>
                                    W:
                                </div>
                                <input 
                                    className={styles.shorty}
                                    type='number'
                                    required
                                    step="0.01"
                                    min="0"
                                    name='width'
                                    value={formFields.width}
                                    onChange={handleChange}
                                    disabled={isDisabled}
                                    autoComplete="off"
                                />
                            </Stack>
                            <Stack direction={"row"} alignItems={"center"} gap={1}>
                                <div>
                                    D:
                                </div>
                                <input 
                                    className={styles.shorty}
                                    type='number'
                                    required
                                    step="0.01"
                                    min="0"
                                    name="depth"
                                    value={formFields.depth}
                                    onChange={handleChange}
                                    disabled={isDisabled}
                                    autoComplete="off"
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
                                    min="0"
                                    name="height"
                                    value={formFields.height}
                                    onChange={handleChange}
                                    disabled={isDisabled}
                                    autoComplete="off"
                                />
                            </Stack>
                            {mode!=='inf' && <Stack direction={"row"} alignItems={"center"} gap={1}>
                                
                                <div>
                                    QTY:
                                </div>
                                <input 
                                    className={styles.shorty}
                                    type='number'
                                    required
                                    step="1"
                                    min="0"
                                    name="qty"
                                    value={formFields.qty}
                                    onChange={handleChange}
                                    disabled={isDisabled}
                                    autoComplete="off"
                                />
                            </Stack>}
                            <Stack direction={"row"} alignItems={"center"} gap={1}>
                                
                                <IconButton disabled={isDisabled||isInvalid} sx={{"&:hover": {backgroundColor: "#FF8C42"}}} onClick={handleSubmit}>
                                    <AddIcon sx={{color: (isDisabled||isInvalid)?"#222":"#fff"}}/>
                                </IconButton>
                            </Stack>
                        </Stack>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default BinForm