import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Header from "../components/Header/Header";
import styles from '../styles/ResultStyles';

export default function Result({ route }) {

    const { resultData } = route.params;

    <View style={styles.container}>
        <Header />
        <View style={styles.numberQuestions}>
            <Text style={styles.text}>N° Questões</Text>
            <Text style={styles.text}>{resultData.total_questoes}</Text>
        </View>
        <View style={styles.rowRightWrong}>
            <View style={styles.blockRight}>
                <Text style={{ fontSize: 30 }}>{resultData.questoes.filter(q => q.correta).length}</Text>
                <Text style={{ fontSize: 10 }}>acertos</Text>
            </View>
            <View style={styles.blockWrong}>
                <Text style={{ fontSize: 30 }}>{resultData.questoes.filter(q => !q.correta).length}</Text>
                <Text style={{ fontSize: 10 }}>erros</Text>
            </View>
        </View>
        <View style={styles.average}>
            <Text style={styles.text}>Média</Text>
            <Text>{resultData.media_perguntas}</Text>
        </View>
        <ScrollView style={styles.containerQuestions}>
            {resultData.questoes.map((q, index) => (
                <View key={index} style={styles.questions}>
                    <Text style={styles.questionTitle}>Questão {q.questao}</Text>
                    <Text style={q.correta ? styles.correct : styles.incorrect}>
                        {q.correta ? "✔" : "✘"}
                    </Text>
                    {q.feedback ? (
                        <Text style={styles.feedback}>{q.feedback}</Text>
                    ) : null}
                </View>
            ))}
        </ScrollView>
        <TouchableOpacity style={styles.seenButton}>
            <Text style={styles.seenText}> Visto </Text>
        </TouchableOpacity>
    </View>

}