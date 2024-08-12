import './charList.scss';
import PropTypes from 'prop-types';

import { Component } from 'react';
import MarvelServise from '../../api_services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';

class CharList extends Component {
  state = {
    characters: [],
    loading: true,
    error: false,
    offSet: 210,
    newCharsLoading: false,
  }
  marvelService = new MarvelServise();

  componentDidMount() {
    this.onRequest();
  }
  onRequest = (offset) => {
    this.setState({ newCharsLoading: true });
    this.marvelService.get_9_Characters(offset)
      .then(this.onCharsLoaded)
      .catch(this.onError)
  }
  onCharsLoaded = (newChars) => {
    this.setState({ loading: true })
    this.setState(({ characters, offSet }) => ({
      characters: [...characters, ...newChars],
      loading: false,
      newCharsLoading: false,
      offSet: offSet + 9,
    }))
  }
  onError = (e) => {
    this.setState({ loading: false, error: true })
  }

  renderCharacterCards = (characters) => {
    const cards = characters.map((item) => {
      const { name, thumbnail, id } = item;

      let inline = { objectFit: 'cover' };
      if (thumbnail.slice(-23) === 'image_not_available.jpg') {
        inline = { objectFit: 'contain' };
      }
      return (
        <li className="char__item" key={id} onClick={() => this.props.onCharClicked(id)}>
          <img src={thumbnail} alt={name} style={inline} />
          <div className="char__name">{name}</div>
        </li>
      )
    })
    return ( // This Block Exist For Spinner Centering On Page
      <ul className="char__grid">
        {cards}
      </ul>
    )
  }

  render() {
    const { characters, loading, error, offSet, newCharsLoading } = this.state;
    let characterCards = characters ? this.renderCharacterCards(characters) : null;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? characterCards : null;

    return (
      <div className="char__list">

        {errorMessage}
        {spinner}
        {content}

        <button onClick={() => this.onRequest(offSet)}
          className="button button__main button__long"
          disabled={newCharsLoading}>
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}
CharList.propTypes = {
  onCharClicked: PropTypes.func.isRequired,
}

export default CharList;