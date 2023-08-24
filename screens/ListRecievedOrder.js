import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
Alert,
  Image
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import StoryCard from "./StoryCard";
import DisplayReceived from "./DisplayReceived";

import * as Font from "expo-font";
import { FlatList } from "react-native-gesture-handler";
import firebase from "firebase";

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

//let stories ={} 
let stories = require("./temp_table.json")

export default class ListRecievedOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true
    };
    
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    //this.fetchTableData()
    this.setState({ fontsLoaded: true });
    console.log("inside _loadFontsAsync" + this.state.fontsLoaded)
  }
  componentDidMount() {
    console.log("inside mountr", this.state.fontsLoaded)

    console.log("stories  :: " + stories)

    let stories_1=this.fetchTableData()
    console.log("STRINGIFY ST::" + stories_1);
    this._loadFontsAsync();

    let userStr = JSON.stringify(stories_1);

    console.log("STRINGIFY q::" + userStr);
    this.renderStartItem(stories)
  }
  fetchTableData = () => { let theme;
     firebase .database() 
     .ref("/orders/") .on("value", snapshot => { 
      tableValue = snapshot.val()
       this.setState({ light_theme: theme === "light" }); 
       console.log(tableValue) 
       
       var keys = Object.keys(tableValue) 
       console.log("keys:"+keys) 
       list1 = []
       objs={}
       let booked={}
       let userStr = JSON.stringify(tableValue);

         console.log(userStr);
         let userObj = JSON.parse(userStr, (key, value) => {

           return value;
         });
         console.log("userObj HELP::::  "+userObj)
         
       for (i = 0; i < keys.length; i++) {
         s = keys[i].slice(5)
         //q=s = userObj.keys[i].completed
         console.log("S ::"+s)
         const q = Object.keys(userObj)[2]
         console.log("QW::"+q)
         // console.log(" TABLE NAME :::" +JSON.jsonify(tableValue))


         // var newobj = Object.assign(objs, { "table": s });
         var t = ("Table" + s).toString()
         console.log("TTTTTTTTT " + t)
         console.log(" TESTED::" + (userObj.Table8.table).slice(5))
         console.log("TESTED@:::" + keys[i])
         var t2 = JSON.stringify(userObj)
         //"+keys[i].slice(5)+".completed"
         console.log("t2:::" +userObj.Table8.completed)
         
         console.log("switch :::" +s)
         s=Number(s)
         switch (s) {
           case 1:
             console.log("Table " + s)
             var newobj = {
               "table": s, "completed": userObj.Table1.completed
             };
             list1.push(newobj)
             break;
           case 2:
             console.log("Table " + s)
             var newobj = {
               "table": s, "completed": userObj.Table2.completed
             };
             list1.push(newobj)
             break;
           case 3:
             console.log("Table " + s)
             var newobj = {
               "table": s, "completed": userObj.Table3.completed
             };
             list1.push(newobj)
             break;
           case 4:
             console.log("Table " + s)
             var newobj = {
               "table": s, "completed": userObj.Table4.completed
             };
             list1.push(newobj)
             break;
           case 5:
             console.log("Table " + s)
             var newobj = {
               "table": s, "completed": userObj.Table5.completed
             };
             list1.push(newobj)
             break;
           case 6:
             console.log("Table " + s)
             var newobj = {
               "table": s, "completed": userObj.Table6.completed
             };
             list1.push(newobj)
             break;
           case 7:
             console.log("Table " + s)
             var newobj = {
               "table": s, "completed": userObj.Table7.completed
             };
             list1.push(newobj)
             break;
           case 8:
             console.log("Table " + s)
             var newobj = {
               "table": s, "completed": userObj.Table8.completed
             };
             list1.push(newobj)
             break;
           case 9:
             console.log("Table " + s)
             var newobj = {
               "table": s, "completed": userObj.Table9.completed
             };
             list1.push(newobj)
             break;
           case 10:
             console.log("Table " + s)
             var newobj = {
               "table": s, "completed": userObj.Table10.completed
             };
             list1.push(newobj)
             break;
           case 11:
             console.log("Table " + s)
             var newobj = {
               "table": s, "completed": userObj.Table11.completed
             };
             list1.push(newobj)
             break;
           case 12:
             console.log("Table " + s)
             var newobj = {
               "table": s, "completed": userObj.Table12.completed
             };
             list1.push(newobj)
             break;

           default:
             break;
         }
       

         
         console.log("INSIDE:: " + list1)

       }
        
      console.log("POOOO:: "+list1)
      stories=list1
       //  const jsonString = JSON.stringify(Object.fromEntries(list1))
         console.log("END ::"+stories)
         return stories
   }); };
     
   renderStartItem = (stories) => {
    console.log("Inside renderStartItem"+stories)
    return <DisplayReceived story={stories} navigation={this.props.navigation} />;
   // console.log("Inside renderStartItemPPPPP"+stories)
  };
  renderItem = ({ item: story }) => {
    console.log("Inside LSTRECE")
    return <DisplayReceived story={story} navigation={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    if (this.state.fontsLoaded)
     {
      SplashScreen.hideAsync();
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }
              >
                Ordering App
              </Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={stories}
              renderItem={this.renderItem}
            />
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
    backgroundColor: "#15193c"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  cardContainer: {
    flex: 0.85
  }
});
