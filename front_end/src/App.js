import React from 'react';
import './App.css';
import Header from "./headers/Header";
import FloorContainer from "./containers/FloorContainer";
import BookContainer from "./containers/BookContainer";
import GuestContainer from "./containers/GuestContainer";
import ReportsContainer from "./containers/ReportsContainer";
import { Route } from 'react-router-dom'

const backend_url = 'https://bengarlock.com:8080'

class Tablehost extends React.Component {

    state = {
        slots: [],
        date: new Date(),
        page: '/'
    }

    setDate = (date) => {
        let url = backend_url + '/books?date=' + (date.getFullYear() + '-' +
            ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2))
        this.setState({
            date: date
        }, () => {
            fetch(url)
                .then(res => res.json())
                .then(book => this.renderSlots(book))
        })
    }

    componentDidMount() {
        let date = new Date()
        let url = backend_url + "/books?date=" + (date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2))
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
        if (book[0]) {
            book[0].slots.sort((a, b) => (a.id > b.id) ? 1 : -1)
            this.setState({
                slots: book[0].slots,
            })
        } else {
            this.setState({
                slots: []
            })
        }
    }

    //updating coming from ModifyReservationForm.js using state
    updateSlots = (state) => {
        const newArray = this.state.slots
        const slotToUpdate = newArray.find(item => item.id === state.slot.id)

        slotToUpdate.booked = state.slot.booked
        slotToUpdate.guest = state.guest

        slotToUpdate.guest.id = state.guest.id
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


    render() {
        return (
            <>
                <Header date={this.state.date} setDate={this.setDate}/>
                <Route exact path="/" render={ () => <BookContainer
                    date={this.state.date}
                    slots={this.state.slots}
                    updateSlots={this.updateSlots}
                    backendUrl={backend_url}/> } />
                <Route exact path="/floor" render={ () => <FloorContainer
                    date={this.state.date} slots={this.state.slots}
                    updateSlotsfromObject={this.updateSlotsfromObject}
                    updateTableArray={this.updateTableArray}
                    backendUrl={backend_url}/> } />
                <Route exact path="/guests" render={ () => <GuestContainer backendUrl={backend_url}/> } />
                <Route exact path="/reports" render={ () => <ReportsContainer date={this.state.date} slots={this.state.slots} /> } />

            </>
        )
    }
}

export default Tablehost;
