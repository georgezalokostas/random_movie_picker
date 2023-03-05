import { useEffect, useState } from "react";
import { IMovie } from "./interfaces/IMovie";
import RenderResults from "./components/RenderResults";
import { Top250MoviesIDs } from "./components/text_arrays/Top250MoviesIDs";
import { getRandomItem } from "./components/Functions";

const App = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [populateMovies, setPopulateMovies] = useState<boolean>(true);

  const GetMovieData = async () => {
    let searchTerm = getRandomItem(Top250MoviesIDs);
    const url = `http://www.omdbapi.com/?apikey=19260989&i=${searchTerm}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson) {
      setMovies((oldData) => [...oldData, responseJson]);
    } else {
      console.log("Error: " + responseJson.Error);
    }
  };

  useEffect(() => {
    const PopulateMoviesArray = async () => {
      await GetMovieData();
    };

    if (populateMovies === true) {
      PopulateMoviesArray();
    }
  }, [populateMovies]);

  console.log("Use Effect called. Movies size: " + movies.length);

  if (movies.length === 0) return <div>Loading...</div>;

  let renderedMovie = movies.shift();

  if(movies.length > 3) setPopulateMovies(false);

  return (
    <div className="Components">
      <RenderResults GetMovieData={GetMovieData} movie={renderedMovie} />
    </div>
  );
};

export default App;
