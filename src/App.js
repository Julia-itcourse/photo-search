import React, { PureComponent } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import fetchImagesWithQuery from "../src/services";
import Loader from "react-loader-spinner";
import Button from "./components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./components/Modal";

class App extends PureComponent {
  state = {
    searchQuery: "",
    hits: [],
    error: null,
    loading: false,
    showModal: false,
    page: 1,
    bigImgUrl: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.handleFetchHits();
    }
  }

  handleFetchHits = () => {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true });

    fetchImagesWithQuery(searchQuery, page)
      .then((hits) => {
        this.setState((prevState) => ({
          hits: [...prevState.hits, ...hits],
          page: prevState.page + 1,
        }));
        const currentPage = this.state.page;

        if (this.state.hits.length === 0 && currentPage > 1) {
          this.notify();
        }
      })

      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  onFormSubmit = (query) => {
    this.setState({
      hits: [],
      searchQuery: query,
      page: 1,
    });
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  onOpenModal = () => {
    this.setState({ showModal: true });
  };

  onItemClick = (imageUrl) => {
    this.setState({ bigImgUrl: imageUrl });
    this.onOpenModal();
  };

  notify = () => toast("Oopsie! No results found. Try another search term!");

  render() {
    const { hits, loading, page, bigImgUrl } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onFormSubmit} />
        {hits.length === 0 && page > 1 && <ToastContainer />}
        <ImageGallery hits={hits} onItemClick={this.onItemClick} />
        {!loading && hits.length > 0 && (
          <Button onClick={this.handleFetchHits} />
        )}
        {loading && (
          <Loader
            type="ThreeDots"
            color="#995566"
            height={100}
            width={100}
            timeout={3000}
            style={{ marginRight: "auto", marginLeft: "auto" }}
          />
        )}
        {this.state.showModal && (
          <Modal onClose={this.onCloseModal} bigImageUrl={bigImgUrl} />
        )}
      </div>
    );
  }
}

export default App;
