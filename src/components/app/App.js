import AppHeader from "../appHeader/AppHeader";
import CharactersPage from "../pages/CharactersPage";
import ComicsPage from "../pages/ComicsPage";


const App = (props) => {



  return (
    <div className="app">
      <AppHeader />
      <main>

        {/* <CharactersPage /> */}
        <ComicsPage />

      </main>
    </div>
  )
}
export default App;