import './App.css';
import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Weather from './components/Weather';
import Movies from './components/Movies';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      cityMap: '',
      weather: [],
      movie: [],
      error: false,
      errorMessage: '',
      weatherError: false,
      weatherErrorMessage: '',
      movieError: false,
      movieErrorMessage: ''
    }

  }

  handleInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  callApis = () => {
    this.viewMap();
    this.getForcast();
    this.getMovie();
  }

  getCityData = async (event) => {
    event.preventDefault();

    try {
      // make a call to API
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json&limit=1`
      // setState with data I get back
      let cityDataFromAxios = await axios.get(url);
      // render that data to the page
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false,
        errorMessage: '',
      }, this.callApis)

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message,
      })
    }
  }

  getForcast = async () => {

    try {
      let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}&lon=${this.state.cityData.lon}&lat=${this.state.cityData.lat}`

      let weatherFromAxios = await axios.get(url);
      console.log(weatherFromAxios);
      this.setState({
        weather: weatherFromAxios.data,
        weatherError: false,
        weatherErrorMessage: '',
      })
    } catch (error) {
      this.setState({
        weatherError: true,
        weatherErrorMessage: error.message
      })
    }
  }

  getMovie = async () => {

    try {
      let url = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.city}`
console.log(url);
      let movieFromAxios = await axios.get(url);
      console.log(movieFromAxios);
      this.setState({
        movie: movieFromAxios.data,
        movieError: false,
        movieErrorMessage: '',
      })
    } catch (error) {
      this.setState({
        movieError: true,
        movieErrorMessage: error.message
      })
    }
  }

  viewMap = async () => {

    try {
      let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12&size=500x500&format=jpeg`

      this.setState({
        cityMap: mapUrl,
      })

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message,
      })
    }
  }

  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.getCityData}>
          <label htmlFor="">Pick a City:
            <input type="text" onInput={this.handleInput} />
          </label>
          <button type='submit'>Explore!</button>
        </form>
        {this.state.error ?
          <Alert variant="warning">
            <Alert.Heading>ERROR</Alert.Heading>
            <p>{this.state.errorMessage}</p>
          </Alert> :
          <Container>
            <Row>
              <p>Location: {this.state.cityData.display_name}</p>
              <p>Latitude: {this.state.cityData.lat}</p>
              <p>Longitude: {this.state.cityData.lon}</p>

              <Weather weather = {this.state.weather} />
              {this.state.cityMap ?
                <img src={this.state.cityMap} alt='map of city' />
                : null
              }
              <Movies movie = {this.state.movie} />

            </Row>
          </Container>
        }


      </>
    )
  }
}

export default App;
