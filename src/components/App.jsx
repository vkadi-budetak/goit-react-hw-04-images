import React, { useState, useEffect } from 'react';

import { fetchPictures } from 'services/app';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    data: null,
  });

  const onOpenModal = modalData => {
    setModal({
      isOpen: true,
      data: modalData,
    });
  };

  const onCloseModal = () => {
    setModal({
      isOpen: false,
      data: null,
    });
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    const { search } = event.target.elements;

    setSearchText(search.value);
  };

  const loadPictures = async (searchText = '', page = 1, append = false) => {
    if (!isLoading) {
      try {
        setIsLoading(true);
        const { hits } = await fetchPictures(searchText, page);
        setPictures(append ? [...pictures, ...hits] : hits);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    setPictures([]);
    setPage(1);
    loadPictures(searchText);
  }, [searchText]);

  useEffect(() => {
    loadPictures(searchText, page, true);
  }, [page]);

  return (
    <div className="App">
      <Searchbar handleSubmitForm={handleSubmitForm} />
      <ImageGallery pictures={pictures} onOpenModal={onOpenModal} />
      {isLoading && <Loader />}
      {pictures.length ? (
        <Button title={'Load more'} onClick={handleLoadMore} />
      ) : (
        false
      )}

      {modal.isOpen && <Modal onCloseModal={onCloseModal} data={modal.data} />}
    </div>
  );
};

export default App

