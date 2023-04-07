import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useEffect } from "react-native";
import {openDatabase} from "expo-sqlite";
import React, { useState } from 'react';

const db = openDatabase("surfsAppDB.db");
console.log('db:', db);
// Create the items table if it doesn't exist
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
    );
    tx.executeSql('INSERT INTO items (name) VALUES (?)', ['Item 1']);
    tx.executeSql('INSERT INTO items (name) VALUES (?)', ['Item 2']);
    tx.executeSql('INSERT INTO items (name) VALUES (?)', ['Item 3']);
  });

const App = () => {
  // State to store the name of the selected item
  const [selectedItemName, setSelectedItemName] = React.useState("");

  // Function to select the name of an item from the database
  const selectItemName = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM items WHERE id = ?",
        [1], // Replace 1 with the ID of the item you want to select
        (_, { rows }) => setSelectedItemName(rows.item(0).name),
        (_, error) => console.error(error)
      );
    });
  };

  // Call the selectItemName function when the component mounts
  React.useEffect(() => {
    selectItemName();
  }, []);

  // Render the selected item name
  return (
    <View style={{flex:1,alignContent:"center",justifyContent:"center"}}>
      <Text>Selected Item Name: {selectedItemName}</Text>
    </View>
  );
};

export default App;