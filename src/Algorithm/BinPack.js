const binpack3D = async (bins, items)=>{

    // this is the value that we'll return
    let packed = []

    // This is the value that will populate with boxes
    let unpacked = []

    // rearrange
    let rearrangedBins = []
    let rearrangedItems = []

    bins.forEach((bin)=>{
        rearrangedBins.push(rearrangeDims(bin))
    })

    items.forEach((item)=>{
        rearrangedItems.push(rearrangeDims(item))
    })


    const sortedItems = sortByLargestArea(rearrangedItems)
    const sortedBins = sortByVolume(rearrangedBins)


    // fill unpacked:
    unpacked = [...sortedItems]


    // packing algorithm
    packBins(unpacked, packed, sortedBins)
    return packed
}


function checkFit(space, box){
    if (space.width - box?.width>=0 
        && space.depth - box?.depth>=0
        && space.height - box?.height>=0)
    {
        return true
    } else {
        return false
    }
}

function countMatchingDims(space,box){
    let countMatch = 0

    if (space.width === box?.width){
        countMatch+=1
    }

    if (space.depth === box?.depth){
        countMatch+=1
    }

    if (space.height === box?.height){
        countMatch+=1
    }
    return countMatch
}

function calculateLevelHeight(container){
    let sum = 0;
    for (const level of container) {
        let maxLevelHeight = 0;
        

        for (const box of level) {
            if (box.height > maxLevelHeight) {
                maxLevelHeight = box.height;
            }
        }

        sum += maxLevelHeight;
    }

    return sum;
}

function packBins(unpacked, packed, binsArray){
    let currentBinIndex = 0
    let packStatus = false
    let unfit = false
    let flagNextBox = false
    let containersArray = []
    let maxIter = 30

    let currentIter = 0;

    console.log("unpacked: ",[...unpacked])

    packContainer(binsArray[currentBinIndex])
    console.log("unfit: ",unfit," nextbox: ", flagNextBox)
    
    // Move to next size box
    if (unfit){
        currentBinIndex+=1
        containersArray = []

        if (currentBinIndex<binsArray.length){
            packContainer(binsArray[currentBinIndex])
            
        } else {
            console.log("Cannot finish packing")
        }
        
    }

    // Add another box
    if (flagNextBox){
        // reset everything for next rounds
        
        while (!packStatus){
            currentIter+=1
            currentBinIndex = 0
            console.log(currentBinIndex,[...binsArray])
            containersArray = []
            packContainer(binsArray[currentBinIndex])

            if (unfit){
                currentBinIndex+=1
                containersArray = []
                
                if (currentBinIndex<binsArray.length){
                    packContainer(binsArray[currentBinIndex])
                } else {
                    console.log("Cannot finish packing")
                }
                
            }

            if (currentIter>maxIter){
                console.log("unable to find packing solution")
                break
            }
        }        
    }
   
    function packContainer(container){

        let levelArray = []
        let containerDims =  JSON.parse(JSON.stringify(container))

        let packedResult = {
            containerDims: binsArray[currentBinIndex],
            contents: [],
            wastedSpace: 0
        }
        
        // check if first box fits into box
        if (checkFit(containerDims,unpacked[0])){

            fillSpace(containerDims)
            containersArray.push(levelArray)
            levelArray = []

            // update container (need to calculate properly)
            let levelHeight = calculateLevelHeight(containersArray)
            
            containerDims = {...containerDims, height: binsArray[0].height - levelHeight}

            packContainer(containerDims)
        }
        else {
            // if not then switch to a bigger box size

            if (unpacked.length>0){
                console.log("Cannot fit remaining boxes in container")
              
                packedResult.contents = containersArray
                packed.push(packedResult)

                if (packedResult.contents.length===0){
                    unfit = true
                } else {
                    // pack another box
                    flagNextBox = true
                }

            } else {
                packStatus = true
                flagNextBox = false
                
                packedResult.contents = containersArray
                packed.push(packedResult)
                containersArray=[]
                console.log("Finished Packing")
            }
            
            return
        }

        // functions
        function fillSpace(space){
            const spaceVol = calcVolume(space)
            
            let orientations = null
            let fittingBoxIndex = null
            let fittingBoxVol = null
            
            for (let m = 0; m<unpacked.length; m++){
                
                if (calcVolume(unpacked[m])<=spaceVol){
                
                    // check if box fits
                    orientations = getOrientations(unpacked[m]['width'],unpacked[m]['depth'],unpacked[m]['height'])
                    
                    let fittingOrientationIndex = null
                    let matchingSides = null

                    for (let n = 0; n < orientations.length; n++){
                        let tempBox = {width: orientations[n][0], depth: orientations[n][1], height: orientations[n][2]}
                        

                        if (checkFit(space,tempBox)){
                            console.log("box ", tempBox, "fits in ", space)

                            let countMatch = countMatchingDims(space,tempBox)

                            // if (countMatch > matchingSides){
                            //     matchingSides = countMatch
                            //     fittingOrientationIndex = n
                            // }

                            fittingOrientationIndex = n
                            break
                        } 
                    }
                    
                    let tempBoxVol = calcVolume(unpacked[m])

                    // Find fitting box with biggest volume
                    if (fittingOrientationIndex !== null){
                        console.log("fittingBoxVol:",fittingBoxVol, "tempBoxVol:", tempBoxVol)
                        if (tempBoxVol > fittingBoxVol){
                           
                            console.log("larger box found")
                            fittingBoxIndex = m
                            fittingBoxVol = tempBoxVol
                            unpacked[fittingBoxIndex] = {width: orientations[fittingOrientationIndex][0], 
                                                    depth: orientations[fittingOrientationIndex][1], 
                                                    height: orientations[fittingOrientationIndex][2]}
                        }
                    }
                }
            }

            if (fittingBoxIndex !==null){
                // pack box into level
                let tempBox = unpacked[fittingBoxIndex]

                console.log("item packed: ", tempBox, "in space: ", space)
                moveElement(fittingBoxIndex,unpacked,levelArray)

                // calculate remaining spaces
                let newSpaces = []

                if (space.width - tempBox.width > 0){
                    newSpaces.push({
                        width: space.width - tempBox.width,
                        depth: space.depth,
                        height: tempBox.height
                    })
                }

                if (space.depth - tempBox.depth > 0){
                    newSpaces.push({
                        width: tempBox.width,
                        depth: space.depth - tempBox.depth,
                        height: tempBox.height
                    })
                }

                if (newSpaces.length > 0){
                    console.log("New Spaces: ", newSpaces)
                    console.log("Boxes remaining: ", [...unpacked])
                    for (let k = 0; k < newSpaces.length; k++){
                        fillSpace(newSpaces[k])
                    }
                }
            } 
        } 
    }
}


function moveElement(index, arr1,arr2){
    if(index >=0 && index < arr1.length){
        const element = arr1.splice(index,1)[0]
        arr2.push(element)
    }
}

function calcVolume(dims){
    return dims.depth * dims.width * dims.height
}

function sortByVolume(binArray){
    const binVolumes = binArray.map(bin=>{
        return bin.width * bin.depth * bin.height
    })

    binArray.sort((a,b)=>{
        const volA = binVolumes[binArray.indexOf(a)]
        const volB = binVolumes[binArray.indexOf(b)]
        return volA - volB
    })

    return binArray
}

function sortByLargestArea(bins){
    bins.sort((a,b)=>{
        const areaA = a.width * a.depth
        const areaB = b.width * b.depth

        if (areaB !== areaA){
            return areaB - areaA
        } else {
            return a.height - b.height
        }
    })

    return bins
}


function rearrangeDims(boxDim){
    // This function takes in an object, finds the longest & second longest dims
    // and assigns them to width and depth respectively.
    // The shortest dim is height.

    const {width, depth, height} = boxDim


    const sides = [width, depth, height].sort((a,b)=>b-a)
    const longest = sides[0]
    const secondLongest = sides[1]
    const shortest = sides[2]


    const rearrangedDims = {
        width: Number(longest),
        depth: Number(secondLongest),
        height: Number(shortest)
    }

    return rearrangedDims
}


function getOrientations(width, depth, height) {
    const orientations = [];
  
    // Orientation 1
    orientations.push([width, depth, height]);
  
    // Orientation 2
    orientations.push([depth, width, height]);
  
    // Orientation 3
    orientations.push([height, width, depth]);
  
    // Orientation 4
    orientations.push([height, depth, width]);
  
    // Orientation 5
    orientations.push([depth, height, width]);
  
    // Orientation 6
    orientations.push([width, height, depth]);
  
    return orientations;
}


export default binpack3D