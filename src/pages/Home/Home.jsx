import React, { useEffect, useState } from 'react'

// components
import { Grid, IconButton, Stack } from '@mui/material'
import LooksOneSharpIcon from '@mui/icons-material/LooksOneSharp';
import LooksTwoSharpIcon from '@mui/icons-material/LooksTwoSharp';
import BinForm from '../../components/Forms/BinForm';
import DeleteIcon from '@mui/icons-material/Delete';
import Rack from '../../components/Rack/Rack';
import Card from '../../components/Card/Card';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import binpack3D from '../../Algorithm/BinPack';
import Result from '../../components/Result/Result';

// styles
import styles from './Home.module.css'

const sampleBins = [
    {width: 12, depth: 12, height: 6},
]

const sampleItems = [
    {width: 8, depth: 6, height: 3},
    {width: 4, depth: 12, height: 3},
    {width: 4, depth: 11, height: 3},
    {width: 8, depth: 6, height: 3},
    {width: 4, depth: 12, height: 3},
    {width: 4, depth: 11, height: 3},
    {width: 8, depth: 6, height: 3},
    {width: 8, depth: 6, height: 3},

]

const Home = () => {

    const maxBins = 5
    const maxItems = 50

    const [bins, setBins] = useState([])
    const [items, setItems] = useState([])

    const [binsDisabled, setBinsDisabled] = useState(false)
    const [itemsDisabled, setItemsDisabled] = useState(false)

    const [pending, setPending] = useState(false)
    const [buttonStatus, setButtonStatus] = useState(false)

    const [packing, setPacking] = useState(null)

    const checkDuplicates = (inputData, boxArray)=>{
        let stringToCheck = `${inputData.depth}x${inputData.width}x${inputData.height}`
        
        let textArray = []
        let concatDims=""

        boxArray.forEach((box)=>{
            concatDims = `${box.depth}x${box.width}x${box.height}`
            textArray.push(concatDims)
        })

        return textArray.includes(stringToCheck)
    }

    const fillSampleBins = ()=>{
        setBins([...sampleBins])
    }

    const fillSampleItems= ()=>{
        setItems([...sampleItems])
    }


    const addBin = (binData)=>{
        let newBins = [...bins]
        let binsLength = newBins.length

        if (binsLength<maxBins && !checkDuplicates(binData, newBins)){
            newBins.push(binData)
            setBins(newBins)
        }
    }



    const addItem = (itemData)=>{
        let newItems = [...items]
        let itemsLength = newItems.length

        if (itemsLength<maxItems){
            newItems.push(itemData)
            setItems(newItems)
        }
    }

    const handleClearBins = ()=>{
        setBins([])
    }

    const handleClearItems = ()=>{
        setItems([])
    }

    const handleRun = async ()=>{
        function calculateWastedSpace(data) {
            const getVolume = (item) => item.width * item.depth * item.height;
            
            const wastedSpaceResults = data.map(item => {
              const containerVolume = item.containerDims.width * item.containerDims.depth * item.containerDims.height;
              let totalContentsVolume = 0;
          
              item.contents.forEach(subArray => {
                subArray.forEach(content => {
                  totalContentsVolume += getVolume(content);
                });
              });
          
              const wastedSpace = (1 - (totalContentsVolume / containerVolume))*100;
              return {
                ...item,
                wastedSpace: wastedSpace >= 0 ? wastedSpace : 0 // Ensure wastedSpace is not negative
              };
            });
          
            return wastedSpaceResults;
        }
        


        if (bins.length>0 && items.length>0){
            let result = await binpack3D([...bins],[...items])
            result = result.filter(item => item.contents.length > 0)
            result = calculateWastedSpace(result)

            console.log("End Result: ", result)


            setPacking(result)
        }
        
    }


    const handleDeleteBin = (i)=>{
        let newBins = [...bins]
        newBins = newBins.filter((_,index)=>index!==i)
        setBins(newBins)
    }

    const handleDeleteItem = (i)=>{
        let newItems = [...items]
        newItems = newItems.filter((_,index)=>index!==i)
        setItems(newItems)
    }

    useEffect(()=>{
        if (bins.length===maxBins){
            setBinsDisabled(true)
        } else {
            setBinsDisabled(false)
        }
    },[bins])

    useEffect(()=>{
        if (items.length===maxItems){
            setItemsDisabled(true)
        } else {
            setItemsDisabled(false)
        }
    },[items])


    useEffect(()=>{
        if (bins.length>0 && items.length>0){
            setButtonStatus(true)
        } else {
            setButtonStatus(false)
            
        }
    },[bins,items])


    useEffect(()=>{
        setPacking(null)
    },[bins,items])

  return (
    <div className={styles.home}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                
                    <div className='section-header'>
                        <Stack direction={"row"} gap={1} alignItems={"center"} justifyContent={"space-between"}>

                            <Stack direction={"row"} gap={1} alignItems={"center"}>
                                <LooksOneSharpIcon sx={{color: '#ff4257'}}/>
                                <h3>Bins</h3>
                            </Stack>

                            <Stack direction={"row"} gap={2} alignItems={"center"}>
                                <IconButton sx={{"&:hover": {backgroundColor: "#FF8C42"}}} onClick={fillSampleBins}>
                                    <AutoAwesomeMotionIcon sx={{color: "#fff"}}/>
                                </IconButton>

                                <IconButton sx={{"&:hover": {backgroundColor: "#FF8C42"}}} onClick={handleClearBins}>
                                    <DeleteIcon sx={{color: "#fff"}}/>
                                </IconButton>


                            </Stack>
                        
                            

                        </Stack>
                    </div>
                    <BinForm onAdd={addBin} isDisabled={binsDisabled}/>
                    <Rack title={`Available Bin Dimensions (${bins.length})`}>
                        {bins.map((bin, index)=>{
                            return(
                                <div key={index}>
                                    <Card cardData={bin} title="Bin Size" index={index} onDelete={handleDeleteBin}/>
                                </div>
                            )
                            
                        })}
                    </Rack>
                </Grid>

                <Grid item xs={3}>
                    <div className='section-header'>
                        <Stack direction={"row"} gap={1} alignItems={"center"}  justifyContent={"space-between"}>
                            <Stack direction={"row"} gap={1} alignItems={"center"}>
                                <LooksTwoSharpIcon sx={{color: '#ff4257'}}/>
                                <h3>Items</h3>
                            </Stack>

                            <Stack direction={"row"} gap={2} alignItems={"center"}>
                                <IconButton sx={{"&:hover": {backgroundColor: "#FF8C42"}}} onClick={fillSampleItems}>
                                    <AutoAwesomeMotionIcon sx={{color: "#fff"}}/>
                                </IconButton>
                                
                                <IconButton sx={{"&:hover": {backgroundColor: "#FF8C42"}}} onClick={handleClearItems}>
                                    <DeleteIcon sx={{color: "#fff"}}/>
                                </IconButton>
                            </Stack>
                            
                            
                        </Stack>
                    </div>
                    <BinForm onAdd={addItem} isDisabled={itemsDisabled}/>
                    <Rack title={`Items to Pack (${items.length})`}>
                        {items.map((item, index)=>{
                            return(
                                <div key={index}>
                                    <Card cardData={item} title="Item" index={index} onDelete={handleDeleteItem}/>
                                </div>
                            )
                            
                        })}
                    </Rack>
                
                </Grid>

                <Grid item xs={6}>
                        {packing && <Result resultData={packing}/>}
                </Grid>

                <Grid item xs={12}>
                    <div className={styles.controls}>
                        <Stack direction={"row"}>

                       
                                {buttonStatus && 
                                <>
                                    {
                                        pending ?
                                        <button className= {`${styles["pending"]}`} onClick={handleRun}>
                                            <h3>Calculating...</h3>
                                        </button>:
                                        <button className= {`${styles["controlbtn"]}`} onClick={handleRun}>
                                            <h3>Run</h3>
                                        </button>

                                    }
                                </>}
                        </Stack>
                    </div>

                </Grid>
            </Grid>
           


    </div>
  )
}

export default Home