import React from 'react';
import './App.css';
import Header from "./headers/Header";
import FloorContainer from "./containers/FloorContainer";
import BookContainer from "./containers/BookContainer";
import { Route } from 'react-router-dom'
import GuestContainer from "./containers/GuestContainer";


class App extends React.Component {

    state = {
        date: new Date()
    }

    setDate = (date) => {
        this.setState({
            date: date
        })
    }

    menuClickHandler = (obj) => {
        if (obj === "Book") {
            console.log("Book")
        } else if (obj === "Floor") {
            console.log("Floor")
        } else if (obj === "Guests") {
            console.log("Guests clicked")
        }
    }

    render() {
        return (
            <>
                <Header menuClickHandler={this.menuClickHandler} date={this.state.date} setDate={this.setDate}/>
                <Route exact path="/" render={ () => <BookContainer date={this.state.date}/> } />
                <Route exact path="/floor" render={ () => <FloorContainer date={this.state.date}/> } />
            </>
    )
  }
}

export default App;
