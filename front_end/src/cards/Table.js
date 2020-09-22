import React from 'react'
import "../stylesheets/Table.css"


class Table extends React.Component{

    state = {
        color: '',
        status_menu: false,
        border: "none"
    }

    componentDidMount() {
        if (this.props.table.status === "open") {
            this.setState({
                color: "grey"
            })
        } else if (this.props.table.status === "seated") {
            this.setState({
                color: "blue"
            })
        } else if (this.props.table.status === "appetizer") {
            this.setState({
                color: "red"
            })
        } else if (this.props.table.status === "entree") {
            this.setState({
                color: "orange"
            })
        } else if (this.props.table.status === "dessert") {
            this.setState({
                color: "#aa2dfc"
            })
        } else if (this.props.table.status === "check_dropped") {
            this.setState({
                color: "#23fa5c"
            })
        } else if (this.props.table.status === "paid") {
            this.setState({
                color: "green"
            })
        }
    }

    onDropHandler = (e) => {
        e.preventDefault()
    }

    onDragOverHandler = (e) => {
        e.preventDefault()
        this.setState({
            color: "blue"
        })
    }

    onDragLeaveHandler = (e) => {
        e.preventDefault()
        this.setState({
            color: "grey"
        })
    }

    onDropHandler = (e) => {
        e.preventDefault()
        this.props.updateTable(this.props.table)
    }

    onDoubleClickHandler = (e) => {
        if (this.props.table.status !== "open") {
            this.props.renderStatusForm(this.props.table)
        }
    }

    onClickHandler = () => {
        if (this.state.border === "none") {
            this.setState({
                border: "2px solid white"
            })
        } else {
            this.setState({
                border: "none"
            })
        }
    }

    render(){
        return(
            <div id={this.props.table.id} onDragOver={this.onDragOverHandler} onDragLeave={this.onDragLeaveHandler} onDropCapture={this.onDropHandler} onDoubleClick={this.onDoubleClickHandler} onClick={this.onClickHandler}>
                <div className={this.props.table.class_name}
                     style={{
                         left: `${this.props.table.position_left}`,
                         top:`${this.props.table.position_top}`,
                         backgroundColor: `${this.state.color}`, border: `${this.state.border}`}}>{this.props.table.name}</div>
            </div>
        )
    }

}

export default Table