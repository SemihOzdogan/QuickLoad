import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserList from './src/screens/UserList';
import UserDetail from './src/screens/UserDetail';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={UserList} options={{ title: 'User List', headerTitleAlign: 'center', headerLeft: null, }} />
        <Stack.Screen
          name="Detail"
          component={UserDetail}
          options={({ navigation }) => ({
            title: '',
            headerLeft: () => (<View></View>),
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <View>
                  <Icon name="chevron-left" size={25} style={{ padding: 10 }} />
                </View>
                <View>
                  <Text style={{ justifyContent: 'center' }}>Back</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        />
      </Stack.Navigator>
    </NavigationContainer >
  );
}