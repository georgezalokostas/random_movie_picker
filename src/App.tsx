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
      setPopulateMovies(false);
    }
  }, [populateMovies]);

  console.log("Use Effect called. Movies size: " + movies.length);

  if (movies.length > 3) setPopulateMovies(false);

  const RenderMovie = () => {
    return movies.shift();
  };

  if (movies.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="Components">
        <RenderResults movie={RenderMovie()} />
        <button
          className="nextMovie"
          onClick={() => {
            if (movies.length < 3) {
              setPopulateMovies(true);              
            }
            RenderMovie();
          }}
        >
          Next Movie!
        </button>
      </div>
    );
  }
};

export default App;
