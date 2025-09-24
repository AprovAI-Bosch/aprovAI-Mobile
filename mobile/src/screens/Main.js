import { View, } from "react-native"
import styles from "../styles/MainStyle"
import ImagePickerModal from "../components/CatchPhotos/index"
import Header from "./Header"
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