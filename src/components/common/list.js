import SmallVideoCard from "./smallVideoCard";
import '../../styles/list.scss'

const List = ({ data, title }) => {
  return (
    <div className="list">
      <span className="title">{title}</span>
      <span className="showcase">
        {data?.map((item) => (
          <SmallVideoCard key={item.id} item={item} videoId={item.id} />
        ))}
      </span>
    </div>
  );
};
export default List;
