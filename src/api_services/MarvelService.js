
class MarvelServise {
  _apiKey = '31e00cd22de311c9c0aa0e690688d87b';
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';

  getResource = async (url) => {
    let result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }
    return await result.json();
  }

  getAllCharacters = async () => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`);
    return res.data.results.map(this._transformCharacter);
  }
  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?&apikey=${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }
  _transformCharacter = (char) => {
    let description = char.description ? char.description : "There is no description...";
    description = description.length > 30 ? description.slice(0, 45) + "..." : description;

    return {
      name: char.name,
      description: description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url
    }
  }
}
export default MarvelServise;