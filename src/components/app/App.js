import AppHeader from "../appHeader/AppHeader";
// import CharactersPage from "../pages/CharactersPage";
// import ComicsPage from "../pages/ComicsPage";
import { CharactersPage, ComicsPage, Page404, SingleComicsPage } from '../pages';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = (props) => {


  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>

          <Routes>

            <Route path="/" element={<CharactersPage />} />

            <Route path="/comics" element={<ComicsPage />} />

            <Route path="/comics/:comicId" element={<SingleComicsPage />} />

            <Route path="*" element={<Page404 />} />


          </Routes>

        </main>
      </div>
    </Router >
  )
}
export default App;