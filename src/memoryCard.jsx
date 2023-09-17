import "./memoryCard.css";
import { useEffect, useState } from "react";

const MemoCard = ({ keyWord }) => {
  const [img, setImg] = useState(<img className="memocard-img" />);

  useEffect(() => {
    fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=tg4tE4jiaj5Lsn07LleaiDQkyu7DbGEg&s=${keyWord}`,
      { mode: "cors" }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setImg(
          <img src={data.data.images.original.url} className="memocard-img" />
        );
      });
  }, [keyWord]);

  return <div className="memocard-con">{img}</div>;
};

const MemoCardsCon = () => {
  const keyWordList = [
    "happy",
    "sad",
    "envy",
    "bored",
    "angry",
    "confident",
    "lonly",
    "evil",
    "shocked",
    "relaxed",
  ];

  const memoCardList = keyWordList.map((listItem, index) => {
    return <MemoCard key={index} keyWord={listItem} />;
  });

  return (
    <div className="flex-row jus-cen">
      <div className="memocards-list flex-row jus-cen">{memoCardList}</div>
    </div>
  );
};

export { MemoCardsCon };
