import React from 'react'

export const ImageGalleryItem = ({webformatURL, tags, openModal}) => {
  return (
    <li className="ImageGalleryItem" >
      <img className='ImageGalleryItem-image' onClick={openModal} src={webformatURL} alt={tags} />
    </li>
  )
}
