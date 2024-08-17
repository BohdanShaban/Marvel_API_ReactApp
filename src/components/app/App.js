import AppHeader from "../appHeader/AppHeader";
import CharactersPage from "../pages/CharactersPage";
import ComicsPage from "../pages/ComicsPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";  

const App = (props) => {


  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>

          <Switch>

            <Route exact path="/comics">
              <ComicsPage />
            </Route>

            <Route exact path="/">
              <CharactersPage />
            </Route>

          </Switch>

        </main>
      </div>
    </Router>
  )
}
export default App;