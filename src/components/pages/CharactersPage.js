import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';

import { useState } from 'react';

const CharactersPage = (props) => {
  const [CharId, setChar] = useState(null);

  const onCharClicked = (id) => {
    setChar(id);
  }

  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharClicked={onCharClicked} />
        </ErrorBoundary>

        <ErrorBoundary>
          <CharInfo charId={CharId} />
        </ErrorBoundary>
      </div>

      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  )
}
export default CharactersPage;
