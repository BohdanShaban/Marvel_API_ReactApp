import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

import { Component } from 'react';
import MarvelServise from '../../api_services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';

class CharList extends Component {
  state = {
    characters: null,
    loading: true,
    error: false
  }
  marvelService = new MarvelServise();

  componentDidMount() {
    this.loadCharacters();
  }
  onError = (e) => {
    this.setState({ loading: false, error: true })
  }
  onCharactersLoaded = (characters) => {
    this.setState({ characters, loading: false })
  }
  loadCharacters = () => {
    this.setState({ loading: true })
    this.marvelService
      .get_9_Characters()
      .then(this.onCharactersLoaded)
      .catch(this.onError);
    console.log("get_9_Characters() Was Called...");
  }
  renderCharacterCards = (characters) => {
    const cards = characters.map((item) => {
      const { name, thumbnail } = item;

      let inline = { objectFit: 'cover' };
      if (thumbnail.slice(-23) === 'image_not_available.jpg') {
        inline = { objectFit: 'contain' };
      }

      return (
        <li className="char__item" key={item.id}>
          <img src={thumbnail} alt={name} style={inline} />
          <div className="char__name">{name}</div>
        </li>
      )
    })

    return (
      <ul className="char__grid">
        {cards}
      </ul>
    )
  }


  render() {
    const { characters, loading, error } = this.state;
    let characterCards = characters ? this.renderCharacterCards(characters) : null;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? characterCards : null;

    return (
      <div className="char__list">

        {errorMessage}
        {spinner}
        {content}

        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

export default CharList;