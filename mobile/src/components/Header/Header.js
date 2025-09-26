import { View, Image } from "react-native"
import styles from "./HeaderStyles"

export default function Header() {
    return (
        <View style={styles.logoContainer}>
            <Image source={require('../../images/top-logo.png')} style={styles.topLogo} />
        </View>
    )

}