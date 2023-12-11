import React from 'react'

export class Modal extends React.Component{
  
  componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown)

		document.body.style.overflow = 'hidden'
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)

		document.body.style.overflow = 'visible'
  }
  
  handleOverlayClick = e => {
		if (e.target === e.currentTarget) {
			this.props.closeModal()
		}
	}

	handleKeyDown = e => {
		if (e.key === 'Escape') {
			this.props.closeModal()
		}
	}
  
  render() {
    const { largeImageURL, tags } = this.props.image;

    return (
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    )
  }
}