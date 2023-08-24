import * as React from 'react';
import {Stack, Checkbox } from 'react-native-paper';
import { CheckBox } from '@rneui/themed';
import {
  View
} from "react-native";

import firebase  from "firebase"
async function setData(complete,tableName)
{var d = new Date()
  let storyData = {
    table: "Table" + tableName,
    completed:"true"
  }

  //update
  console.log("knowledges 1")
  console.log(storyData)
 console.log("LIGHT ")
 await firebase
 .database()
 .ref("/orders/" + "Table" + tableName)
 .update(storyData)
 .then(function (snapshot) {

 }).catch((e) => { console.error(e) })
}
const MyCheckBox = (props) => {
  const tableName=props.name
  console.log("COMPLETE::"+tableName)
  const completedOrder=props.completedOrder;
  console.log("COMPLETE::"+completedOrder)
  const [selectedIndex, setIndex] = React.useState(0);
   return (
    <View>
         <CheckBox
           checked={completedOrder === "false"?false:true}
           onPress={() => {setIndex(0); setData("false",tableName);}}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title="Completed"
         />
         <CheckBox
           checked={completedOrder === "true"?false:true}
           onPress={() => {setIndex(1);setData("true",tableName)}}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title="Not Completed"
         />
      </View>
    
  );
};

export default MyCheckBox;