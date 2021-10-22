import React, { Component } from 'react';
import { Link } from 'react-router-dom';

 class Navbar extends Component {
    render() {
        return (
            <div style={{display:'flex',backgroundColor:'violet',paddingBottom:'1',color:"green"}}>
                <Link style={{textDecoration:"none",color:"green"}}to="/"><h1>Movies App</h1></Link>
                <Link style={{textDecoration:"none",color:"green"}} to="/favourties"> <h2 style={{marginLeft:'2rem',marginTop:'2rem'}}>Favourites</h2></Link>
            </div>
        )
    }
}

export default Navbar;
