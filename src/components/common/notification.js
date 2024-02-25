import { Link } from "react-router-dom";
import useNotifications from "../../Utils/API/useNotifications";
import { TMDB_IMG_URL } from "../../Utils/constants";
import "../../styles/notifications.scss";
import { useEffect } from "react";

const Notification = () => {
  const { notifications } = useNotifications();

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    JSON.parse(localStorage.getItem("notifications")) || [];
  }, [notifications]);

  return (
    <>
      <span className="n-container">
        <span className="material-icons-outlined notification">
          notifications
        </span>
        <span className="n-badge">{notifications?.length}</span>

        {/* Notifications */}

        <div className="notifications">
          {notifications &&
            notifications?.map((notification) => {
              return (
                <Link to={notification?.to} key={notification?.id} className="notification-wrapper">
                  <img
                    width={120}
                    height={70}
                    src={TMDB_IMG_URL + notification?.img}
                  />
                  <div className="n-wrap">
                    <span className="n-title">{notification?.title}</span>
                    <span className="n-date">
                      {formatDate(notification?.date)}
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
      </span>
    </>
  );
};
export default Notification;
