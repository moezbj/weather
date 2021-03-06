import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";
import axios from "axios";
import moment from "moment";
import { createStackNavigator } from "react-navigation";
import images from "./images";

const day = moment().format("dddd");
const time = moment().format(" h:mm ");

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cords: [0, 0],
      coords: {
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
      degree: "C",
      nextDays: []
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          error: null,
          coords: {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          },
          cords: [
            parseInt(position.coords.latitude),
            parseInt(position.coords.longitude)
          ]
        });
        this.requestData();
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  requestData() {
    let queryParams = [];
    for (let i in this.state.coords) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(this.state.coords[i])
      );
    }

    const queryString = queryParams.join("&");
    const Baseurl = "https://fcc-weather-api.glitch.me/api/current?";
    axios.get(Baseurl + queryString).then(res => {
      this.setState({
        name: res.data.name,
        country: res.data.sys.country,
        pressure: res.data.main.pressure
      });
    });
    const id = "?app_id=b862b835&app_key=4f97c244616abbd4d1a336857dcb8a2c";
    const url = "http://api.weatherunlocked.com/api/forecast/";
    axios
      .get(url + this.state.cords[0] + "," + this.state.cords[1] + id)
      .then(res => {
        const nextDays = [];
        const arr = res.data.Days;
        var array = arr.shift();
        console.log(arr);
        arr.map((el, i) => {
          nextDays.push({
            description: el.Timeframes[0].wx_desc,
            temp: el.Timeframes[0].temp_c,
            temp_max: el.temp_max_c,
            temp_min: el.temp_max_c,
            icon: el.Timeframes[0].wx_icon,
            date: el.date
          });
        });
        this.setState({
          weather: res.data.Days[0].Timeframes[0].wx_desc,
          icon: res.data.Days[0].Timeframes[0].wx_icon,
          temp: Math.round(res.data.Days[0].Timeframes[0].temp_c),
          max_temp: res.data.Days[0].temp_max_c,
          min_temp: res.data.Days[0].temp_min_c,
          humidity: res.data.Days[0].humid_max_pct,
          speed_Wind: res.data.Days[0].windspd_max_kmh,
          deg_wind: res.data.Days[0].Timeframes[0].winddir_deg,
          sunrise: res.data.Days[0].sunrise_time,
          sunset: res.data.Days[0].sunset_time,
          nextDays
        });

        this.UpdatePicture();
      })
      .catch(error => console.log(error));
  }
  UpdatePicture() {
    const weather = this.state.weather;
    switch (weather) {
      case "Clear skies":
        this.setState({
          logo:
            "https://i.pinimg.com/originals/ab/6c/fe/ab6cfe0cb3bcf0fcab53e0d9d4d8a1b6.jpg"
        });
        break;
      case "Partly cloudy skies":
        this.setState({
          logo:
            "https://static.wixstatic.com/media/3ba74f_22aaf5e5d80c409f9537710177b79d96~mv2.jpg/v1/fill/w_430,h_646/3ba74f_22aaf5e5d80c409f9537710177b79d96~mv2.jpg"
        });
        break;
      case "Partly cloudy skies":
        this.setState({
          logo:
            "https://i.pinimg.com/736x/96/14/93/9614939a6a1da0be11d1c4bcab47f1c8--iphone--wallpaper-mobile-wallpaper.jpg"
        });
        break;
      case "Cloudy skies":
        this.setState({
          logo:
            "https://i.pinimg.com/736x/67/f2/d0/67f2d066cfc38ef66462c4219ad1ae9f--cellphone-wallpaper-iphone--wallpaper.jpg"
        });
        break;
      case "Light rain":
        this.setState({
          logo:
            "https://i.pinimg.com/originals/d7/2e/d5/d72ed5be5345c62f161e34f89d08552d.jpg"
        });
        break;
      case "Sunny skies":
        this.setState({
          logo:
            "https://android.giveawayoftheday.com/wp-content/plugins/gotd_googleplay_plugin/images/2015/07/com.sea.realistic.wallpaper_Screenshot_1436371317.png"
        });
        break;
      case "Moderate snow":
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
      case "Light snow showers":
        this.setState({
          logo: "../images/snow.jpg"
        });
        break;
      case "Moderate or heavy rain with thunder":
        this.setState({
          logo:
            "https://s4827.pcdn.co/wp-content/uploads/2014/06/Purple-Storm.jpg"
        });
        break;
      case "Patchy light snow with thunder":
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
        <ScrollView>
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
              <View style={styles.sun}>
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

            <View style={styles.nextContainer}>
              {this.state.nextDays.map((el, i) => {
                return (
                  <View style={styles.nextday} key={i}>
                    <Text>{el.date}</Text>
                    <Text>{el.description}</Text>
                    <Image
                      source={images[el.icon]}
                      style={{ width: 50, height: 50 }}
                    />
                    <Text>{el.temp}°</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
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
  },
  nextday: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  nextContainer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 4,
    width: "80%",
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  sun: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  }
});
