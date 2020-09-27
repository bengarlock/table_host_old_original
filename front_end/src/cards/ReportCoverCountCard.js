import React from 'react'
import "../stylesheets/ReportCoverCountCard.css"


class ReportCoverCountCard extends React.Component {

    state = {
        reservations: this.props.reservation
    }


    onClickHandler = (e) => {
        const dataSetId = Number(e.target.dataset.resoid)
        const resos = this.state.reservations.resos
        const selectedReservation = resos.find(item => item.id === dataSetId)
        this.props.renderGuestInfo(selectedReservation)
    }


    renderDivItems = (time) => {
        const containerArray = []
        let index = 0
        let total = 0

        while (index < time.total_booked) {
            if (this.props.reservation.resos[0]) {
                if (this.props.reservation.resos[index].party_size > 7) {
                    total += this.props.reservation.resos[index].party_size
                    const style = {color: 'white', backgroundColor: 'red', cursor: "default"}
                    containerArray.push(<div
                        className="report-block"
                        key={this.props.reservation.resos[index].id}
                        style={style}
                        data-resoid={this.props.reservation.resos[index].id}
                        onClick={this.onClickHandler}>{this.props.reservation.resos[index].party_size}</div>)
                    index++

                } else {
                    total += this.props.reservation.resos[index].party_size
                    const style = {color: 'white', cursor: "default"}
                    containerArray.push(<div
                        className="report-block"
                        key={this.props.reservation.resos[index].id}
                        style={style} data-resoid={this.props.reservation.resos[index].id}
                        onClick={this.onClickHandler}>{this.props.reservation.resos[index].party_size}</div>)
                    index++
                }
            }
        }

        containerArray.push(<div className="column-total">{total}</div>)


        return(containerArray)
    }


    render() {
        return(
            <>
                <span className="span-column-container">
                    <span className="time-span">{this.props.reservation.time}</span>
                    {this.renderDivItems(this.props.reservation)}
                </span>
            </>
        )
    }
}

export default ReportCoverCountCard