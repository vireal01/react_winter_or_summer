import React from 'react'
import ReactDOM from 'react-dom'
import SeasonDisplay from './SeasonDisplay';
import Loader from "./Loader"
import './index.css'


class App extends React.Component {
    state = { lat: null, errorMessage: null, time: new Date().toLocaleString() }

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => (this.setState({ errorMessage: err.message }))
        );
        setInterval(() => this.setState({ time: new Date().toLocaleString() }), 1000)

    }


    renderContent() {
        if (!this.state.errorMessage && this.state.lat) {
            return <div>
                <SeasonDisplay lat={this.state.lat} />
                <h3 className="clock">{this.state.time}</h3>
            </div>
        }
        if (!this.state.lat && this.state.errorMessage) {
            return <div>Error: {this.state.errorMessage}</div>
        }
        if (!this.state.lat && !this.state.errorMessage) {
            return <Loader message='Please allow us to see your location' />
        }
    }
    //React says we have to define render!
    render() {
        return (
            <div>
                <div>{this.renderContent()}</div>

            </div>
        )
    }
}

ReactDOM.render(
    <App />,

    document.querySelector('#root')
)