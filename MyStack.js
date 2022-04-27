
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CartScreen from './screens/CartScreen';
import SettingsScreen from "./screens/SettingScreen";

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
        </NavigationContainer>
        );
    };
    
    export default MyStack;