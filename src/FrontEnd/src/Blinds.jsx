import React, {useEffect, useState} from 'react'
import './Blinds.css'

const Blinds = ({allBlinds, curLev}) => {



  return (
    <>
    <div className='blinds-amounts'>{allBlinds[curLev].name}</div>
    </>
  )
}

export default Blinds