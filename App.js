import { StatusBar } from 'expo-status-bar';

import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableHighlight, TouchableOpacity} from 'react-native';
import socket from "socket.io-client"


export default function App() {
  const url = "http://10.100.98.138:4000/"
  const io = socket(url)


  const [modalVisible, setModalVisible] = useState(false)
  const [title, setTitle] = useState("")
  const [id, setId] = useState()

  const sendRes = (res) =>{
    console.log("teste", res)
    io.emit("resNotify", res)
  }

  io.on("Accepted", (req) => {

  })

  io.on("notify", (req) =>{
    console.log("notificaçao")
    console.log(req)
    setTitle(req.title)
    setId(req.id)
    console.log(req.title, req.id)
    setModalVisible(true)
  })

 

  return (
    <View style={styles.container}>
      <Text>TESTE</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <Text style={{...styles.modalText, fontSize: 15,}}>{id}</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{...styles.button, borderColor: "#05C46B"}}
                onPress={() => {
                  sendRes(true)
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={{...styles.textStyle,color: "#05C46B"}}>Aceitar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...styles.button, borderColor: "#FF3F34"}}
                onPress={() => {
                  sendRes(false)
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={{...styles.textStyle,color: "#FF3F34"}}>Rejeitar</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  button:{
    flex:1 ,
    height: 50,
    borderRadius: 15,
    margin:5, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
    borderWidth: 3,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    fontSize: 20,

    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize: 30,
    color: '#2F2D2D',
    marginBottom: 15,
    textAlign: "center"
  }
});

