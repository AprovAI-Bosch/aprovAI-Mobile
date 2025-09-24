import React, { useState } from "react"
import { View, ScrollView, Image, Text, PermissionsAndroid, Platform, Alert, Dimensions } from "react-native"
import MLKitOCR from "react-native-mlkit-ocr"
import axios from "axios"
import styles from "../styles/MainStyle"
import ImagePickerModal from "../components/CatchPhotos/index"

export default function Main() {
  const [images, setImages] = useState([])

  // Solicita permissão para usar câmera (Android)
  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Permissão para usar a câmera",
            message: "O app precisa de acesso à sua câmera",
            buttonNeutral: "Perguntar depois",
            buttonNegative: "Cancelar",
            buttonPositive: "OK",
          }
        )
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
        return false
      }
    }
    return true
  }

  // Processa imagens e salva {uri, texto}
  const processImages = async (uris) => {
    for (let uri of uris) {
      try {
        const visionResp = await MLKitOCR.detectFromFile(uri)
        const text =
          visionResp.length > 0
            ? visionResp.map((b) => b.text).join(" ")
            : "Nenhum texto encontrado"

        setImages((prev) => [...prev, { uri, text }])

        // Envia para servidor
        await sendAllToServer([text])
      } catch (err) {
        console.log("Erro OCR:", err)
        setImages((prev) => [...prev, { uri, text: "Erro ao processar imagem" }])
      }
    }
  }

  // Envia os textos para o servidor
  const sendAllToServer = async (texts) => {
    if (texts.length === 0) return
    try {
      const response = await axios.post("http://192.168.15.46:3000/upload", { tests: texts })
      console.log("Resposta do servidor:", response.data)
      Alert.alert("Sucesso", JSON.stringify(response.data))
    } catch (error) {
      console.log("Erro ao enviar para o servidor:", error)
      Alert.alert("Erro", "Erro ao conectar com o servidor")
    }
  }

  return (
    <View style={styles.container}>
      {/* Botão de captura (com modal) */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/top-logo.png')} style={styles.topLogo}/>
      </View>
      
      {/* ImagePicker relacionado ao index.js do CatchPhotos */}
      <ImagePickerModal
        requestCameraPermission={requestCameraPermission}
        processImages={processImages}
      />

      {/* Lista de imagens + textos */}
      <ScrollView style={styles.scroll}>
        {images.map((item, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}