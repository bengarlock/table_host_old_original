import React from "react";

class NewGuestForm extends React.Component {

    state = {
        guest: {
            id: '',
            first_name: '',
            last_name: '',
            phone_number: '',
            guest_notes: '',
            root_user: false,
        }

    }


    componentDidMount() {
        if (this.props.search_data.includes('1', '2', '3', '4', '5', '6', '7', '8', '9','0')) {

            this.setState({
                guest: {
                    phone_number: this.props.search_data
                }

            })

        } else {

            let full_name = this.props.search_data.split(" ")
            full_name = full_name.map(name => this.Capitalize(name))

            let first_name = this.Capitalize(full_name[0])
            let last_name = full_name.slice(1).join(" ")

            this.setState({
                guest: {
                    first_name: first_name,
                    last_name: last_name,
                }

            })
        }
    }

    Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    onSubmitHandler = (e) => {
        e.preventDefault()

        let data = {
            first_name: this.state.guest.first_name,
            last_name: this.state.guest.last_name,
            phone_number: this.state.guest.phone_number,
            guest_notes: '',
            root_user: false,
        }

        let packet = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify(data)
        }
        fetch("http://www.bengarlock.com:8080/guests/", packet)
            .then(res => res.json())
            .then(response => this.setState({
                guest: {
                    first_name: response.first_name,
                    last_name: response.last_name,
                    phone_number: response.phone_number,
                    guest_notes: response.guest_notes,
                    id: response.id,
                    root_user: response.root_user,
                }
            }, () => {
                this.props.updateGuest(response, this.props.slot)


            }, () => {
                this.props.modifyFormSetState()
            }))
    }

    onChangeHandler = (e) => {
        if (e.target.name === "first-name") {
            let last_name = this.state.guest.last_name
            let phone_number = this.state.guest.phone_number

            this.setState({
                guest: {
                    first_name: e.target.value,
                    last_name: last_name,
                    phone_number: phone_number
                }
            })

        } else if (e.target.name === "last-name") {
            let first_name = this.state.guest.first_name
            let phone_number = this.state.guest.phone_number

            this.setState({
                guest: {
                    first_name: first_name,
                    last_name: e.target.value,
                    phone_number: phone_number,
                }
            })
        } else if (e.target.name === "phone-number") {
            let first_name = this.state.guest.first_name
            let last_name = this.state.guest.last_name
            this.setState({
                guest: {
                    first_name: first_name,
                    last_name: last_name,
                    phone_number: e.target.value
                }
            })
        }
    }



    render() {
        return(

            <div>
                <form onSubmit={this.onSubmitHandler} className="reservation-form">
                    <input name = "first-name" type="text" value={this.state.guest.first_name || ''} onChange={this.onChangeHandler} placeholder="First Name" />
                    <input name = "last-name" type="text" value={this.state.guest.last_name || ''} onChange={this.onChangeHandler} placeholder="Last Name" />
                    <input name = "phone-number" type="text" value={this.state.guest.phone_number || ''} onChange={this.onChangeHandler} placeholder="Phone Number" /><br />
                    <input name = "Create Guest" type="submit" />
                </form>
            </div>
        )
    }

}

export default NewGuestForm