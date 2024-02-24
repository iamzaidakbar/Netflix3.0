import { useSelector } from "react-redux";
import VCard from "../common/v-card";
import "../../styles/my-list.scss";
import Footer from "../common/footer";

const MyList = () => {
  const myListVideos = useSelector((store) => store?.myList?.myListVideos);

  if (myListVideos.length === 0) {
    return <div className="no-result">No videos in the list!</div>;
  }

  const my_list = myListVideos.map((data) => {
    console.log("VCard data:", data);
    return <VCard className="vcard" key={data?.id} data={data} flag={false} />;
  });

  console.log("myListVideos:", myListVideos, "asa");

  return (
    <div className="mylist-wrapper">
      <label className="label">My List</label>
      <div className="mylist">{my_list}</div>
      <div className="footer"><Footer/></div>
    </div>
  );
};

export default MyList;
