import React, { useState } from 'react'
import { LiaStarSolid } from "react-icons/lia";

function StarUtil({size=20, count=5, className="", clickable=true}) {
    let starArr=[];
    for (let i=0; i<count; i++){
        starArr[i]+=i
    }
    
    
  return (
    <div className={`flex ${className}`} >
 {starArr.length && starArr?.map((star, index)=>(
    <LiaStarSolid key={index} className='text-yellow-500' size={size} />
 ))}
    </div>
  )
}

export default StarUtil