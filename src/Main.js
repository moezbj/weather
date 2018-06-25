import React, { Component } from "react";
import { View, Text, ImageBackground, Image, StyleSheet } from "react-native";
import axios from "axios";
import moment from "moment";
import { createStackNavigator } from "react-navigation";

const day = moment().format("dddd");
const time = moment().format(" h:mm ");

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
      pressure: "",
      speed_Wind: "",
      deg_wind: "",
      logo: null,
      weather: "",
      icon: null,
      sunrise: "",
      sunset: "",
      degree: "C"
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
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
    console.log(queryString);
    const url =
      "http://api.openweathermap.org/data/2.5/forecast?cnt=3&appid=39a3e4d4c97c54a078a92304f5757592&";
    axios
      .get(url + queryString)
      .then(res => {
        console.log(res, "gdgdgd");
        newsunrise = "";
        newsunset = "";

        var sunrise = moment
          .unix(res.data.sys.sunrise)

          .format("hh:mm");
        var str = sunrise.split();
        for (let i = 0; i < str.length; i++) {
          newsunrise = str[i];
        }
        var sunset = moment
          .unix(res.data.sys.sunset)

          .format("hh:mm");
        var str1 = sunset.split();
        for (let i = 0; i < str1.length; i++) {
          newsunset = str1[i];
        }
        this.setState({
          data: res.data,
          weather: res.data.weather[0].description,
          icon: res.data.weather[0].icon,
          name: res.data.name,
          country: res.data.sys.country,
          temp: Math.round(res.data.main.temp),
          max_temp: res.data.main.temp_max,
          min_temp: res.data.main.temp_min,
          humidity: res.data.main.humidity,
          pressure: res.data.main.pressure,
          speed_Wind: res.data.wind.speed,
          deg_wind: res.data.wind.deg,
          sunrise: newsunrise,
          sunset: newsunset
        });
        this.UpdatePicture();
      })
      .catch(error => console.log(error));
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
  CtoF = () => {
    const temp = this.state.temp;
    const max_temp = this.state.max_temp;
    const min_temp = this.state.min_temp;
    if (this.state.degree === "C")
      this.setState({
        temp: (temp * 9) / 5 + 32,
        max_temp: (max_temp * 9) / 5 + 32,
        min_temp: (min_temp * 9) / 5 + 32,
        degree: "F"
      });
    else if (this.state.degree === "F") {
      this.setState({
        temp: Math.round(((temp - 32) * 5) / 9),
        max_temp: Math.round(((max_temp - 32) * 5) / 9),
        min_temp: Math.round(((min_temp - 32) * 5) / 9),
        degree: "C"
      });
    }
  };

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
        <View style={styles.maindiv}>
          <View style={styles.timeDay}>
            <Text style={styles.countrytxt}>{day}</Text>
            <Text style={styles.countrytxt}>{time}</Text>
          </View>

          <View style={styles.infodiv}>
            <View style={styles.country}>
              <Text style={styles.countrytxt}>{this.state.name} ,</Text>
              <Text style={styles.countrytxt}> {this.state.country}</Text>
            </View>
            <View style={styles.country}>
              <Text style={styles.temptxt}>{this.state.temp}°</Text>
              <Text style={styles.temptxt} onPress={this.CtoF}>
                {this.state.degree}
              </Text>
            </View>
            <View style={styles.country}>
              <Text style={styles.countrytxt}>{this.state.weather}</Text>
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri: this.state.icon
                }}
              />
            </View>
            <View style={styles.country}>
              <Text>
                <Text style={styles.span}> max_temp: </Text>
                {this.state.max_temp}°
              </Text>
              <Text>
                <Text style={styles.span}> min_temp: </Text>
                {this.state.min_temp}°
              </Text>
            </View>
            <View style={styles.country}>
              <Text>
                <Text style={styles.span}> Humidity: </Text>
                {this.state.humidity}
              </Text>
              <Text>
                <Text style={styles.span}> Wind: </Text>
                {this.state.speed_Wind}
              </Text>
              <Text>
                <Text style={styles.span}> Pressure: </Text>
                {this.state.pressure}
              </Text>
            </View>

            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
          </View>
          <View style={styles.infodiv}>
            <View>
              <Text style={styles.countrytxt}>
                <Text style={styles.span}>Sunrise :</Text>
                {this.state.sunrise}
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri:
                      "https://www.kisspng.com/png-sunrise-computer-icons-clip-art-sunrise-843491/"
                  }}
                />
              </Text>
              <Text style={styles.countrytxt}>
                <Text style={styles.span}>Sunset :</Text>
                {this.state.sunset}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Main;
const styles = StyleSheet.create({
  maindiv: {
    flex: 1,
    alignItems: "center"
  },
  timeDay: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    height: 70
  },
  infodiv: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 4,
    width: "80%",
    marginBottom: 20
  },
  country: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 5
  },
  countrytxt: {
    fontSize: 20
  },
  temptxt: {
    fontSize: 80
  },
  span: {
    color: "white",
    fontSize: 14,
    paddingLeft: 30
  }
});
