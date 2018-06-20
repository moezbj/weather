import React, { Component } from "react";
import { View, Text, ImageBackground } from "react-native";
import axios from "axios";
import { images } from "../images";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cords: {
        lat: null,
        lon: null
      },
      error: null,
      data: null,
      logo: "",
      weather: ""
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          error: null,
          cords: {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
        });
        this.requestData();
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  requestData() {
    let queryParams = [];
    for (let i in this.state.cords) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(this.state.cords[i])
      );
    }

    const queryString = queryParams.join("&");
    const url = "https://fcc-weather-api.glitch.me/api/current?";
    axios.get(url + queryString).then(res => {
      this.setState({
        data: res.data,
        weather: res.data.weather[0].description
      });
      this.UpdatePicture();
    });
  }
  UpdatePicture() {
    const weather = this.state.weather;
    switch (weather) {
      case "clear sky":
        this.setState({
          logo: "../images/clear-sky.jpg"
        });
        break;
      case "few clouds":
        this.setState({
          logo: "../images/few-clouds.jpg"
        });
        break;
      case "broken clouds":
        this.setState({
          logo: "../images/broken-clouds.jpg"
        });
        break;
      case "scattered clouds":
        this.setState({
          logo: "../images/scattered-clouds.jpg"
        });
        break;
      case "light rain":
        this.setState({
          logo: "../images/rainy.jpg"
        });
        break;
      case "sunny":
        this.setState({
          logo: "../images/snow.jpg"
        });
        break;
      case "snow":
        this.setState({
          logo: "../images/snow.jpg"
        });
        break;
      case "windy":
        this.setState({
          logo: "../images/windy.jpg"
        });
        break;
      case "snow with rain":
        this.setState({
          logo: "../images/snow.jpg"
        });
        break;
      case "thunderstorm":
        this.setState({
          logo: "../images/thunderstorm.jpg"
        });
        break;
      case "lightning":
        this.setState({
          logo: "../images/thunderstorm.jpg"
        });
        break;
    }
  }

  render() {
    const logo = this.state.logo;
    console.log(toString(logo));
    return (
      <ImageBackground
        source={require("../images/clear-sky.jpg")}
        imageStyle={{ resizeMode: "cover" }}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>Latitude: {this.state.cords.lat}</Text>
          <Text>Longitude: {this.state.cords.lon}</Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </View>
      </ImageBackground>
    );
  }
}

export default Main;
