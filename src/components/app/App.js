import AppHeader from "../appHeader/AppHeader";
import CharactersPage from "../pages/CharactersPage";
import ComicsPage from "../pages/ComicsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = (props) => {


  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>

          <Routes>

            <Route path="/comics" element={<ComicsPage />} />

            <Route path="/" element={<CharactersPage />} />

          </Routes>

        </main>
      </div>
    </Router >
  )
}
export default App;