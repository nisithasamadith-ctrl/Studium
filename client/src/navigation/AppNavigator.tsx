import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { TasksScreen } from '../screens/TasksScreen';
import { FocusScreen } from '../screens/FocusScreen';
import { AIToolsScreen } from '../screens/AIToolsScreen';
import { FriendsScreen } from '../screens/FriendsScreen';
import { AddFriendScreen } from '../screens/AddFriendScreen';
import { CalendarScreen } from '../screens/CalendarScreen';
import { StatsScreen } from '../screens/StatsScreen';
// Import other screens as placeholders for now if they don't exist, 
// or just don't add them to navigator yet.
// For now, I'll create dummy components inline or just omit them until created.

const Stack = createStackNavigator();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Tasks" component={TasksScreen} />
                <Stack.Screen name="Focus" component={FocusScreen} />
                <Stack.Screen name="AITools" component={AIToolsScreen} />
                <Stack.Screen name="Friends" component={FriendsScreen} />
                <Stack.Screen name="AddFriend" component={AddFriendScreen} />
                <Stack.Screen name="Calendar" component={CalendarScreen} />
                <Stack.Screen name="Stats" component={StatsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
