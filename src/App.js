import './App.css';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import Login from './components/Login'
import Header from './components/Header';
import Home from './components/Home';
import AddMovies from './components/AddMovies';
import DeleteMovies from './components/DeleteMovies';
import UpdateMovies from './components/UpdateMovies';
// import Detail from './components/Detail ';

function App() {
  return (
    <div className="App">
      <Router>
          <Header/>
          <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/AddMovies" element={<AddMovies/>}/>
            <Route path="/DeleteMovies" element={<DeleteMovies/>}/>
            <Route path="/UpdateMovies" element={<UpdateMovies/>}/>
            {/* <Route path="/detail/:id" element={<Detail/>}/> */}
          </Routes>
        </Router>
    </div>
  );
}

export default App;
