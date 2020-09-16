import React from 'react';
import './App.css';
import Header from "./headers/Header";
import ReservationsContainer from "./containers/ReservationsContainer";
import BookContainer from "./containers/BookContainer";
import GuestContainer from "./containers/GuestContainer";


class App extends React.Component {

    state = {
        currentPage: <BookContainer />
    }

    menuClickHandler = (obj) => {
        if (obj === "Book") {
            this.setState({
                currentPage: <BookContainer />
            })
        } else if (obj === "Floor") {
            this.setState( {
                currentPage: <ReservationsContainer />
            })
        } else if (obj === "Guests") {
            console.log("Guests clicked")
        }
    }

    render() {
        return (
            <>
                <Header menuClickHandler={this.menuClickHandler}/>
                {this.state.currentPage}
            </>
    );
  }
}

export default App;
