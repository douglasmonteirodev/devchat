import React from 'react';
import SignIn from '../pages/SignIn';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatRoom from '../pages/ChatRoom';
import Messages from './../pages/Messages/index';

const AppStack = createNativeStackNavigator();
export default function AppRoutes() {
  return (
    <AppStack.Navigator initialRouteName="ChatRoom">
      <AppStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: 'Faça login',
        }}
      />
      <AppStack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Messages"
        component={Messages}
        options={({route}) => ({
          title: route.params.thread.name,
        })}
      />
    </AppStack.Navigator>
  );
}
