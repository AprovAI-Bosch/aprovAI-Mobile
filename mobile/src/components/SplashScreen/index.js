import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import styles from './indexStyle';

export default function SplashScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento do app 
    const timer = setTimeout(() => {
      setLoading(false);
      navigation.replace('Main'); // redireciona para a tela principal
    }, 6500); // 6.5 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {loading && (
        <Image
          style={styles.gif}
          source={require('../../images/splash.gif')}
          resizeMode="contain"
        />
      )}
    </View>
  );
}