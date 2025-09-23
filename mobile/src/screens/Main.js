import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function Main() {
  const [imageUri, setImageUri] = useState(null);

  // Solicita permissão no Android
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
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permissão negada para acessar a câmera');
      return;
    }

    launchCamera(
      { mediaType: 'photo', saveToPhotos: true },
      (response) => {
        if (response.didCancel) {
          console.log('Usuário cancelou');
        } else if (response.errorCode) {
          console.log('Erro: ', response.errorMessage);
        } else {
          const uri = response.assets[0].uri;
          setImageUri(uri);
        }
      },
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      { mediaType: 'photo' },
      (response) => {
        if (response.didCancel) {
          console.log('Usuário cancelou');
        } else if (response.errorCode) {
          console.log('Erro: ', response.errorMessage);
        } else {
          const uri = response.assets[0].uri;
          setImageUri(uri);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Abrir Câmera" onPress={openCamera} />
      <Button title="Abrir Galeria" onPress={openGallery} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },
});