import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";
import { addException } from "react-native/Libraries/LogBox/Data/LogBoxData";

function HomeScreen( {navigation}) {
 const [colorArray, setColorArray] = useState([]);

 function renderItem({ item }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailsScreen", { ...item })}
    >
      <BlockRGB red={item.red} green={item.green} blue={item.blue} />
    </TouchableOpacity>
  );
}
// sample comment


 function addColor(){
  setColorArray([
  
    {

      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256),
      id: `${colorArray.length}`,
      
    },
    ...colorArray,
  ]);
  // add this function into your touchable opactiy
}

function renderItem({ item }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailsScreen", { ...item })}
    >
      <BlockRGB red={item.red} green={item.green} blue={item.blue} />
    </TouchableOpacity>
  );
}


 function reset(){
   setColorArray([]);
 }

 return (
   <View style={styles.container}>
     <TouchableOpacity
     onPress={addColor}
       style={{height: 40, justifyContent: "center"}}
       >
         <Text style={{ color: 'red'}}>Add a new color</Text>
     </TouchableOpacity>

     <TouchableOpacity
     onPress={reset}s
       style={{height: 40, justifyContent: "center"}}
       >
         <Text style={{ color: 'red'}}>Reset</Text>
     </TouchableOpacity>

     <FlatList 
     style={styles.list} 
     data={colorArray} 
     renderItem={renderItem} 
     />
   
   </View>
 );
}

function DetailsScreen({route}){
  const {red,green,blue} = route.params;

  return (
    <View
    style={[
      styles.container, 
      {backgroundColor: `rgb(${red}, ${green}, ${blue})` },
    
    ]
    }>
     <View style={{ padding: 30 }}>
       <Text style={styles.detailText}>Red: {red}</Text>
       <Text style={styles.detailText}>Green: {green}</Text>
       <Text style={styles.detailText}>Blue: {blue}</Text>
     </View>


    </View>
  )
}



const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="Colour List" component={HomeScreen} />
       <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
 },
 list: {
   width: "100%",
 },
});

