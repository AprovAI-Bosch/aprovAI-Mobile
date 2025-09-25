import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6EEFA",
        paddingHorizontal: 16,
    },

    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    topLogo: {
        width: width * 0.9,
        height: 100,
        resizeMode: 'contain',
    },
});

export default styles;