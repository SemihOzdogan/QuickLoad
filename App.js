import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserList from './src/screens/UserList';
import UserDetail from './src/screens/UserDetail';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Stack = createNativeStackNavigator();

export default function App() {
  const { backButton, backText, backIcon } = styles;
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen
          name="List"
          component={UserList}
          options={{
            title: 'Kullanıcılar',
            headerTitleAlign: 'center',
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Detail"
          component={UserDetail}
          options={({ navigation }) => ({
            title: '',
            headerLeft: () => <View />,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={backButton}>
                <View>
                  <Icon name="chevron-left" size={25} style={backIcon} />
                </View>
                <View>
                  <Text style={backText}>Geri</Text>
                </View>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    justifyContent: 'center',
  },
  backIcon: {
    padding: 10,
  },
});
