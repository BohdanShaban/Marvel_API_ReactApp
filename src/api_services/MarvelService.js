import { useHttp } from "../hooks/http.hook";

const useMarvelServise = () => {
  const { loading, error, makeRequest, clearError } = useHttp();

  const _apiKey = '31e00cd22de311c9c0aa0e690688d87b';
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _baseCharsOffSet = 210;
  const _baseComicsOffSet = 210;

  const get_9_Characters = async (offset = _baseCharsOffSet) => {
    const res = await makeRequest(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }
  const getCharacter = async (id) => {
    const res = await makeRequest(`${_apiBase}characters/${id}?&apikey=${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }
  const _transformCharacter = (char) => {
    let description = char.description ? char.description : "There is no description...";
    description = description.length > 30 ? description.slice(0, 40) + "..." : description;

    return {
      id: char.id,
      name: char.name,
      description: description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comicses: char.comics.items.slice(0, 10), //Take Only 10 Comics
    }
  }

  const get_8_Comics = async (offset = _baseComicsOffSet) => {
    const res = await makeRequest(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&apikey=${_apiKey}`);
    return res.data.results.map(_transformComics);
  }
  const _transformComics = (comics) => {
    let description = comics.description ? comics.description : "There is no description...";
    description = description.length > 30 ? description.slice(0, 40) + "..." : description;
    const price = comics.prices[0].price ? `${comics.prices[0].price}$` : "NOT AVAILABLE";

    return {
      id: comics.id,
      title: comics.title,
      description: description,
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      homepage: comics.urls[0].url,
      price: price,
      // wiki: char.urls[1].url,
      // comicses: char.comics.items.slice(0, 10), //Take Only 10 Comics
    }
  }

  return { loading, error, clearError, get_9_Characters, getCharacter, get_8_Comics }
}
export default useMarvelServise;