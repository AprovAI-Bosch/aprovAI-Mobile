import { useEffect, useState, useRef } from "react";
import { View,TouchableOpacity,Text } from "react-native";
import { Camera,useCameraDevices } from "react-native-vision-camera";
import { useTextRecognition } from 'react-native-text-recognition';

export default function Main (){
    const devices = useCameraDevices();
    const camera = useRef(null);
    const [text, setText] = useState('');
    const device = devices.back;

    const {recognize} = useTextRecognition();
    

    useEffect(() =>{
        async function getPermission(){
            const permission = await Camera.requestCameraPermission();
            console.log(`Permission Status: ${permission} `)
        }
        getPermission();
    }, [])
    
    const TextRecognition= async ()=>{
        if(camera.current){
            const photo = await camera.current.takePhoto();
            const result = await recognize(photo.path);
            if(result && result.text){
                setText(result.text);
            }else{
            setText('No Data');
            }
        }
    }
    const erro = () =>{
        return <Text>Alguma coisa deu errado..</Text>
    }
    if(device == null){
        return <Text>Carregando a camera..</Text>
    }
    return(
        <View>
            <Camera
            ref={camera}
            // style{}
            device={device}
            photo={true}
            isActive={true}
            onError={erro}
            photoHdr={true}
            preview={true}
            resizeMode="contain"
            />
            <View>
                <TouchableOpacity onPress={TextRecognition}>
                    <Text> Reconhecer Texto</Text>
                </TouchableOpacity>
            </View>
            <View>{text}</View>
        </View>
    )
};