import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainButton: {
    backgroundColor: "#EDEDEE",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 10,
  },
  mainButtonText: {
    color: "#fff",
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
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: '#000000'
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
  },
  cancelText: {
    color: "#ff3333",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default styles;