import React, { useState } from 'react'
import {useNavigation} from '@react-navigation/native'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  ScrollView,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import styles from './indexStyles'
import MLKitOCR from 'react-native-mlkit-ocr'
import axios from 'axios'
import Header from '../Header/Header';

export default function ImagePickerModal() {
  const navigation = useNavigation();

  const [images, setImages] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  // Solicita permissão para usar câmera (Android)
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

  // Processa imagens e salva {uri, texto}
  const processImages = async function (uris) {
    for (let uri of uris) {
      try {
        const visionResp = await MLKitOCR.detectFromFile(uri)
        const text =
          visionResp.length > 0
            ? visionResp.map((b) => b.text).join(' ')
            : 'Nenhum texto encontrado'

        setImages((prev) => [...prev, { uri, text }])
      } catch (err) {
        console.log('Erro OCR:', err)
        setImages((prev) => [
          ...prev,
          { uri, text: 'Erro ao processar imagem' },
        ])
      }
    }
  }

  // Envia os textos para o servidor
  const sendAllToServer = async (texts) => {
    if (texts.length === 0) return
    try {
      setLoading(true)
      const response = await axios.post('http://192.168.15.46:3000/upload', {
        tests: texts,
      });
      console.log('Resposta do servidor:', response.data)

      navigation.navigate('Result', {result: response.data});
      Alert.alert('Sucesso', JSON.stringify(response.data))
    } catch (error) {
      console.log('Erro ao enviar para o servidor:', error)
      Alert.alert('Erro', 'Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  const Send = () => {
    if (images.length === 0) {
      Alert.alert(
        'Nenhuma imagem selecionada',
        'Selecione pelo menos uma imagem antes de enviar.'
      )
      return
    }
    const texts = images.map((img) => img.text)
    console.log('Enviando para servidor:', texts)
    sendAllToServer(texts)
  }

  const handleOpenCamera = async () => {
    setModalVisible(false)
    const hasPermission = await requestCameraPermission()
    if (!hasPermission) {
      Alert.alert('Permissão negada para acessar a câmera')
      return
    }

    launchCamera(
      { mediaType: 'photo', saveToPhotos: true },
      async (response) => {
        if (!response.didCancel && !response.errorCode) {
          const uris = response.assets.map((a) => a.uri)
          await processImages(uris)
        }
      }
    )
  }

  const handleOpenGallery = async () => {
    setModalVisible(false)
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 0 },
      async (response) => {
        if (!response.didCancel && !response.errorCode) {
          const uris = response.assets.map((a) => a.uri)
          await processImages(uris)
        }
      }
    )
  }

  return (
    <View style={styles.container}>
     
      <View style={styles.containerGroup}>
        <ScrollView style={styles.containerPhoto} horizontal={true}>
          {images.map((item, index) => (
            <View key={index} style={styles.carousel}>
              <Image source={{ uri: item.uri }} style={styles.photos} />
              <Text style={styles.buttonText}>{item.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => handleOpenCamera()}
          >
            <Image
              source={require('../../../assets/icon-camera.png')}
              style={styles.iconCamera}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.galleryButton}
            onPress={() => handleOpenGallery()}
          >
            <Image 
            source={require('../../../assets/icon-gallery.png')}
            style={styles.iconCamera}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sendButton} onPress={Send}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Image source={require('../../../assets/send.png')} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Escolha uma opção</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.roundButton}
                onPress={handleOpenCamera}
              >
                <Text style={styles.buttonText}>Abrir Câmera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.roundButton}
                onPress={handleOpenGallery}
              >
                <Text style={styles.buttonText}>Abrir Galeria</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}
