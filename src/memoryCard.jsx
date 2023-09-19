import "./memoryCard.css";
import { useEffect, useState } from "react";
import { mixAry } from "./tools";

const MemoCard = ({
  keyWord,
  cardInfo,
  cardId,
  cardChangeHandler,
  handleGameOver,
}) => {
  const [img, setImg] = useState(<img className="memocard-img" />);

  const changeHandler = () => {
    if (cardInfo[cardId] === true) {
      // It's been cliked before
      handleGameOver();
    } else {
      // It hasn't been cliked before
      const newCardInfo = { ...cardInfo };
      newCardInfo[cardId] = true;

      cardChangeHandler(newCardInfo);
    }
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
          <img
            src={data.data.images.original.url}
            draggable="false"
            className="memocard-img"
          />
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

  const [gameOver, setGameOver] = useState(false);

  const handleGameOver = () => {
    setGameOver(true);
  };

  const newGameHandler = () => {
    setCardInfo({
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
    setGameOver(false);
  };

  const cardInfoValues = Object.values(cardInfo);

  const clikedCount = cardInfoValues.filter((value) => value === true).length;

  const [highscore, setHighscore] = useState(0);

  if (clikedCount > highscore) {
    setHighscore(clikedCount);
  }

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
    "satisfied",
    "clapped",
    "wierd",
    "gymbro",
    "working",
    "bodybuilder",
    "supercar",
    "fail",
  ];

  const memoCardList = keyWordList.map((listItem, index) => {
    return (
      <MemoCard
        key={index}
        keyWord={listItem}
        cardInfo={cardInfo}
        cardId={index}
        cardChangeHandler={handleCardInfo}
        handleGameOver={handleGameOver}
      />
    );
  });

  const mixedKeyWordsList = mixAry(memoCardList);

  const LooseDisplay = () => {
    if (gameOver === true) {
      return (
        <div className="looseOverLay-con flex-row cen" onClick={newGameHandler}>
          <button className="looseOverLay-btn">
            Ups, you cliked the same card twice...
          </button>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="flex-row jus-cen">
      <div>
        <span>Score: {clikedCount}</span>
        <span>highscore: {highscore}</span>
      </div>
      <div className="memocards-list flex-row jus-cen">{mixedKeyWordsList}</div>
      {LooseDisplay()}
    </div>
  );
};

export { MemoCardsCon };
