import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react';
import MarvelServise from '../../api_services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';

class RandomChar extends Component {
	state = {
		char: {},
		loading: true,
		error: false
	}
	marvelService = new MarvelServise();

	componentDidMount() {
		this.updateCharacter();
		// const intervalId = setInterval(this.updateCharacter, 10000);
	}
	componentWillUnmount() {
		// clearInterval(this.timerId);
	}
	onError = (e) => {
		this.setState({ loading: false, error: true })
	}
	onCharLoaded = (char) => {
		this.setState({ char, loading: false })
	}
	updateCharacter = () => {
		this.setState({ loading: true })
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		this.marvelService
			.getCharacter(id)
			.then(this.onCharLoaded)
			.catch(this.onError);
		console.log("updateCharacter() in RandomChar Comp Was Called...");
	}

	render() {
		const { char, loading, error } = this.state;

		const errorMessage = error ? <ErrorMessage /> : null;
		const spinnerComp = loading ? <Spinner /> : null;
		const content = !(loading || error) ? <ViewChar char={char} /> : null;

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
					<button onClick={this.updateCharacter} className="button button__main">
						<div className="inner">try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
				</div>
			</div>
		)
	}
}

const ViewChar = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki } = char;

	let inline = { objectFit: 'cover' };
	if (thumbnail.slice(-23) === 'image_not_available.jpg') {
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