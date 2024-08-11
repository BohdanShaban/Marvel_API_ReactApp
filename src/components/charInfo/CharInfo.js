import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';

import { Component } from 'react';
import MarvelServise from '../../api_services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {

  state = {
    char: null,
    loading: false,
    error: false
  }
  marvelService = new MarvelServise();

  componentDidMount() {
    this.updateCharacter();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.charId !== prevProps.charId) {
      this.updateCharacter();
    }
  }

  onError = (e) => {
    this.setState({ loading: false, error: true })
  }
  onCharLoaded = (char) => {
    this.setState({ char, loading: false })
  }
  onCharLoading = () => {
    this.setState({ loading: true })
  }
  updateCharacter = () => {
    const { charId } = this.props;
    if (!charId) return;

    this.onCharLoading();

    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
    console.log("updateCharacter() in CharInfo Comp Was Called...");
  }

  render() {
    const { char, loading, error } = this.state;

    const skelleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <ViewCharInfo char={char} /> : null;

    return (
      <div className="char__info">

        {skelleton}
        {errorMessage}
        {spinner}
        {content}

      </div>
    )
  }
}

const ViewCharInfo = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comicses } = char;

  let inline = { objectFit: 'cover' };
  if (thumbnail.slice(-23) === 'image_not_available.jpg') {
    inline = { objectFit: 'contain' };
  }

  const renderComicses = () => {
    if (comicses.length === 0) {
      return (
        <div> There Are No Comics For Selected Character... </div>
      )
    }
    return comicses.map((item, id) => {
      return (
        <li className="char__comics-item" key={id}>
          {item.name}
        </li>
      )
    })
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} style={inline} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">  {description}  </div>

      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">

        {renderComicses()}

      </ul>
    </>
  )
}

export default CharInfo;