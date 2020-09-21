import React from 'react'
import {NavLink} from "react-router-dom";

class MainMenu extends React.Component {

    menuClickHandler = (e) => {
        this.props.menuClickHandler(e.target.innerText)
        this.props.onClickHandler()
    }

    render () {
        return (
/*            <div id="main-menu-container">
                <div className="menu-item" onClick={this.menuClickHandler}><NavLink className="menu-item" to="/" exact >Book</NavLink></div>
                <div className="menu-item" onClick={this.menuClickHandler}><NavLink className="menu-item" to="/floor" exact>Floor</NavLink></div>
                <div className="menu-item" onClick={this.menuClickHandler}><NavLink className="menu-item" to="/guests" exact>Guests</NavLink></div>
            </div>*/
        <div id="main-menu-container">
           <NavLink className="menu-item" to="/" exact onClick={this.menuClickHandler}>Book</NavLink>
           <NavLink className="menu-item" to="/floor" exact onClick={this.menuClickHandler}>Floor</NavLink>
           <NavLink className="menu-item" to="/guests" exact onClick={this.menuClickHandler}>Guests</NavLink>
        </div>
        )
    }
}

export default MainMenu