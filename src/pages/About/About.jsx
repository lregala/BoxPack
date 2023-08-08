import React from 'react'

// styles
import styles from './About.module.css'

// components
import { Stack } from '@mui/material'
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import DeleteIcon from '@mui/icons-material/Delete';

const About = () => {
  return (
    <div className={styles.about}>
      <div>
          <div style={{ textDecoration: 'underline'}}>
            <h3>
              Usage:
            </h3>
          </div>
          <div className={styles.aboutBody}>
            <Stack direction={"column"}>
              <div>1) Enter available container dimensions.</div>
              <div>2) Enter dimensions of boxes to be packed.</div>
              <div>3) Once containers and boxes are defined, the user can run the script.</div>
              <div><Stack direction={"row"} gap={0.5}><div>4) Clear fields using </div><DeleteIcon/></Stack></div>
              <div><br/></div>
              <div>
                <Stack direction={"row"} gap={0.5} justifyContent={"flex-start"}>
                  <div>
                    Alternatively, the user can use sample data by clicking  
                  </div>
                  <div>
                    <AutoAwesomeMotionIcon/>
                  </div>
                  
                </Stack>
              </div>
            </Stack>
          </div>
      </div>

      <div>
          <div style={{ textDecoration: 'underline'}}>
            <h3>
            Technical Details:
            </h3>
          </div>
          <div className={styles.aboutBody}>
            <p>BoxPack uses the Largest-Area-Fit-First (LAFF) 3D Bin Packing Algorithm. 
            <br/>To learn more about the algorithm, please refer to this <a rel="noreferrer" target="_blank" href='https://www.parkbeachsystems.com/images/usps/An_Efficient_Algorithm_for_3D_Rectangular_Box_Packing.pdf'>paper.</a></p>
          </div>
      </div>

    </div>
  )
}

export default About