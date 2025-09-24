import Main from "./src/screens/Main";
import Result from './src/screens/Result'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
// import TesteAxios from "./src/screens/TesteAxios";
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="Result" component={Result}/>
      </Stack.Navigator>
    </NavigationContainer>

    // <TesteAxios />
  );
}


