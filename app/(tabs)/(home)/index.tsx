import HomeView from "@/views/Home/HomeView";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { useLikesForUser } from "@/hooks/useLikesForUser";

export default function Home() {
    const { user } = useUser();
    const { likes } = useLikesForUser(user?.id);

    useEffect(() => {
        (async () => {
            await requestPermissionsAsync();
            await scheduleDailyNotification();
        })();

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });
    }, []);

    async function requestPermissionsAsync() {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
            alert(
                "Notification permissions are required to send notifications."
            );
        }
    }

    async function scheduleDailyNotification() {
        await Notifications.cancelAllScheduledNotificationsAsync();

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Hi! Don't forget to check your matches today!",
                body: `You have ${likes.length} new likes waiting for you! 🚀`,
                data: { customData: "value" },
            },
            trigger: null,
        });
    }

    return <HomeView />;
}
