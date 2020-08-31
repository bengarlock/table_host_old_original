import React from 'react'
import MainMenu from "../containers/MainMenu";

class Header extends React.Component {

    state = {
        menuClicked: false
    }

    onClickHandler = () => {
        let menuClicked = !this.state.menuClicked
        this.setState({
            menuClicked: menuClicked
        })
    }

    render() {
        return(
            <nav>
                <ul className="main-header">
                    <li>
                        <div onClick={this.onClickHandler}>
                            <div id="main-menu-button"></div>
                            <div id="main-menu-button"></div>
                            <div id="main-menu-button"></div>
                        </div>

                    </li>
                    <li>Flatiron Reservations</li>
                    <li name="book">Book</li>
                </ul>

                <div>{this.state.menuClicked ? <MainMenu menuClickHandler={this.props.menuClickHandler} onClickHandler={this.onClickHandler}/> : null}</div>


            </nav>



        )
    }

}

export default Header