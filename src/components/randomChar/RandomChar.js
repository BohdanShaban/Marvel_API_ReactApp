import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useState, useEffect } from 'react';
import useMarvelServise from '../../api_services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';

const RandomChar = (props) => {

	const [char, setChar] = useState(null);
	const { loading, error, clearError, getCharacter } = useMarvelServise();

	// componentDidMount() {
	// 	this.updateCharacter();
	// 	// const intervalId = setInterval(this.updateCharacter, 10000);
	// }
	// componentWillUnmount() {
	// 	// clearInterval(this.timerId);
	// }
	useEffect(() => {
		updateCharacter();
		// const timerId = setInterval(updateCharacter, 30000);

		// return () => {
		// 	clearInterval(timerId)
		// }

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onCharLoaded = (char) => {
		setChar(char)
	}
	const updateCharacter = () => {
		clearError();
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		getCharacter(id)
			.then(onCharLoaded)
		console.log("getCharacter() in RandomChar Comp Was Called...");
	}


	const errorMessage = error ? <ErrorMessage /> : null;
	const spinnerComp = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <ViewChar char={char} /> : null;

	return (
		<div className="randomchar">
			{errorMessage}
			{spinnerComp}
			{content}

			<div className="randomchar__static">
				<p className="randomchar__title">
					Random character for today!<br />
					Do you want to get to know him better?
				</p>
				<p className="randomchar__title">
					Or choose another one
				</p>
				<button onClick={updateCharacter} className="button button__main">
					<div className="inner">try it</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
			</div>
		</div>
	)
}

const ViewChar = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki } = char;

	let inline = { objectFit: 'cover' };
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		inline = { objectFit: 'contain' };
	}
	return (
		<div className="randomchar__block">
			<img src={thumbnail} style={inline} alt="Random character" className="randomchar__img" />
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">
					{description}
				</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">HomePage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}
export default RandomChar;