import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaViewBase, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'

export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync(); // ou requestCameraPermissionsAsync()
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Acesso negado!</Text>;
  }

  return (
    <SafeAreaViewBase style={styles.container}>
      <Camera style={{ flex: 1 }} type={type}>
        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )
            }}
          >
            <Text style={{ fontSize: 20, marginBottom: 13, color: '#FFF' }}>Trocar</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </SafeAreaViewBase>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
