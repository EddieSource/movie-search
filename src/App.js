import logo from './logo.svg';
import React, {useState, useEffect} from 'react'; 
import './App.css';

//search bar component
const SearchBar = ({input,updateInput, fetchData}) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <>
    <input 
     style={BarStyling}
     key="random1"
     value={input}
     placeholder={"search movie"}
     onChange={(e) => updateInput(e)}
    />

    <button onClick={fetchData}>search</button>
    </>
  );
}

//movieList component
const MovieList = ({movieList = []})=>{
  return (
    <>
    
    { movieList.map((data,index) => {
        if (data) {
          return (
            
            <div key={data.Title}>
              <img src={data.Poster} />
              <h1>{data.Title}</h1>
              <h1>{data.Year}</h1>
              <h1>{data.imdbID}</h1>
              
	          </div>
            
    	   )	
    	 }
    	 return null
    }) }
    </>
  );
}


const SearchPage = (props) => {
  const [input, setInput] = useState('');
  const [movieListDefault, setMovieListDefault] = useState();
  const [movieList, setMovieList] = useState([]);

  const fetchData = async () => {
    return await fetch(`http://www.omdbapi.com/?apikey=f4584f5b&s=${input}`)
      .then(response => response.json())
      .then(data => {
         console.log(data.Search)
         setMovieList(data.Search) 
         setMovieListDefault(data.Search)
       });}



  // useEffect( () => {fetchData()},[]);

  const updateInput = (event) => {
    console.log(event)
    setInput(event.target.value)
  }
	
  return (
    <>
      <h1>Movie List</h1>
      <SearchBar 
       input={input} 
       updateInput={updateInput}
       fetchData={fetchData}
      />
      <MovieList movieList={movieList}/>
    </>
   );
}




function App() {
  return (
    <div className="App">
      <SearchPage />
      

    </div>
  );
}


export default App;
