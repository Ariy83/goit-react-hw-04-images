import React, { useEffect } from 'react'

export const Modal = ({ image, closeModal }) => {
  
  useEffect(() => {
		const handleKeyDown = e => {
			if (e.key === 'Escape') {
				closeModal()
			}
		}
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden';

		return () => {
			// console.log('Close modal')
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'visible';
		}
	}, [closeModal])
  
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }
  
  const { largeImageURL, tags } = image;
  return (
      <div className="Overlay" onClick={handleOverlayClick}>
        <div className="Modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    )
}