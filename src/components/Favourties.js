import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Favourties extends Component {
    constructor(){
        super();
        this.state={
            generes:[],
            currGeneres:"All Generes",
            Movies:[],
        }
        
    }
    componentDidMount=()=>{
        let movies = JSON.parse(localStorage.getItem("movies") || "[]");
        this.setState({
            Movies:[...movies]
        })
    }

    handleGenres = (generes)=>{
       
        this.setState({
            currGeneres:generes
        },()=>console.log(this.state.currGeneres) )
       
    }
    deleteHandler = (movieId)=>{
        let oldData= JSON.parse(localStorage.getItem('movies') || "[]") ;

        var tempMovies = oldData.filter((movieObj)=>(movieObj.id!=movieId));
        this.setState({
            Movies:[...tempMovies]
        })
        localStorage.setItem('movies',JSON.stringify(tempMovies));

    }
    render() {
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let temp = [];
        let tempGenre=[];
        if(this.state.currGeneres == "All Generes"){
            tempGenre = this.state.Movies;
        }else{
            tempGenre = this.state.Movies.filter((movie)=>      {
                return(
                    genreids[movie.genre_ids[0]]==this.state.currGeneres
                )
            }
            )

        }
        this.state.Movies.map((movieObj)=>{
            if(!temp.includes(genreids[movieObj.genre_ids[0]])){
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        })
        temp.unshift("All Generes")

      
        return (
            <div>

                <div className="main">
                    <div className="row">
                        <div className="col-3">

                            <ul class="list-group favourites-genres">
                                {
                                    temp.map((item)=>(
                                        this.state.currGeneres == item?
                                        <li className="list-group-item" onClick={()=>this.handleGenres(item)} style={{background:"#3f51b5",color:"white",fontWeight:"bold"}}>{item}</li>:
                                        <li className="list-group-item"  onClick={()=>this.handleGenres(item)} style={{background:"white",color:"#3f51b5"}}>{item}</li>

                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-9 favourites-table">
                            < div className="row">
                                <input type="text" placeholder="search" className="input-group-text col"/>
                                <input type="number" placeholder="Row count" className="input-group-text col"/>
                            </div>  
                            <div className="row">
                             <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">TITLE</th>
                                    <th scope="col">GENRE</th>
                                    <th scope="col">RATING</th>
                                    <th scope="col">Popularity</th>
                                    <th scope="col">DELETE MOVIE</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tempGenre.map((movieObj)=>(
                                            
                                                <tr>
                                                <td><img src={`https://image.tmdb.org/t/p/w500/${movieObj.backdrop_path}`} style={{width:"10rem"}}/>{movieObj.original_title}</td>
                                                <td>{ genreids[movieObj.genre_ids[0]]  }</td>
                                                <td>{ movieObj.vote_average  }</td>
                                                <td>{movieObj.popularity}</td>
                                                <td><button type="button" class="btn btn-danger" onClick={()=>this.deleteHandler(movieObj.id)}>DELETE</button></td>
                                                </tr>
                                            
                                                 ))
                                    }
                                   
                                </tbody>
                                </table>
                                </div>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}
