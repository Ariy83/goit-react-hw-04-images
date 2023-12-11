import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'
import React from 'react'

export const ImageGallery = ({images=[], openModal}) => {
  return (
      <ul className="ImageGallery">
          {images.map((image,index) => (
            <ImageGalleryItem key={index}
              // {...image}
              webformatURL={image.webformatURL}
              tags={image.tags}
              openModal={() =>openModal(image)}
              >
            </ImageGalleryItem>
			))}
      </ul>
  )
}
