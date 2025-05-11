import Button from "../button/Button";

const GeneralCard = ({ item }) => {
  return (
    <div className="flex flex-col p-3 rounded-lg h-full bg-[rgb(47,48,50)]  ">
      <img
        src={`https://phimimg.com/${item.poster_url}`}
        className="h-[150px] md:h-[250px] object-cover w-full rounded-lg mb-5"
        alt=""
      />
      <div className="flex flex-col h-full">
        <h3 className="mb-auto text-[16px] font-bold text-white line-clamp-2">
          {item.name}
        </h3>
        <div className="flex items-center justify-between text-[#8d939c] text-[13px] mb-4 mt-2">
          <span>{item.year}</span>
          <div className="flex items-center gap-1">
            <span>{item.time}</span>
          </div>
        </div>
        <Button to={`/phim/${item.slug}`}>Xem ngay</Button>
      </div>
    </div>
  );
};

export default GeneralCard;