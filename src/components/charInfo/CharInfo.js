import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './charInfo.scss';
import MarvelServise from '../../api_services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {

  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const marvelService = new MarvelServise();

  useEffect(() => {
    updateCharacter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.charId])

  const onError = (e) => {
    // this.setState({ loading: false, error: true })
    setLoading(false);
    setError(true);
  }
  const onCharLoaded = (char) => {
    // this.setState({ char, loading: false })
    setChar(char);
    setLoading(false);
  }
  const onCharLoading = () => {
    // this.setState({ loading: true })
    setLoading(true);
  }
  const updateCharacter = () => {
    const { charId } = props;
    if (!charId) return;

    onCharLoading();

    marvelService.getCharacter(charId)
      .then(onCharLoaded)
      .catch(onError);
    console.log("updateCharacter() in CharInfo Comp Was Called...");
  }


  // const { char, loading, error } = this.state;

  const skelleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <ViewCharInfo char={char} /> : null;

  return (
    <div className="char__info" >

      {skelleton}
      {errorMessage}
      {spinner}
      {content}

    </div>
  )
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
CharInfo.propTypes = {
  charId: PropTypes.number,
}

export default CharInfo;