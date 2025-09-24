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

export default function ImagePickerModal({ requestCameraPermission, processImages }) {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)

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
                    setSelectedImage(uris[0])
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
                    setSelectedImage(uris[0])
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

                        {selectedImage && (
                                <Image
                                    source={{ uri: selectedImage }}
                                    style={styles.photos }
                                />
                        )}
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
                        onPress={() =>alert('sendAllToServer')}
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