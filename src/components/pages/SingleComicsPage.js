import './singleComic.scss';
// import xMen from '../../resources/img/x-men.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import { useParams, Link } from "react-router-dom";
import useMarvelServise from '../../api_services/MarvelService';
import { useState, useEffect } from 'react';


const SingleComicsPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const { loading, error, clearError, getComic } = useMarvelServise();

  useEffect(() => {
    updateComic(comicId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comicId])

  const onComicLoaded = (comic) => {
    setComic(comic)
  }
  const updateComic = () => {
    clearError();
    getComic(comicId)
      .then(onComicLoaded)
    console.log("getComic() in SingleComicsPage Comp Was Called...");
  }

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <ViewComic comic={comic} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}


const ViewComic = ({ comic }) => {
  const { thumbnail, description, title, price, pageCount, language } = comic;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to='/comics' className="single-comic__back">Back to all comics</Link>
    </div>
  )
}

export default SingleComicsPage;