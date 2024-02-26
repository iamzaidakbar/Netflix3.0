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
  }, []); // Dependency array is left empty to run only once when component mounts
  

  const addNotification = (id, img, title, date, to) => {
    const newNotification = { id, img, title, date, to };
    const updatedNotifications = [...notifications, newNotification];

    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  return { notifications, addNotification };
};

export default useNotifications;
