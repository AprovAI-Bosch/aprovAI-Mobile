import { useEffect, useState, useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import ml from '@react-native-firebase/ml-vision';
import axios from "axios";

export default function Main() {
  const devices = useCameraDevices();
  const camera = useRef(null);
  const [text, setText] = useState('');
  const [photoPath, setPhotoPath] = useState('');
  const [hasPermission, setHasPermission] = useState(false);

  console.log('--- Diagnóstico ---');
  console.log('Permissão concedida?', hasPermission);
  console.log('Dispositivo de câmera disponível?', device != null);
  console.log('-------------------');

  useEffect(() => {
    async function getPermission() {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert('Permissão da câmera negada!', 'O aplicativo precisa de acesso à câmera para funcionar.');
      }
    }
    getPermission();
  }, []);

  const device = devices?.back;

  const send = async (dados) => {
    if(dados) {
      try {
        // Substitua 'SEU_IPV4' pelo IP do seu servidor
        const response = await axios.post('http://192.168.15.46:3000/upload', { text: dados });
        console.log("Resposta do servidor:", response.data);
        Alert.alert('Sucesso!', JSON.stringify(response.data));
      } catch (error) {
        console.log("Erro:", error);
        Alert.alert('Erro ao conectar', 'Erro ao conectar com o servidor. Verifique o IP e a conexão.');
      }
    }
  };

  const TextRecognition = async () => {
    if (!camera.current) {
        Alert.alert('Erro', 'Câmera não está pronta.');
        return;
    }

    try {
      const photo = await camera.current.takePhoto();
      setPhotoPath(photo.path); 
      const result = await ml().textRecognizerProcessImage(photo.path);
      
      if (result.text) {
        setText(result.text);
        send(result.text);
      } else {
        setText('Nenhum texto encontrado.');
      }
    } catch (error) {
      console.log("Erro ML Kit ou ao tirar foto:", error);
      setText('Erro ao reconhecer texto.');
      Alert.alert('Erro', 'Ocorreu um erro ao processar a imagem.');
    }
  };

  if ( hasPermission === false || device == null) {
    return <View style={styles.container}><Text>Aguardando permissão da câmera ou carregando...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        photo={true}
        isActive={true}
      />

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={TextRecognition}>
          <Text style={styles.buttonText}>Reconhecer Texto</Text>
        </TouchableOpacity>
        <Text style={styles.recognizedText}>Texto reconhecido: {text}</Text>
        {photoPath !== '' && <Text style={styles.photoPath}>Última foto: {photoPath}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  controls: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  recognizedText: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  photoPath: {
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
    fontSize: 12,
  },
});