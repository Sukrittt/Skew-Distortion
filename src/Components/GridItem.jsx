import React from 'react'
import "./GridItemStyle.scss"

export default function GridItem({url,description}) {
  return (
    <div className='grid-item'>
        <img className="grid-item-media" src={url} alt={description} />
        <p>{description}</p>
    </div>
  )
}
