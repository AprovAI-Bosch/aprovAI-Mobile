import { View, Text, ScrollView, TouchableOpacity, Modal, Image } from "react-native";
import { useState } from "react";
import Header from '../components/Header/Header';
import styles from '../styles/ResultStyles';

export default function Result({ route, navigation }) {

    const { result } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const openModal = (q) => {
        setSelectedQuestion(q);
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
        setSelectedQuestion(null);
    }

    return (
        <View style={styles.container}>
            <Header />

            {/* Número de questões */}
            <View style={styles.numberQuestions}>
                <Text style={styles.textQuestions}>N° Questões</Text>
                <Text style={styles.textQuestions}>{result.total_questoes}</Text>
            </View>

            {/* Acertos e erros */}
            <View style={styles.rowRightWrong}>
                <View style={styles.blockRight}>
                    <Text style={{ fontSize: 50, marginLeft: 10, marginBottom: 10 }}>
                        {result.questoes.filter(q => q.correta).length}
                    </Text>
                    <Text style={{ fontSize: 15, marginLeft: 10 }}>acertos</Text>
                </View>
                <View style={styles.blockWrong}>
                    <Text style={{ fontSize: 50, marginLeft: 10, marginBottom: 10 }}>
                        {result.questoes.filter(q => !q.correta).length}
                    </Text>
                    <Text style={{ fontSize: 15, marginLeft: 10 }}>erros</Text>
                </View>
            </View>

            {/* Média */}
            <View style={styles.average}>
                <Text style={{ color: '#ffffff', marginLeft: 14, fontWeight: 'bold' }}>Média</Text>
                <Text style={{ color: '#ffffff', marginRight: 14, fontWeight: 'bold' }}>
                    {result.media_perguntas}
                </Text>
            </View>

            {/* Lista de questões */}
            <ScrollView style={styles.containerQuestions}>
                {result.questoes.map((q, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.questions}
                        onPress={() => openModal(q)}
                    >
                        <Text style={styles.questionTitle}>Questão {q.questao}</Text>
                        <Image style={q.correta ? styles.correct : styles.incorrect} source={q.correta ? require('../images/correct.png') : require('../images/wrong.png')} />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Botão de conclusão */}
            <View style={styles.btnConclusion}>
                <TouchableOpacity style={styles.seenButton} onPress={() => navigation.navigate('Main')}>
                    <Text style={styles.seenText}> Visto </Text>
                </TouchableOpacity>
            </View>

            {/* Modal com fundo escuro */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        {selectedQuestion && (
                            <>
                                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                    <Image source={require('../images/close.png')} style={styles.iconClose} />
                                </TouchableOpacity>
                                <ScrollView>
                                    <Text style={styles.modalText}><Text style={{ fontWeight: 'bold' }}>Pergunta:</Text> {selectedQuestion.pergunta}</Text>
                                    <Text style={styles.modalText}><Text style={{ fontWeight: 'bold' }}>Resposta:</Text> {selectedQuestion.resposta}</Text>
                                    {selectedQuestion.feedback && (
                                        <Text style={styles.modalText}><Text style={{ fontWeight: 'bold' }}>Feedback:</Text> {selectedQuestion.feedback}</Text>
                                    )}
                                </ScrollView>

                            </>
                        )}
                    </View>
                </View>
            </Modal>

        </View>
    )
}