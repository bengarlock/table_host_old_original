import React from 'react'
import {NavLink} from "react-router-dom";

class MainMenu extends React.Component {

    menuClickHandler = (e) => {
        this.props.onClickHandler()
    }

    render () {
        return (
        <div id="main-menu-container">
           <NavLink className="menu-item" to="/" exact onClick={this.menuClickHandler}>Book</NavLink>
           <NavLink className="menu-item" to="/floor" exact onClick={this.menuClickHandler}>Floor</NavLink>
           <NavLink className="menu-item" to="/guests" exact onClick={this.menuClickHandler}>Guests</NavLink>
           <NavLink className="menu-item" to="/reports" exact onClick={this.menuClickHandler}>Reports</NavLink>
        </div>
        )
    }
}

export default MainMenu