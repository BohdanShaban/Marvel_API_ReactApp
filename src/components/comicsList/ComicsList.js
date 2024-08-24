import './comicsList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import { Link } from "react-router-dom";

import { useState, useEffect, useRef } from 'react';
import useMarvelServise from '../../api_services/MarvelService';

const ComicsList = (props) => {

	const [comicsArr, setComicsArr] = useState([]);
	const [offSet, setOffSet] = useState(210);
	const [newComicsLoading, setNewComicsLoading] = useState(false);

	const { loading, error, get_8_Comics } = useMarvelServise();

	useEffect(() => {
		onRequest(offSet, true)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) // CompDidMount

	const onRequest = (offset, initial) => {
		initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
		get_8_Comics(offset)
			.then(onComicsLoaded)
		console.log("get_8_Comics() in ComicsList Comp Was Called...");
	}
	const onComicsLoaded = (newComics) => {
		setComicsArr(oldComics => [...oldComics, ...newComics]);
		setNewComicsLoading(false);
		setOffSet(offSet => offSet + 8);
	}

	const itemRefs = useRef([]);

	const focusOnItem = (id) => {
		// Я реализовал вариант чуть сложнее, и с классом и с фокусом
		// Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
		itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
		itemRefs.current[id].classList.add('char__item_selected');
		itemRefs.current[id].focus();
	}

	const renderComicsCards = (comics) => {
		const cards = comics.map((item, i) => {
			const { title, thumbnail, id, price } = item;

			let inline = { objectFit: 'cover' };
			if (thumbnail.slice(-23) === 'image_not_available.jpg') {
				inline = { objectFit: 'contain' };
			}

			return (
				<>
					<li className="comics__item" key={i}
						onClick={() => { focusOnItem(i); }}
						onKeyUp={(e) => {
							if (e.key === ' ' || e.key === "Enter") {
								focusOnItem(i);
							}
						}}
						tabIndex={0}
						ref={el => itemRefs.current[i] = el}>

						<Link to={`/comics/${id}`}>
							<img src={thumbnail} alt={title} style={inline} className="comics__item-img" />
							<div className="comics__item-name">{title}</div>
							<div className="comics__item-price">{price}</div>
						</Link>
					</li>
				</>
			)
		})
		return ( // This Block Exist For Spinner Centering On Page
			<ul className="comics__grid">
				{cards}
			</ul>
		)
	}




	const comicsCards = renderComicsCards(comicsArr);
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newComicsLoading ? <Spinner /> : null;

	return (
		<div className="comics__list">

			{errorMessage}
			{spinner}
			{comicsCards}

			<button
				className="button button__main button__long"
				onClick={() => onRequest(offSet)}
				disabled={newComicsLoading}>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

export default ComicsList;