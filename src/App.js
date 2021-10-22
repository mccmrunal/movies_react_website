import './App.css';
import Navbar from './components/navbar';
import Banner from './components/banner';
import Movie from './components/movie';
import Favourties from './components/Favourties';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
function App() {
  return (
    <div className="app">
     
      <BrowserRouter>
       <Navbar/>
       <Switch>
        <Route path="/favourties" component={Favourties}/>
        <Route path='/' exact render={
          (props)=>(
            <>
              <Banner {...props}/>  
              <Movie {...props}/>
            </>
          )
        }/>
        </Switch>

        {/* <Banner/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
