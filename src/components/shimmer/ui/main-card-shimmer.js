import "../styles/main-card-shimmer.scss";

const Main_Card_Shimmer = ({ w, h, mt, ml, mr, mb }) => {
  return (
    <div
      style={{
        width: w,
        height: h,
        marginTop: mt,
        marginBottom: mb,
        marginLeft: ml,
        marginRight: ml,
      }}
      className="breathing"
    ></div>
  );
};
export default Main_Card_Shimmer;
