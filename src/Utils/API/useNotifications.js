// useNotifications.js

import { useState, useEffect } from 'react';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(storedNotifications);
  }, [notifications]);

  const addNotification = (id, img, title, date, to) => {
    const newNotification = { id, img, title, date, to };
    const updatedNotifications = [...notifications, newNotification];

    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };


  return { notifications, addNotification };
};

export default useNotifications;
