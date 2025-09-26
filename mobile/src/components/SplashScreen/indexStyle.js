import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f1fcff', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: width * 1,
    height: height * 1,
  },
});

export default styles;