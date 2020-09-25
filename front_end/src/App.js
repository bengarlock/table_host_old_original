import React from 'react';
import './App.css';
import Header from "./headers/Header";
import FloorContainer from "./containers/FloorContainer";
import BookContainer from "./containers/BookContainer";
import GuestContainer from "./containers/GuestContainer";
import { Route } from 'react-router-dom'


class App extends React.Component {

    state = {
        slots: [],
        date: new Date(),
        page: '/'
    }

    setDate = (date) => {
        this.setState({
            date: date
        })
        let url = "http://localhost:3000/date?date=" + (date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2))
        fetch(url)
            .then(res => res.json())
            .then(book => this.renderSlots(book))
    }

    componentDidMount() {
        let date = new Date()
        let url = "http://localhost:3000/date?date=" + (date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2))
        fetch(url)
            .then(res => res.json())
            .then(book => this.renderSlots(book))
    }

    updateTableArray = (table) => {
        const newArray = [...this.state.tables]
        const tableToUpdate = newArray.find(item => item.id === table.id)
        tableToUpdate.status = table.status

        this.setState({
            tables: newArray
        })
    }

    renderSlots = (book) => {
        book[0].slots.sort((a, b) => (a.id > b.id) ? 1 : -1)
        this.setState({
            slots: book[0].slots,
        })
    }

    //updating coming from Slot.js using state
    updateSlots = (state) => {
        const newArray = this.state.slots
        const slotToUpdate = newArray.find(item => item.id === state.slot.id)

        slotToUpdate.booked = state.slot.booked
        slotToUpdate.guest.first_name = state.guest.first_name
        slotToUpdate.guest.last_name = state.guest.last_name
        slotToUpdate.guest.guest_notes = state.guest.guest_notes
        slotToUpdate.party_size = state.slot.party_size
        slotToUpdate.guest.phone_number = state.guest.phone_number
        slotToUpdate.reservation_notes = state.slot.reservation_notes
        slotToUpdate.status = state.slot.status
        slotToUpdate.time = state.slot.time

        this.setState({
            slots: newArray
        })

    }

    menuClickHandler = (obj) => {
        if (obj === "Book") {
            console.log("Book")
        } else if (obj === "Floor") {
            console.log("floor")
        } else if (obj === "Guests") {
            console.log("Guests clicked")
        }
    }

    render() {
        return (
            <>
                <Header menuClickHandler={this.menuClickHandler} date={this.state.date} setDate={this.setDate}/>
                <Route exact path="/" render={ () => <BookContainer date={this.state.date} slots={this.state.slots} updateSlots={this.updateSlots}/> } />
                <Route exact path="/floor" render={ () => <FloorContainer
                    date={this.state.date} slots={this.state.slots}
                    updateSlotsfromObject={this.updateSlotsfromObject}
                    updateTableArray={this.updateTableArray} /> } />
                <Route exact path="/guests" render={ () => <GuestContainer /> } />
            </>
    )
  }
}

export default App;
