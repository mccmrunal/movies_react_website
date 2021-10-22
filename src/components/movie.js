import React, { Component } from 'react'
import { movies } from './getMovies'
import { Button } from 'react-bootstrap';
import axios from 'axios';
export default class Movie extends Component {

    constructor(){
        super();
        let oldData= JSON.parse(localStorage.getItem('movies') || "[]") ;
        let temp = oldData.map(movie=>movie.id)
        this.state={
            currPage:1,
            movies:[],
            favourties:[...temp],
            key:"",
        }
   
    }
   

     componentDidMount=async()=>{
        
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=78fe96e20702664dde799fee17db46e7&language=en-US&page=${this.state.currPage}`);
        var data = res.data;
        this.setState({
            movies:[...data.results ],
            
        
        })

    }

     changeMovies =async()=>{
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=78fe96e20702664dde799fee17db46e7&language=en-US&page=${this.state.currPage}`);
        var data = res.data;
        this.setState({
            movies:[...data.results ]
        })
    }
    handleRight=()=>{
        this.setState({currPage:this.state.currPage+1 } , 
            this.changeMovies)
        
    }
    handleLeft=()=>{
        this.setState({currPage:this.state.currPage-1 } , 
            this.changeMovies)
        
    }

    handleFavourites = (movie)=>{
        let oldData= JSON.parse(localStorage.getItem('movies') || "[]") ;
        if(this.state.favourties.includes(movie.id)){
           oldData = oldData.filter((movieObj)=>(movieObj.id!=movie.id));

        }else{
            oldData.push(movie);
           
        }
        localStorage.setItem('movies',JSON.stringify(oldData));
        this.handleFavouritesState();
    }
    handleFavouritesState = ()=>{
        let oldData= JSON.parse(localStorage.getItem('movies') || "[]") ;
        let temp = oldData.map(movie=>movie.id)
        this.setState({
            favourties:[...temp]
        })

    }
    render() {
        console.log("rendered");        
        let movie = movies;  
        return (
            <div>
                {
                    movie.length === 0?
                    <div></div>
                    :
                    <div>
                    <h3 className="text-center"><strong>Trending</strong></h3>
                    <div className="movies-list">
                    {
                        this.state.movies.map((movieObj)=>(
                            
                                <div className="card movies-card " key={movieObj.id}>

                                    <img className="movies-img-top card-img-top banner-img" src={`https://image.tmdb.org/t/p/w500/${movieObj.backdrop_path}`}    alt={movieObj.original_title} />
                                    <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                                    <div className="button-wrapper" style={{display:"flex",width:"100%",justifyContent:"center"}}>

                                    <Button variant="primary" onClick={()=>this.handleFavourites(movieObj)}>{
                                        !this.state.favourties.includes(movieObj.id)?"Add to Favourites":"Remove From Favourites"
                                    }</Button>
                                    </div>
                                    
                                {/* </div> */}
                                </div>
                           
                        ))
                    } </div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                            </li>
                            <li href="#" className="page-item"><a className="page-link"  onClick={this.handleLeft}>Left</a></li>
                            <li href="#" className="page-item" ><a className="page-link" onClick={this.handleRight}>Next</a></li>
                            <li href="#" className="page-item"><a className="page-link" >3</a></li>
                            
                        </ul>
                        </nav>
                       
                    </div>
                    
                    
                }   
                
                
            </div>
        )
    }
}
