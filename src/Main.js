import React, { Component } from "react";
import { View, Text, ImageBackground } from "react-native";
import axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cords: {
        lat: null,
        lon: null
      },
      error: null,
      name: "",
      country: "",
      temp: "",
      max_temp: "",
      min_temp: "",
      humidity: "",
      speed_Wind: "",
      deg_wind: "",
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
        weather: res.data.weather[0].description,
        name: res.data.name,
        country: res.data.sys.country,
        temp: res.data.main.temp,
        max_temp: res.data.main.temp_max,
        min_temp: res.data.main.temp_min,
        humidity: res.data.main.humidity,
        speed_Wind: res.data.wind.speed,
        deg_wind: res.data.wind.deg
      });
      this.UpdatePicture();
    });
  }
  UpdatePicture() {
    const weather = this.state.weather;
    switch (weather) {
      case "clear sky":
        this.setState({
          logo:
            "https://i.pinimg.com/originals/ab/6c/fe/ab6cfe0cb3bcf0fcab53e0d9d4d8a1b6.jpg"
        });
        break;
      case "few clouds":
        this.setState({
          logo:
            "https://static.wixstatic.com/media/3ba74f_22aaf5e5d80c409f9537710177b79d96~mv2.jpg/v1/fill/w_430,h_646/3ba74f_22aaf5e5d80c409f9537710177b79d96~mv2.jpg"
        });
        break;
      case "broken clouds":
        this.setState({
          logo:
            "https://i.pinimg.com/736x/96/14/93/9614939a6a1da0be11d1c4bcab47f1c8--iphone--wallpaper-mobile-wallpaper.jpg"
        });
        break;
      case "scattered clouds":
        this.setState({
          logo:
            "https://i.pinimg.com/736x/67/f2/d0/67f2d066cfc38ef66462c4219ad1ae9f--cellphone-wallpaper-iphone--wallpaper.jpg"
        });
        break;
      case "light rain":
        this.setState({
          logo:
            "https://i.pinimg.com/originals/d7/2e/d5/d72ed5be5345c62f161e34f89d08552d.jpg"
        });
        break;
      case "sunny":
        this.setState({
          logo:
            "https://android.giveawayoftheday.com/wp-content/plugins/gotd_googleplay_plugin/images/2015/07/com.sea.realistic.wallpaper_Screenshot_1436371317.png"
        });
        break;
      case "snow":
        this.setState({
          logo:
            "https://i.pinimg.com/736x/2b/7f/80/2b7f80317378ca80fa94c8a14f4c8734--iphone-wallpaper-mobile-wallpaper.jpg"
        });
        break;
      case "windy":
        this.setState({
          logo:
            "https://i.pinimg.com/564x/ef/17/4b/ef174bb628af61a31ebaef6526a7c002--ornamental-grasses-green-homes.jpg"
        });
        break;
      case "snow with rain":
        this.setState({
          logo: "../images/snow.jpg"
        });
        break;
      case "thunderstorm":
        this.setState({
          logo:
            "https://s4827.pcdn.co/wp-content/uploads/2014/06/Purple-Storm.jpg"
        });
        break;
      case "lightning":
        this.setState({
          logo:
            "https://s4827.pcdn.co/wp-content/uploads/2014/06/Purple-Storm.jpg"
        });
        break;
    }
  }

  render() {
    const logo = this.state.logo;
    return (
      <ImageBackground
        source={{ uri: logo }}
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
          <Text>Lovation: {this.state.cords.lat}</Text>
          <Text>Longitude: {this.state.cords.lon}</Text>
          <Text>name: {this.state.name}</Text>
          <Text>country: {this.state.country}</Text>
          <Text>temp: {this.state.temp}</Text>
          <Text>max_temp: {this.state.max_temp}</Text>
          <Text>min_temp: {this.state.min_temp}</Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </View>
      </ImageBackground>
    );
  }
}

export default Main;
