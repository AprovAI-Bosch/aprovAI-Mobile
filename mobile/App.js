import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import styles from './AppStyle';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Seja Bem Vindo!</Text>
      <Text style={styles.subTitle}>Venha testar nossa aplicação!</Text>

      
    </View>
  );
}
