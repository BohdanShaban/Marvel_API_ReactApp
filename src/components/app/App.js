import { lazy, Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../pages/404'));
const CharactersPage = lazy(() => import('../pages/CharactersPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicsPage = lazy(() => import('../pages/SingleComicsPage'));

const App = (props) => {


  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>

          <Suspense fallback={<Spinner />}>

            <Routes>

              <Route path="/" element={<CharactersPage />} />

              <Route path="/comics" element={<ComicsPage />} />

              <Route path="/comics/:comicId" element={<SingleComicsPage />} />

              <Route path="*" element={<Page404 />} />

            </Routes>

          </Suspense>

        </main>
      </div>
    </Router >
  )
}
export default App;