import React from 'react'
import "../stylesheets/Table.css"


class Table extends React.Component{

    state = {
        color: '',
        status_menu: false,
        border: "none"
    }

    componentDidMount() {
        this.renderTableColor()
    }

    renderTableColor = () => {
        if (this.props.table.status === "done") {
            return "grey"

        } else if (this.props.table.status === "seated") {
            return "blue"

        } else if (this.props.table.status === "appetizer") {
            return "red"

        } else if (this.props.table.status === "entree") {
            return "orange"

        } else if (this.props.table.status === "dessert") {
            return "#aa2dfc"

        } else if (this.props.table.status === "check_dropped") {
            return "#23fa5c"

        } else if (this.props.table.status === "paid") {
            return "green"
        }
    }

    onDropHandler = (e) => {
        e.preventDefault()
        let table = e.target
        table.style.update={ backgroundColor: "blue" }
        this.props.table.status = "seated"
        this.props.updateSeatedTable(this.props.table)
    }

    onDoubleClickHandler = (e) => {
        if (this.props.table.status !== "done") {
            this.props.renderStatusForm(this.props.table)
        }
    }

    onDragOverHandler = (e) => {
        e.preventDefault()

    }

    onDragLeaveHandler = (e) => {
        e.preventDefault()

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
            <div id={this.props.table.id}
                 onDoubleClick={this.onDoubleClickHandler}
                 onDragOver={this.onDragOverHandler}
                 onDropCapture={this.onDropHandler}
                 onClick={this.onClickHandler}>


                <div className={this.props.table.class_name}
                     style={{
                         left: `${this.props.table.position_left}`,
                         top:`${this.props.table.position_top}`,
                         backgroundColor: `${this.renderTableColor()}`, border: `${this.state.border}`}}>{this.props.table.name}</div>
            </div>
        )
    }

}

export default Table