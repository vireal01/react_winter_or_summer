import React from 'react'
import ReactDOM from 'react-dom'
import SeasonDisplay from './SeasonDisplay';
import Loader from "./Loader"


class App extends React.Component {
    state = { lat: null, errorMessage: null }

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => (this.setState({ errorMessage: err.message }))
        );
    }


    renderContent() {
        if (!this.state.errorMessage && this.state.lat) {
            return <div> <SeasonDisplay lat={this.state.lat} /></div>
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
                {this.renderContent()}
            </div>
        )
    }
}

ReactDOM.render(
    <App />,

    document.querySelector('#root')
)