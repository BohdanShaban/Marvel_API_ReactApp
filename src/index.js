import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import "./style/style.scss";
import MarvelServise from "./api_services/MarvelService";

const marvelServise = new MarvelServise();

marvelServise.getAllCharacters().then(res => console.log(res));


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);