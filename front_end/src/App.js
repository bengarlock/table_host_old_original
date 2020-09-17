import React from 'react';
import './App.css';
import Header from "./headers/Header";
import FloorContainer from "./containers/FloorContainer";
import BookContainer from "./containers/BookContainer";
import { Route } from 'react-router-dom'
import GuestContainer from "./containers/GuestContainer";


class App extends React.Component {

    state = {
        slots: [],
        date: new Date(),
    }

    setDate = (date) => {
        let url = "http://localhost:3000/date?date=" + (this.state.date.getFullYear() + '-' + ('0' + (this.state.date.getMonth()+1)).slice(-2) + '-' + ('0' + this.state.date.getDate()).slice(-2))
        fetch(url)
            .then(res => res.json())
            .then(book => this.setState({
                slots: book[0].slots,
                date: date,
            }))
    }

    componentDidMount() {
        let date = new Date()
        let url = "http://localhost:3000/date?date=" + (date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2))
        fetch(url)
            .then(res => res.json())
            .then(book => this.setState({
                slots: book[0].slots,
            }))
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
                <Route exact path="/" render={ () => <BookContainer date={this.state.date} slots={this.state.slots} /> } />
                <Route exact path="/floor" render={ () => <FloorContainer date={this.state.date}/> } />
            </>
    )
  }
}

export default App;
