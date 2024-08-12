
class MarvelServise {
  _apiKey = '31e00cd22de311c9c0aa0e690688d87b';
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _baseOffSet = 210;

  getResource = async (url) => {
    let result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }
    return await result.json();
  }

  get_9_Characters = async (offset = this._baseOffSet) => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&apikey=${this._apiKey}`);
    return res.data.results.map(this._transformCharacter);
  }
  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?&apikey=${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }
  _transformCharacter = (char) => {
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
}
export default MarvelServise;