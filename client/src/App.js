import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './components/Home/';
import LandingPage from './components/LandingPage/'
import PokemonCreate from './components/CreatePokemon/'
import PokemonDetail from "./components/PokemonDetail/";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path='/' element={<LandingPage />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/detail/:id' element={<PokemonDetail />}/>
      <Route path='/create' element={<PokemonCreate />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
