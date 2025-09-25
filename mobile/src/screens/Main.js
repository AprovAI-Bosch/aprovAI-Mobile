import { View,Image } from "react-native"
import ImagePickerModal from "../components/CatchPhotos/index"
import Header from "../components/Header/Header"
import styles from '../styles/MainStyles';
export default function Main() {

  return (
    <View style={styles.container}>
      <Header />
      
      {/* ImagePicker relacionado ao index.js do CatchPhotos */}
      <ImagePickerModal
        // requestCameraPermission={requestCameraPermission}
        // processImages={processImages}
      />

      
    </View>
  )
}