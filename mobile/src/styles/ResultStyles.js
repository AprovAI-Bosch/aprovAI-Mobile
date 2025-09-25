import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff", // ou outra cor que queira
    },

    text: {
        color: '#000',
        fontSize: 15,
    },

    numberQuestions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },

    rowRightWrong: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },

    blockRight: {
        alignItems: 'center',
    },

    blockWrong: {
        alignItems: 'center',
    },

    average: {
        alignItems: 'center',
        marginVertical: 10,
    },

    containerQuestions: {
        flexGrow: 1,
        marginVertical: 10,
    },

    questions: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },

    questionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    correct: {
        color: 'green',
        fontSize: 18,
        marginBottom: 5,
    },

    incorrect: {
        color: 'red',
        fontSize: 18,
        marginBottom: 5,
    },

    feedback: {
        fontSize: 14,
        color: '#333',
    },

    seenButton: {
        backgroundColor: '#FC4141',
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 10,
    },

    seenText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default styles;