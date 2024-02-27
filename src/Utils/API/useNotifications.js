// useNotifications.js
import { useState, useEffect } from 'react';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Periodically check for updates in local storage
    const intervalId = setInterval(() => {
      const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
      setNotifications(storedNotifications);
    }, 1000); // Adjust the interval based on your needs

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Dependency array is left empty to run only once when the component mounts

  const addNotification = (data, title, date, to) => {
    // Use the functional update form of setNotifications to ensure correct updating
    setNotifications(prevNotifications => {
      const newNotification = { data, title, date, to };
      const updatedNotifications = [...prevNotifications, newNotification];

      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      return updatedNotifications;
    });
  };

  return { notifications, addNotification };
};

export default useNotifications;
