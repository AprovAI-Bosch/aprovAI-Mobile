import React, { useState } from "react"
import { View, ScrollView, Image, Text, PermissionsAndroid, Platform, Alert } from "react-native"
import MLKitOCR from "react-native-mlkit-ocr"
import axios from "axios"
import styles from "../styles/MainStyle";
import ImagePickerModal from "../components/CatchPhotos/index"

export default function Main() {
  const [images, setImages] = useState([])

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

  const processImages = async (uris) => {
    const results = []

    for (let uri of uris) {
      try {
        const visionResp = await MLKitOCR.detectFromFile(uri)
        const text =
          visionResp.length > 0
            ? visionResp.map((b) => b.text).join(" ")
            : "Nenhum texto encontrado"
        results.push({ uri, text })
      } catch (err) {
        console.log("Erro OCR:", err)
        results.push({ uri, text: "Erro ao processar imagem" })
      }
    }

    setImages((prev) => [...prev, ...results])

    const allTexts = results.map((r) => r.text)
    sendAllToServer(allTexts)
  }

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
      <ImagePickerModal
        requestCameraPermission={requestCameraPermission}
        processImages={processImages}
      />

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