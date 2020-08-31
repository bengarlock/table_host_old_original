import React from 'react'

class MainMenu extends React.Component {

    menuClickHandler = (e) => {
        this.props.menuClickHandler(e.target.innerText)
        this.props.onClickHandler()
    }

    render () {
        return (
            <div id="main-menu-container">
                <div className="menu-item" onClick={this.menuClickHandler}>Book</div>
                <div className="menu-item" onClick={this.menuClickHandler}>Reservations</div>
                <div className="menu-item" onClick={this.menuClickHandler}>Guests</div>
            </div>
        )
    }


}

export default MainMenu