import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text,TextInput, TouchableOpacity, View, Image } from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class TransactionScreen extends React.Component {
  constructor(){
    super();

    this.state={
      hasCamPermission : null,
      scanned : false,
      scannedData : '',
      buttonState : 'normal',
      scannedBookID : '',
      scannedStudentID : ''
    }
  }
  
  getCameraPermission = async(id) => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCamPermission : status === 'granted',
      buttonState : id,
      scanned : false
    })
  }

  handleBarcodeScan= async({type,data}) => {
    const {buttonState} = this.state

    if(buttonState === "BookID"){
      this.setState({
        scannedData : data,
        scanned : true,
        buttonState : 'normal'
      })    
    }
    else if (buttonState === "StudentID"){
      this.setState({
        scannedData : data,
        scanned : true,
        buttonState : 'normal'
      })
    }
    
  }
  
  render(){
    const hasCameraPermission = this.state.hasCamPermission;
    const scanned = this.state.scanned
    const buttonState = this.state.buttonState
    if(buttonState !== 'normal' && hasCameraPermission){
      return(
        <View>
      
          <BarCodeScanner 
            onBarCodeScanned= {scanned ? undefined : this.handleBarcodeScan} 
          />
        </View>
      );
    }
    
    else if(buttonState === 'normal'){
      return (
        <View style={styles.container}>
          <View>
            <Image
              source={
                require('../assets/Barcode-scanner.jpg')
              }              
              style={{width:200,height:200}}
            />
          </View>

          <View style={styles.inputView}>
            <TouchableOpacity  style={styles.scanButton} onPress={()=>{
              this.getCameraPermission("BookID")
            }}>
              <Text  style={styles.buttonText}>
                Scan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        );
    }
    


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayText:{
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  scanButton:{
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10
  },
  buttonText:{
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10
  },
  inputView:{
    flexDirection: 'row',
    margin: 20
  },
  inputBox:{
    width: 200,
    height: 40,
    borderWidth: 1.5,
    borderRightWidth: 0,
    fontSize: 20
  },
  scanButton:{
    backgroundColor: '#66BB6A',
    width: 50,
    borderWidth: 1.5,
    borderLeftWidth: 0
  }
});
