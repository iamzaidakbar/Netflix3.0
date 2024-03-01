import VCard from "../common/v-card";
import "../../styles/my-list.scss";
import Footer from "../common/footer";
import useMyList from "../../Utils/API/useMyList";
import { useEffect, useMemo } from "react";
import ShimmerMap from "../../Utils/shimmerMap";
import useUserProfile from "../../Utils/API/useUserData";

const MyList = () => {
  const { currentProfileData } = useUserProfile();

  useEffect(() => {
    document.title = "My List - Netflix";
  }, []);
  

  const memoized_my_list = useMemo(() => {
    return currentProfileData?.mylist?.map((data) => (
      <VCard className="vcard" key={data?.id} data={data} flag={false} />
    ));
  }, [currentProfileData]);

  if (!currentProfileData?.mylist) {
    return (
      <div className="no-result">
        <ShimmerMap />
      </div>
    );
  }

  return (
    <div className="mylist-wrapper">
      <label className="m-label">My List</label>
      <div className="m-mylist">{memoized_my_list}</div>
      <div className="m-footer">
        <Footer />
      </div>
    </div>
  );
};

export default MyList;
