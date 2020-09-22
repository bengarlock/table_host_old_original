import React from 'react'
import "../stylesheets/GuestInfoForm.css"

class GuestInfoForm extends React.Component {

    state = {
        first_name: '',
        last_name: '',
        phone_number: '',
    }


    componentDidMount() {
        this.setState({
            first_name: this.props.guest.first_name
        })
    }

    onChangeHandler = (e) => {
        if (e.target.name === "first_name"){
            this.setState({
                first_name: e.target.value
            })
        } else if (e.target.name === "last_name"){
            this.setState({
                last_name: e.target.value
            })
        } else if (e.target.name === "phone_number"){
            this.setState({
                last_name: e.target.value
            })
        }
    }




    render(){
        console.log(this.props.guest.id)
        return(
            <div>
                <form>
                    <div>
                        <input type="text" name="first_name" placeholder="First Name" value={this.state.first_name} onChange={this.onChangeHandler}></input>
                        <input type="text" name="last_name" placeholder="Last Name" value={this.state.last_name} onChange={this.onChangeHandler}></input>
                        <input type="text" name="phone_number" placeholder="Phone Number" value={this.state.phone_number} onChange={this.onChangeHandler}></input>

                    </div>






                </form>
            </div>
        )
    }
}

export default GuestInfoForm