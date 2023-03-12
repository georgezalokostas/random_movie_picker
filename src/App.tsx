import { useEffect, useState } from "react";
import { IMovie } from "./interfaces/IMovie";
import RenderResults from "./components/RenderResults";
import { MoviesIDs } from "./components/text_arrays/MoviesIDs";
import { getRandomItem } from "./components/Functions";
import Footer from "./components/Footer";

const App = () => {
  const [movie, setMovie] = useState<IMovie>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const GetMovieData = async () => {
    let searchTerm = getRandomItem(MoviesIDs);
    const url = `https://www.omdbapi.com/?apikey=19260989&i=${searchTerm}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson) {
      setMovie(responseJson);
      setIsLoading(false);
    } else {
      <h4>A problem encountered while using the API.</h4>;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      GetMovieData();
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    
    <div className="Components">
      <RenderResults movie={movie} />
      {isLoading ? (
        <h4></h4>
      ) : (
        <button
          className="nextMovie"
          onClick={() => {
            setIsLoading(true);
            GetMovieData();
          }}
        >
          Next Movie!
        </button>
      )}
      <Footer />
    </div>
  );
};

export default App;
