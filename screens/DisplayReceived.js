import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import firebase from "firebase";
import DisplayReceivedOrder from "./DisplayReceivedOrder";
import MyCheckBox from "./MyCheckBox";
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class DisplayReceived extends Component {
  constructor(props) {
    super(props);
    console.log("WINNER")
    console.log(this.props.story.table,this.props.story.completed)
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      is_liked: false,
      table: this.props.story.table,
      completed: this.props.story.completed,
    };
  }

  async _loadFontsAsync() {
    console.log("GRACE C FONTS DR")
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
    //this.setState({ completed: this.props.story.completed });
  }

  componentDidMount() {
    this._loadFontsAsync();
  //  this.fetchUser();
  this.render()
  console.log("GRACE C IT::"+this.props.story.completed)
    console.log("GRACE C IT2::"+this.state.completed)
    console.log(typeof (this.state.completed)) 
   
  }
  likeAction = () => {
    console.log("GRACE IT::"+this.props.story.completed)
    console.log("GRACE IT2 ##::"+this.state.completed)
    Alert.alert('Confirm', 'Are you sure', [
      
      {
        text: 'Cancel',
        onPress: () => {
          console.log('Cancel Pressed')},
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {

    if (this.state.completed=="true" ) {
      firebase
        .database()
        .ref("orders")
        .child("Table"+this.props.story.table)
        .child("completed")
        .set("false");
      this.setState({ completed: "false" });
    } else {
      firebase
        .database()
        .ref("orders")
        .child("Table"+this.props.story.table)
        .child("completed")
        .set("true");
      this.setState({ completed: "true" });
    }
  
console.log('OK Pressed')},
  }
    ]);
  }
  fetchUser = () => {
    let w;
    console.log("WWWWW"+this.props.route.params.story.table)
    firebase
      .database()
      .ref("/orders/Table" +this.props.route.params.story.table)
      .on("value", snapshot => {
       console.log("Inside Create Story::"+"/orders/Table" +this.props.route.params.story.table)
       if (snapshot.exists()) {
        w = snapshot.val().table==null?"":snapshot.val().table;
        console.log(w)
        this.setState({ table: w.slice(5) });
       } else {
        console.log("No data available");
        this.setState({ table: "" });
      }
       
      });
  };

  render() {
    console.log("GRACE IT3::"+this.state.completed)
    console.log("GRACE MIRACLE::"+this.state.fontsLoaded)
   
    if (this.state.fontsLoaded) 
    {
      SplashScreen.hideAsync();
      return (
        <TouchableOpacity
          style={styles.container}
         
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View
            style={
              this.state.light_theme
                ? styles.cardContainerLight
                : styles.cardContainer
            }
          >
            

            <View style={styles.actionContainer}>
              <View >
                <TouchableOpacity
                style={styles.likeButton}
                   onPress={() =>
                    //this.props.navigation.navigate("StoryScreen", {
                     // story: this.props.story
                     this.props.navigation.navigate("DisplayReceivedOrder", {
                       story: this.props.story
                    })
                  }
                >
                <Text
                  style={
                    this.state.light_theme
                      ? styles.likeTextLight
                      : styles.likeText
                  }
                >
                  {this.state.table}
                </Text>
                </TouchableOpacity>
               
              </View>
              <View style={styles.actionContainer}>
              <TouchableOpacity
                style={
                  !this.state.completed
                    ? styles.likeButtonLiked
                    : styles.likeButtonDisliked
                }
                onPress={() => this.likeAction()}
              >
                <Ionicons
                  name={"restaurant"}
                  size={RFValue(30)}
                  color={this.state.completed ? "black" : "red"}
                />

                <Text
                  style={
                    this.state.light_theme
                      ? styles.likeTextLight
                      : styles.likeText
                  }
                >
                  {this.state.completed=="true"?"Completed":"Not Completed"}
                </Text>
              </TouchableOpacity>
            </View>
             
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  cardContainerLight: {
    margin: RFValue(13),

    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2)
  },
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  titleTextContainer: {
    flex: 0.8
  },
  iconContainer: {
    flex: 0.2
  },
  storyTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "white"
  },
  storyTitleTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "black"
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white"
  },
  storyAuthorTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "black"
  },
  descriptionContainer: {
    marginTop: RFValue(5)
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(13),
    color: "white"
  },
  descriptionTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(13),
    color: "black"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  likeButtonLiked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#39a4eb",
    borderRadius: RFValue(30)
  },
  likeButtonDisliked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#eb3948",
    borderWidth: 2,
    borderRadius: RFValue(30)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#eb3948",
    borderWidth: 2,
    borderRadius: RFValue(30),
    backgroundColor:"pink"
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    marginLeft: RFValue(5),
    backgroundColor:"red"
  },
  likeTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    marginLeft: RFValue(5)
  }
});
