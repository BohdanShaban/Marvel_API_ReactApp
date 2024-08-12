import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

import { Component } from 'react';


class App extends Component {
  state = {
    clickedCharId: null
  }

  onCharClicked = (id) => {
    this.setState({ clickedCharId: id });
  }


  render() {
    const { clickedCharId } = this.state;
    return (
      <div className="app">
        <AppHeader />
        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              <CharList onCharClicked={this.onCharClicked} />
            </ErrorBoundary>

            <ErrorBoundary>
              <CharInfo charId={clickedCharId} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    )
  }
}
export default App;