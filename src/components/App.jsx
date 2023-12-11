import React, { useCallback, useEffect, useState } from "react"
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { fetchImagesByQuery } from "services/api";
import { Report } from "notiflix";

export const App = () => {
	const [images, setImages] = useState([])
	const [q, setQ] = useState('')
	const [page, setPage] = useState(1)
	const [totalHits, setTotalHits] = useState(null)
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [currentImage, setCurrentImage] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const getImages = useCallback (async () => {
			if (q) {
				try {
					setLoading(true)
					setError(null)
					const { hits, totalHits } = await fetchImagesByQuery({ page, q })
					setImages(prevState => [...prevState, ...hits])
					setTotalHits(totalHits)
				} catch (error) {
					setError(error.message)
					Report.failure(error.message)
				} finally {
					setLoading(false)
				}
			}
	}, [page, q])
	
	useEffect(() => {
		getImages()
	}, [getImages, page, q])

	const handleLoadMore = () => {
	  setPage(prevState => prevState + 1 )
	}

	const handleSubmit = e => {
		e.preventDefault()

		setQ(e.target.elements.search.value)
		setImages([])
		setPage(1)
		
		e.target.reset()
	}

	const handleToggleModal = () => {
		setIsOpenModal(!isOpenModal)
	}
	
	const handleOpenModal = ( image ) => {
		setCurrentImage(image)
		handleToggleModal()
	}


	return (
		<div className="App">
			<Searchbar onSubmit={handleSubmit} />

			<ImageGallery openModal={handleOpenModal} images={images}
			/>
			
			{!error && q && !loading && !images.length && <h1>Your query is not available</h1>}
			
			{error && <h1>Server is dead, try again later</h1>}
				
			{loading && !images.length && (
				<Loader />
			)}
			
			{images.length && images.length < totalHits ? (
				<Button handleLoadMore={handleLoadMore} loading={loading} />
			) : null}
			
			{isOpenModal && <Modal image={currentImage} closeModal={handleToggleModal} />}
			
		</div>
	)
}