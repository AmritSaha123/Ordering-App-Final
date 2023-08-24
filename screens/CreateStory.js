import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,TouchableOpacity,Alert
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";

import * as SplashScreen from 'expo-splash-screen';
import * as Font from "expo-font";
import firebase  from "firebase"
import { Button } from "react-native-paper";
import { useState } from "react";
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: "image_1",
      dropdownHeight: 40,
      light_theme : true,
      orderList:""
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser()
    let theme;
    }


    fetchUser = () => {
      let w;
      console.log(this.props.route.params.story.table)
      firebase
        .database()
        .ref("/orders/Table" +this.props.route.params.story.table)
        .on("value", snapshot => {
         console.log("Inside Create Story::"+"/orders/Table" +this.props.route.params.story.table)
         if (snapshot.exists()) {
          w = snapshot.val().table_order==null?"":snapshot.val().table_order;
          console.log(w)
          this.setState({ orderList: w });
         } else {
          console.log("No data available");
          this.setState({ orderList: "" });
        }
         
        });
    };
  
  async addStory() {
    console.log("STORY ::: "+this.state.story)
    console.log(this.props.route.params.story.table)
    this.state.story=this.state.orderList
    if (this.state.story) {
      var d = new Date()
      let storyData = {
        ordertime: d.toString(),
        table: "Table" + this.props.route.params.story.table,
        table_order: this.state.story,
        completed:"false"
      }
      console.log(storyData)
      await firebase
        .database()
        .ref("/orders/" + "Table" + this.props.route.params.story.table)
        .set(storyData)
        .then(function (snapshot) {

        }).catch((e) => { console.error(e) })
      //this.props.setUpdateToTrue();
      console.log("P1:::")
      this.props.navigation.navigate("Feed")
      console.log("P2:::")
    } else {
      Alert.alert(
        'Error',
        'All fields are required!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    }
  }
  
  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
     // const [story, setStory] = useState("");
      return (
        <View style={this.state.light_theme?styles.containerLight:styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={this.state.light_theme?styles.appTitleTextLight:styles.appTitleText}>
              <Text style={styles.appTitleText}>New Order</Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
           
                    <ScrollView>
             
              <TextInput
                style={[
                  this.state.light_theme?
                  [styles.inputFontLight,
                  styles.inputFontExtra,
                  styles.inputTextBig]:
                  [
                    styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig,
                  ]
                ]}
                editable
                
               // onEndEditing={(story) => {this.setState({ story })}}
               //onChangeText={(text) => setStory(text)}
               onChangeText={(orderList) => {this.setState({ orderList })}}
                placeholder={"Enter the Order"}
                multiline={true}
                numberOfLines={20}
                placeholderTextColor="white"
                value={this.state.orderList!=null?this.state.orderList:""}
              />
  <View style={styles.submitButton}>
  <TouchableOpacity
         
          onPress={() => this.addStory()}
        >
          <Text style={styles.submitButton}>SUBMIT</Text>
          </TouchableOpacity>
               
              </View>
             </ScrollView>
                   </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },
  inputFont: {
    height: RFValue(40),
    marginTop: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans",
  },
  inputFontLight: {
    height: RFValue(40),
    marginTop: RFValue(40),
    borderColor: "black",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "black",
    fontFamily: "Bubblegum-Sans",
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: "top",
    height:"40%",
    padding: RFValue(5),
  },
  containerLight: {
    flex: 1,
    backgroundColor: "red"
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  submitButton: {
    marginTop: RFValue(20),
    marginLeft:RFValue(10),
    color: "black",
   fontSize: RFValue(23),
   fontFamily: "Bubblegum-Sans",
   backgroundColor:"yellow",
   borderRadius:RFValue(20),
   justifyContent:"center",
   alignItems:"center",
   
   
    width:"90%"
  }

});
