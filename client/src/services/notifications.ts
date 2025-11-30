import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export async function requestNotificationPermissions() {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
}

export async function scheduleDeadlineNotification(title: string, dueDate: Date) {
    const now = new Date();
    const timeUntilDue = dueDate.getTime() - now.getTime();

    const oneDayBefore = timeUntilDue - (24 * 60 * 60 * 1000);

    if (oneDayBefore > 0) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Deadline Reminder',
                body: `${title} is due tomorrow!`,
                data: { title },
            },
            trigger: {
                type: 'timeInterval',
                seconds: Math.floor(oneDayBefore / 1000),
            } as any,
        });
    }
}
