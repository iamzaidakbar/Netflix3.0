import { Link } from "react-router-dom";
import useNotifications from "../../Utils/API/useNotifications";
import { TMDB_IMG_URL } from "../../Utils/constants";
import { formatDistanceToNow } from "date-fns";
import "../../styles/notifications.scss";
import { useEffect, useState } from "react";
import useUserProfile from "../../Utils/API/useUserData";

const Notification = () => {
  const [active, setActive] = useState(false);
  const { currentProfileData } = useUserProfile();

  const formatRelativeTime = (dateString) => {
    const distance = formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
    });
    return distance;
  };


  // Sort notifications based on date in descending order
  const sortedNotifications = currentProfileData?.user_notification
    ?.slice()
    ?.sort((a, b) => new Date(b.date) - new Date(a.date));

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
        <span className="n-badge">{sortedNotifications?.length || 0}</span>

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
                  key={notification?.data?.id}
                  className="notification-wrapper"
                >
                  <img
                    width={120}
                    height={70}
                    src={TMDB_IMG_URL + notification?.data?.backdrop_path}
                  />
                  <div className="n-wrap">
                    <span className="n-title">{notification.title}</span>
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
