import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    iconCamera: {
        width: 30,
        height: 30,
    },
   containerGroup:{
    display:'flex',
    maxWidth:500,
    marginTop: 300,
   },
    containerPhoto:{
        backgroundColor: "#E5DDE9",
        paddingVertical: 10,
        borderRadius: 10,
    },
    carousel:{
        flexDirection:'row',
        marginTop:10,
        marginBottom:10
    },
    photos:{
        width:150,
        height:300,
        marginLeft:10,
        resizeMode:'stretch',
        aspectRatio:1,
        borderRadius:10,

    },
    containerButton:{
        flexDirection:'row'
    },
    mainButton: {
        backgroundColor: "#E5DDE9",
        marginTop:10,
        width:250,
        height:80,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "flex-start",
        
    },
    mainButtonText: {
        color: "#000000ff",
        fontSize: 16,
        fontWeight: "bold",
    },
    sendButton:{
        backgroundColor:'#FC4141',
        width:130,
        height:80,
        marginLeft:10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "flex-end",

    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        padding: 10,
        borderRadius: 12,
        margin: 20,
        width: "100%",
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        color: '#ffffffff'
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginVertical: 10,
    },
    roundButton: {
        backgroundColor: "#4a90e2",
        width: 150,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        marginTop: 5,
        fontWeight: "bold",
        textAlign: "center",
    },
    cancelButton: {
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#CA3434',
        borderRadius: 10,
    },
    cancelText: {
        color: "#ffffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
})

export default styles;