import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import styles from '../styles/ResultStyles';

export default function Result({ dados, navigation }) {

    const { result } = dados.params;

    return (
        <View style={styles.container}>

            <View style={styles.numberQuestions}>
                <Text style={styles.textQuestions}>N° Questões</Text>
                <Text style={styles.textQuestions}>{result.total_questoes}</Text>
            </View>
            <View style={styles.rowRightWrong}>
                <View style={styles.blockRight}>
                    <Text style={{ fontSize: 50, marginLeft: 10, marginBottom: 10, }}>{result.questoes.filter(q => q.correta).length}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10 }}>acertos</Text>
                </View>
                <View style={styles.blockWrong}>
                    <Text style={{ fontSize: 50, marginLeft: 10, marginBottom: 10 }}>{result.questoes.filter(q => !q.correta).length}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10 }}>erros</Text>
                </View>
            </View>
            <View style={styles.average}>
                <Text style={{ color: '#ffffff', marginLeft: 14, fontWeight: 'bold' }}>Média</Text>
                <Text style={{ color: '#ffffff', marginRight: 14, fontWeight: 'bold' }}>{result.media_perguntas}</Text>
            </View>
            <ScrollView style={styles.containerQuestions}>
                {result.questoes.map((q, index) => (
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
            <View style={styles.btnConclusion}>
                <TouchableOpacity style={styles.seenButton} onPress={() => navigation.navigate('Main')}>
                    <Text style={styles.seenText}> Visto </Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}