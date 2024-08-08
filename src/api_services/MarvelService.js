
class MarvelServide {
  getResource = async (url) => {
    let result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }
    return await result.json();
  }

  getAllCharacters = () => {
    return this.getResource
  }
}