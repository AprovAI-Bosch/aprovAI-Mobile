import Main from "./src/screens/Main";
import Result from './src/screens/Result'
import SplashScreen from './src/components/SplashScreen/'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
// import TesteAxios from "./src/screens/TesteAxios";
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
        <Stack.Screen name="Result" component={Result} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>

    // <TesteAxios />
  );
}


