import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import TransactionScreen from './screen/BookTransactionScreen';



export default class App extends React.Component {
  render(){
    return (
      <TransactionScreen/>
    );
  }
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
