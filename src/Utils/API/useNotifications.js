import { useState, useEffect } from "react";
import { auth, database, ref, set, get } from "../../Utils/firebase";

const useNotifications = (profileKey) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllNotifications = async () => {
    try {
      setLoading(true);
      if (!auth.currentUser || !profileKey) {
        // Handle the case when the user or profile is not authenticated
        return;
      }

      const userNotificationsRef = ref(
        database,
        `profiles/${auth.currentUser.uid}/userProfiles/${profileKey}/user_notification`
      );
      const snapshot = await get(userNotificationsRef);

      if (snapshot.exists()) {
        const notificationsData = snapshot.val();
        setNotifications(notificationsData || []); // Set an empty array if data is null
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial notifications when the component mounts or profile changes
    // Periodically check for updates in the database
    const intervalId = setInterval(() => {
      fetchAllNotifications();
    }, [1000]);

    // Clean up the interval when the component unmounts or profile changes
    return () => {
      clearInterval(intervalId);
    };
  }, [profileKey]);

  const addNotification = async (data, title, date, to) => {
    try {
      if (!auth.currentUser || !profileKey) {
        // Handle the case when the user or profile is not authenticated
        return;
      }

      const userNotificationsRef = ref(
        database,
        `profiles/${auth.currentUser.uid}/userProfiles/${profileKey}/user_notification`
      );

      // Fetch the current notifications
      const currentNotifications = [...notifications];

      // Update the notifications in the database
      await set(userNotificationsRef, [
        ...currentNotifications,
        { data, title, date, to },
      ]);

      // Update the notifications locally
      setNotifications([...currentNotifications, { data, title, date, to }]);
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  return { notifications, addNotification, loading };
};

export default useNotifications;
