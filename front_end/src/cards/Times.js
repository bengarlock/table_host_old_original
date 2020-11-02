import React from 'react'


class Times extends React.Component {



    render(){
        return(
            <option value={this.props.time}>{this.props.time}</option>
        )
    }
}

export default Times
