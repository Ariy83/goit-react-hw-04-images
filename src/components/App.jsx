import React from "react"
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { fetchImagesByQuery } from "services/api";
import { Report } from "notiflix";

export class App extends React.Component {
	state = {
		images: [],
		q: '',
		page: 1,
		per_page: 12,
		totalHits: null,
		isOpenModal: false,
		currentImage: null,
		loading: false,
		error: null,
	}

	myRef = React.createRef();

	getSnapshotBeforeUpdate(_, prevState) {
		if (prevState.images.length !== this.state.images.length) {
			const scrollPosition = this.myRef.current.offsetTop;
			return { scrollPosition };
		}
		return null;
	}

	async componentDidMount() {
		try {
			this.setState({ loading: true, error: null })
			// const { hits, totalHits } = await fetchImagesByQuery()
			// this.setState({ images: hits, totalHits })
		} catch (error) {
			this.setState({ error: error.message })
			Report.failure( error )
		} finally {
			this.setState({ loading: false })
		}
	}
  
	async componentDidUpdate(_, prevState, snapshot) {
		if (snapshot && prevState.images.length) {
			const scrollPosition = this.myRef.current.offsetTop;
			window.scrollTo({
				top: scrollPosition - 1200,
				behavior: "smooth",
			})
		}
		if (
			(this.state.q && prevState.q !== this.state.q) ||
			(this.state.q && prevState.page !== this.state.page)
		) {
			try {
				this.setState({ loading: true, error: null })

				const { hits, totalHits  } = await fetchImagesByQuery({ page: this.state.page, q: this.state.q })

				this.setState(prevState => ({ images: [...prevState.images, ...hits], totalHits }))
			} catch (error) {
				Report.failure( error )
			} finally {
				this.setState({ loading: false })
			}
		}
	}

	handleLoadMore = () => {
	  this.setState(prevState => ({ page: prevState.page + 1 }))
	}

	handleSubmit = e => {
		e.preventDefault()
		this.setState({ q: e.target.elements.search.value, images: [], page: 1 })
		e.target.reset()
	}

	handleOpenModal = ( image ) => {
		this.setState({currentImage: image})
		this.setState(prevState => ({ isOpenModal: !prevState.isOpenModal }))
	}

	handleToggleModal = () => {
		this.setState(prevState => ({ isOpenModal: !prevState.isOpenModal }))
	}
	
	
	render() {
		const { images, currentImage, totalHits, isOpenModal, q,loading, error } = this.state
		
		return (
			<div className="App">
				<Searchbar onSubmit={this.handleSubmit} />
				
				<ImageGallery openModal={this.handleOpenModal} images={images}
				/>

				{!error && q && !loading && !images.length && <h1>Your query is not available</h1>}


				{error && <h1>Server is dead, try again later</h1>}
				
				{loading && !images.length && (
					<Loader />
				)}
				
				{images.length && images.length < totalHits ? (
					<Button handleLoadMore={this.handleLoadMore} loading={loading} />
				) : null}
				
				{isOpenModal && <Modal image={currentImage} closeModal={this.handleToggleModal} />}

				<div style={{ visibility: "hidden" }} ref={this.myRef}></div>
      
    </div>
  )}
};