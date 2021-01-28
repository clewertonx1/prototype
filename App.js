import { StatusBar } from 'expo-status-bar';

import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import socket from "socket.io-client"


export default function App() {
  const url = "http://10.100.98.138:4000/"
  const io = socket(url)

  const [teste, setTeste] = useState(0)

  useEffect(() => {
    const io = socket(url)
    console.log(teste)
   
    io.emit("a", {a: "cabeça de htttp"});
  },[teste])

  io.on("brabo", (req) =>{
    console.log(req)
  })

 

  return (
    <View style={styles.container}>
      <Text>{teste}</Text>
      <Button title={"aaa"} onPress={() => {
         let a = teste + 1 
         setTeste(a)
      }}></Button>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
