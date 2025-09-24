import { StyleSheet, Dimensions } from "react-native"

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6EEFA",
    padding: 10,
  },

  logoContainer: {
    justifyContent:'center',
    alignItems: 'center',
    marginTop: screenHeight*0.01
    
  },

  topLogo: {
    width: screenWidth * 0.9,
    height: 100,
    aspectRatio: 1,
    resizeMode: 'contain',
  },

  // imageContainer: {
  //   marginBottom: 20,
  //   alignItems: "center",
  //   backgroundColor: "#f7f7f7",
  //   borderRadius: 8,
  //   padding: 10,
  // },
  // image: {
  //   justifyContent: 'center',
  //   alignContent: 'center',
  //   width: 250,
  //   height: 250,
  //   resizeMode: "contain",
  //   borderRadius: 8,
  //   marginBottom: 10,
  // },
  // text: {
  //   fontSize: 14,
  //   color: "#333",
  //   textAlign: "center",
  // },
})