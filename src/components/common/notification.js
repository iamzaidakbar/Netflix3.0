import { Link } from "react-router-dom";
import useNotifications from "../../Utils/API/useNotifications";
import { TMDB_IMG_URL } from "../../Utils/constants";
import { formatDistanceToNow } from "date-fns";
import "../../styles/notifications.scss";
import { useEffect, useState } from "react";

const Notification = () => {
  const { notifications } = useNotifications();
  const [active, setActive] = useState(false);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatRelativeTime = (dateString) => {
    const distance = formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
    });
    return distance;
  };

  useEffect(() => {
    JSON.parse(localStorage.getItem("notifications")) || [];
  }, [notifications]);

  // Sort notifications based on date in descending order
  const sortedNotifications = notifications
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      {/* Notifications */}
      <span className={`n-container ${active ? "active" : ""}`}>
        <span
          onMouseEnter={() => {
            setActive(true);
          }}
          className="material-icons-outlined notification"
        >
          notifications
        </span>
        <span className="n-badge">{notifications?.length}</span>

        <div
          onMouseLeave={() => {
            setActive(false);
          }}
          className="notifications"
        >
          {sortedNotifications &&
            sortedNotifications?.map((notification) => {
              return (
                <Link
                  to={notification?.to}
                  key={notification?.id}
                  className="notification-wrapper"
                >
                  <img
                    width={120}
                    height={70}
                    src={TMDB_IMG_URL + notification?.img}
                  />
                  <div className="n-wrap">
                    <span className="n-title">{notification?.title}</span>
                    <span className="n-date">
                      {formatRelativeTime(notification?.date)}
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
