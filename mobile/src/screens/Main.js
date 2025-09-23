import React, { useState } from 'react'
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  ScrollView,
} from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import ml from '@react-native-firebase/ml-vision'
import axios from 'axios'

export default function Main() {
  const [images, setImages] = useState([]) // array de {uri, text}

  // Permissão para câmera
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permissão para usar a câmera',
            message: 'O app precisa de acesso à sua câmera',
            buttonNeutral: 'Perguntar depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
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

  // Processa múltiplas imagens de uma vez
  const processImages = async (uris) => {
    const results = []
    for (const uri of uris) {
      try {
        const mlResult = await ml().textRecognizerProcessImage(uri)
        const text = mlResult.text || 'Nenhum texto encontrado'
        results.push({ uri, text })
      } catch (err) {
        results.push({ uri, text: 'Erro ao processar imagem' })
        console.log('Erro ML Kit:', err)
      }
    }

    // Atualiza o array de imagens
    setImages((prev) => [...prev, ...results])

    // Envia todos os textos para o servidor em uma única requisição
    const allTexts = results.map((r) => r.text)
    sendAllToServer(allTexts)
  }

  // Envia todos os textos para o servidor
  const sendAllToServer = async (texts) => {
    if (texts.length === 0) return
    try {
      const response = await axios.post('http://192.168.15.46:3000/upload', {
        tests: texts,
      })
      console.log('Resposta do servidor:', response.data)
      Alert.alert('Sucesso', JSON.stringify(response.data))
    } catch (error) {
      console.log('Erro ao enviar para o servidor:', error)
      Alert.alert('Erro', 'Erro ao conectar com o servidor')
    }
  }

  // Abrir câmera (uma foto de cada vez, mas depois podemos agrupar)
  const openCamera = async () => {
    const hasPermission = await requestCameraPermission()
    if (!hasPermission) {
      Alert.alert('Permissão negada para acessar a câmera')
      return
    }

    launchCamera(
      { mediaType: 'photo', saveToPhotos: true },
      async (response) => {
        if (!response.didCancel && !response.errorCode) {
          const uri = response.assets.map((a) => a.uri) // array de URIs
          await processImages(uri)
        }
      }
    )
  }

  // Abrir galeria
  const openGallery = async () => {
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 0 },
      async (response) => {
        if (!response.didCancel && !response.errorCode) {
          const uris = response.assets.map((a) => a.uri) // array de URIs
          await processImages(uris)
        }
      }
    )
  }

  return (
    <View style={styles.container}>
      <Button title="Abrir Câmera" onPress={openCamera} />
      <Button title="Abrir Galeria" onPress={openGallery} />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scroll: {
    marginTop: 20,
  },
  imageContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
})