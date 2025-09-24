import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Alert,
    Image,
    ScrollView
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import styles from './indexStyles';
import MLKitOCR from "react-native-mlkit-ocr"
import axios from "axios"
import { Platform, PermissionsAndroid } from 'react-native'


export default function ImagePickerModal() {
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
  const processImages = async function (uris){
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

    //!       parte do modal
    
    const [modalVisible, setModalVisible] = useState(false)

    const handleOpenCamera = async () => {
        setModalVisible(false)
        const hasPermission = await requestCameraPermission()
        if (!hasPermission) {
            Alert.alert("Permissão negada para acessar a câmera")
            return
        }

        launchCamera(
            { mediaType: "photo", saveToPhotos: true },
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
            { mediaType: "photo", selectionLimit: 0 },
            async (response) => {
                if (!response.didCancel && !response.errorCode) {
                    const uris = response.assets.map((a) => a.uri)
                    await processImages(uris)
                }
            }
        )
    }

    return (
        <View>

                {/* <TouchableOpacity
                    style={styles.mainButton}
                    onPress={() => setModalVisible(true)}
                    >
                    <Image source={require('../../../assets/icon-camera.png')} style={styles.iconCamera}/>
                    <Text style={styles.mainButtonText}>Upload da Prova</Text>
                </TouchableOpacity> */}

            <View style={styles.containerGroup}>

                <ScrollView style={styles.containerPhoto} horizontal={true}>
                    <View style={styles.carousel}>

                        {images.map((item, index) => (
                                  <View key={index}>
                                    <Image source={{ uri: item.uri }} style={styles.photos} />
                                    {/* <Text style={styles.text}>{item.text}</Text> */}
                                  </View>
                                ))}
                        <Image
                            style={styles.photos}
                        />
                    </View>
                        
                </ScrollView>
                <View style={styles.containerButton}>

                        <TouchableOpacity
                            style={styles.mainButton}
                            onPress={() => setModalVisible(true)}
                            >
                            <Image source={require('../../../assets/icon-camera.png')} style={styles.iconCamera}/>
                            
                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={styles.sendButton}
                        onPress={() => processImages(images.map(img => img.uri))}
                        >
                            <Image source={require('../../../assets/send.png')}/>
                        </TouchableOpacity>
                        </View>
                        </View>
                
            

           

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
              {/* {selectedImage && (
                <Image
                    source={{ uri: selectedImage }}
                    style={{ width: 200, height: 200, marginTop: 20 }}
                />
  )} */}

          
        </View>
    )
}