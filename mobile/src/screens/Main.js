import { useEffect, useState, useRef } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import ml from '@react-native-firebase/ml-vision';
import axios from "axios";

export default function Main() {
  const devices = useCameraDevices();
  const camera = useRef(null);
  const [text, setText] = useState('');
  const [photoPath, setPhotoPath] = useState('');
  const device = devices.back;

  useEffect(() => {
    async function getPermission() {
      const permission = await Camera.requestCameraPermission();
      console.log(`Permission Status: ${permission}`);
    }
    getPermission();
  }, []);

  const send = async (dados) => {
    if(dados !== '') {
      try {
        const response = await axios.post('http://SEU_IPV4:3000/upload', { text: dados });
        console.log("Resposta do servidor:", response.data);
        alert(JSON.stringify(response.data));
      } catch (error) {
        console.log("Erro:", error);
        alert('Erro ao conectar com o servidor');
      }
    }
  };

  const TextRecognition = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      setPhotoPath(photo.path); // salva path da foto
      try {
        const result = await ml().textRecognizerProcessImage(photo.path);
        if (result.text) {
          setText(result.text);
          send(result.text);
        } else {
          setText('No Data');
        }
      } catch (error) {
        console.log("Erro ML Kit:", error);
        setText('Erro ao reconhecer texto');
      }
    }
  };

  const takePhotoTest = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      setPhotoPath(photo.path);
      alert('Foto tirada! Path: ' + photo.path);
    }
  };

  if (device == null) return <Text>Carregando a câmera...</Text>;

  return (
    <View>
        <Camera
            ref={camera}
            style={{ flex: 1 }}
            device={device}
            photo={true}
            isActive={true}
        />
        <TouchableOpacity onPress={TextRecognition}>
            <Text>Reconhecer Texto</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhotoTest}>
            <Text>Testar Câmera</Text>
        </TouchableOpacity>
        <Text>Texto reconhecido: {text}</Text>
        {photoPath !== '' && <Text> Última foto: {photoPath}</Text>}
    </View>
  );
}
