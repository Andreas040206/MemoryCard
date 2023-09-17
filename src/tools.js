const mixAry = (ary) => {
  let list = [];

  let copyAry = [...ary];

  const addTolist = (ary) => {
    if (ary.length == 1) {
      list.push(ary[0]);
      return;
    }

    let num = Math.floor(Math.random() * (ary.length - 1));

    list.push(ary[num]);
    ary.splice(num, 1);

    addTolist(ary);
  };

  addTolist(copyAry);

  return list;
};

export { mixAry };
