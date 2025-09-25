import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6EEFA",
        paddingHorizontal: 16,
        justifyContent: 'flex-start',
    },

    containerGroup: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 10,
    },

    containerPhoto: {
        backgroundColor: "#E5DDE9",
        borderRadius: 10,
        height: height * 0.1,
        marginVertical: 10,
    },

    carousel: {
        flexDirection: 'row',
        marginVertical: 10,
    },

    photos: {
        width: width * 0.4,
        height: width * 0.4,
        marginHorizontal: 5,
        borderRadius: 10,
        resizeMode: 'cover',
    },

    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },

    mainButton: {
        backgroundColor: "#E5DDE9",
        width: width * 0.27,
        height: height * 0.07,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    galleryButton: {
        backgroundColor: "#E5DDE9",
        width: width * 0.27,
        height: height * 0.07,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    sendButton: {
        backgroundColor: '#FC4141',
        width: width * 0.3,
        height: height * 0.07,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconCamera: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalContainer: {
        padding: 20,
        borderRadius: 12,
        width: "90%",
        backgroundColor: "#333",
        alignItems: "center",
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        color: '#fff'
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginVertical: 10,
    },

    roundButton: {
        backgroundColor: "#4a90e2",
        width: 140,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
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
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default styles;