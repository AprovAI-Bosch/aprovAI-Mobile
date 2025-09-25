import { StyleSheet, Dimensions } from "react-native"

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6EEFA",
    padding: 10,
  },

  logoContainer: {
    justifyContent:'center',
    alignItems: 'center',
    marginTop: screenHeight*0.02
    
  },

  topLogo: {
    width: screenWidth * 0.9,
    height: 100,
    aspectRatio: 1,
    resizeMode: 'contain',
  },

})

export default styles;