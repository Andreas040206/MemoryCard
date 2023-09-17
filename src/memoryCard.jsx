import "./memoryCard.css";
import { useEffect, useState } from "react";
import { mixAry } from "./tools";

const MemoCard = ({ keyWord, cardInfo, cardId, cardChangeHandler }) => {
  const [img, setImg] = useState(<img className="memocard-img" />);

  const changeHandler = () => {
    const newCardInfo = { ...cardInfo };
    newCardInfo[cardId] = true;

    cardChangeHandler(newCardInfo);
  };

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
  }, []);

  return (
    <div onClick={changeHandler} className="memocard-con flex-row cen">
      {img}
    </div>
  );
};

const MemoCardsCon = () => {
  const [cardInfo, setCardInfo] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
  });

  const handleCardInfo = (newCardInfo) => {
    setCardInfo(newCardInfo);
  };

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
    return (
      <MemoCard
        key={index}
        keyWord={listItem}
        cardInfo={cardInfo}
        cardId={index}
        cardChangeHandler={handleCardInfo}
      />
    );
  });

  const mixedKeyWordsList = mixAry(memoCardList);

  return (
    <div className="flex-row jus-cen">
      <div className="memocards-list flex-row jus-cen">{mixedKeyWordsList}</div>
    </div>
  );
};

export { MemoCardsCon };
