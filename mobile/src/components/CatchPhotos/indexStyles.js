import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    iconCamera: {
        width: 30,
        height: 30,
    },
   containerGroup:{
    display:'flex',
    maxWidth:windowWidth,
    marginTop: windowHeight*0.25,
   },
    containerPhoto:{
        backgroundColor: "#E5DDE9",
        paddingVertical: 10,
        borderRadius: 10,
        minHeight:windowWidth*0.51,
    },
    carousel:{
        flexDirection:'row',
        marginTop:10,
        marginBottom:10
    },
    photos:{
        width:windowWidth*0.41,
        marginLeft:windowWidth*0.02,
        marginRight: windowWidth*0.03,
        resizeMode:'stretch',
        aspectRatio:1,
        borderRadius:10,
    },
    containerButton:{
        flexDirection:'row'
    },
    mainButton: {
        backgroundColor: "#E5DDE9",
        marginTop:windowHeight*0.02,
        width:windowWidth*0.61,
        height:windowHeight*0.1,
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
        width:windowWidth*0.32,
        height:windowHeight*0.1,
        marginLeft:windowWidth*0.03,
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