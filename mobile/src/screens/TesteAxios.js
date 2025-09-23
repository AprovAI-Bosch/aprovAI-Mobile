import axios from "axios"
import { useState } from "react";
import { Text,TouchableOpacity,View,TextInput, StyleSheet} from "react-native";

export default function TesteAxios(){

 const [textInput,setTextInput] = useState('');
const dados = {
    test: textInput
};

const send = () =>{
    if(dados!= ''){

        axios.post('http://ipv4:3000/upload', dados)// coloque seu ipv4 aqui
        .then(response => {
            console.log("Resposta do servidor:", response.data);
            alert(JSON.stringify(response.data));
        })
        .catch(error => {
            console.log("Erro:", error);
            alert('Erro ao conectar com o servidor')
        });
    }
}

    return(
        <View>
            
            <View style={styles.inputView}>
                <TextInput
                onChangeText={setTextInput}
                value={textInput}
                placeholder="Digite aqui seu texto"
                style={styles.input}
                />

            </View>


            <View>
                <TouchableOpacity onPress={send} style={styles.btn}>
                    <Text> Enviar texto</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    inputView:{
        marginTop: '50%'
    },
    input:{
        backgroundColor: 'red'
    },
    btn:{
        width:'50%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#30b516ff',
        marginTop:50,
        marginLeft:80
    }
})