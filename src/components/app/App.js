import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

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
          <RandomChar />
          <div className="char__content">
            <CharList onCharClicked={this.onCharClicked} />
            <CharInfo charId={clickedCharId} />
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    )
  }
}
export default App;