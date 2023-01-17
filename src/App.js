import './App.css';
import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      cityMap: '',
      error: false, 
      errorMessage: ''
    }
    
  }

  handleInput = (event) => {
    this.setState({
      city: event.target.value
    })
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
      }, this.viewMap) 

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message,
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
    console.log(this.state.cityMap);
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
      {
        this.state.error 
        ? <p>{this.state.errorMessage}</p> :  
        <Container>
          <Row>
            <p>Location: {this.state.cityData.display_name}</p>
            <p>Latitude: {this.state.cityData.lat}</p>
            <p>Longitude: {this.state.cityData.lon}</p>
            {this.state.cityMap ?
            <img src = {this.state.cityMap} alt = 'map of city'/>
            : null
            }
          </Row>
        </Container>
      }


      </>
    )
  }
}

export default App;
