import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    iconCamera: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
    },

    mainButton: {
        backgroundColor: "#EDEDEE",
        paddingVertical: 50,
        paddingHorizontal: 70,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 300,
    },
    mainButtonText: {
        color: "#000000ff",
        fontSize: 16,
        fontWeight: "bold",
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