import { StyleSheet, Dimensions } from "react-native";
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        
    },

    text: {
        color: '#000',
        fontSize: 15,
    },

    textQuestions: {
        color: '#000',
        margin: 10,
        fontWeight: 'bold',
    },

    numberQuestions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        height: height * 0.07,
        width: width * 0.83,
        backgroundColor: '#D1CBD5',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 15
    },

    rowRightWrong: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },

    blockRight: {
        backgroundColor: '#D1CBD5',
        alignItems: 'center',
        height: height * 0.15,
        width: width * 0.4,
        borderRadius: 15,
        alignItems: 'flex-start',
    },

    blockWrong: {
        backgroundColor: '#D1CBD5',
        alignItems: 'center',
        height: height * 0.15,
        width: width * 0.4,
        borderRadius: 15,
        alignItems: 'flex-start',
    },

    average: {
        height: height * 0.06,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#FC4141',
        borderRadius: 15,
    },

    containerQuestions: {
        // flexGrow: 1,
        borderRadius: 8,
        marginVertical: 5,
        backgroundColor: '#E5DEE9',
    },

    questions: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 15,
        marginHorizontal: 15,
        borderRadius: 8,
        backgroundColor: '#D1CBD5',
    },

    questionTitle: {
        fontSize: 16,
        marginBottom: 5,
    },

    correct: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5,
    },

    incorrect: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5,
    },

    btnConclusion: {
        position: 'absolute',
        bottom: 40,
        right: 0,
        left: 0,
        alignItems: 'center',
        marginBottom: 20,
    },

    seenButton: {
        width: width * 0.35,
        height: height * 0.08,
        backgroundColor: '#FC4141',
        paddingVertical: 12,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },

    seenText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 19,
    },
});

export default styles;