import './charList.scss';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useState, useEffect, useRef } from 'react';
import useMarvelServise from '../../api_services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';

const CharList = (props) => {

  const [characters, setCharacters] = useState([]);
  const [offSet, setOffSet] = useState(210);
  const [newCharsLoading, setNewCharsLoading] = useState(false);

  const { loading, error, get_9_Characters } = useMarvelServise();

  useEffect(() => {
    onRequest(offSet, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // CompDidMount

  const onRequest = (offset, initial) => {
    initial ? setNewCharsLoading(false) : setNewCharsLoading(true);
    get_9_Characters(offset)
      .then(onCharsLoaded)
    console.log("get_9_Characters() in CharList Comp Was Called...");
  }
  const onCharsLoaded = (newChars) => {
    setCharacters(oldChars => [...oldChars, ...newChars]);
    setNewCharsLoading(false);
    setOffSet(offSet => offSet + 9);
  }

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    // Я реализовал вариант чуть сложнее, и с классом и с фокусом
    // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
    itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  }

  const renderCharacterCards = (characters) => {
    const cards = characters.map((item, i) => {
      const { name, thumbnail, id } = item;

      let inline = { objectFit: 'cover' };
      if (thumbnail.slice(-23) === 'image_not_available.jpg') {
        inline = { objectFit: 'contain' };
      }
      return (
        <CSSTransition key={item.id} timeout={500} classNames="char__item">
          <li className="char__item"
            onClick={() => { props.onCharClicked(id); focusOnItem(i); }}
            onKeyUp={(e) => {
              if (e.key === ' ' || e.key === "Enter") {
                props.onCharClicked(id);
                focusOnItem(i);
              }
            }}
            tabIndex={0}
            ref={el => itemRefs.current[i] = el}>
            <img src={thumbnail} alt={name} style={inline} />
            <div className="char__name">{name}</div>
          </li>
        </CSSTransition>

      )
    })
    return ( // This Block Exist For Spinner Centering On Page
      <ul className="char__grid">
        <TransitionGroup component={null}>
          {cards}
        </TransitionGroup>
      </ul>
    )
  }


  const characterCards = renderCharacterCards(characters);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newCharsLoading ? <Spinner /> : null;

  return (
    <div className="char__list">

      {errorMessage}
      {spinner}
      {characterCards}

      <button
        onClick={() => onRequest(offSet)}
        className="button button__main button__long"
        disabled={newCharsLoading}>
        <div className="inner">load more</div>
      </button>
    </div>
  )
}
CharList.propTypes = {
  onCharClicked: PropTypes.func.isRequired,
}

export default CharList;