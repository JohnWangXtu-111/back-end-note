function monotonyStack(arr) {
  let map = new Map();
  let helpStack = [];
  for (let i = 0; i < arr.length; ++i) {
    if (
      helpStack.length === 0 ||
      arr[helpStack[helpStack.length - 1][0]] < arr[i]
    ) {
      helpStack.push([i]);
    }

    if (arr[helpStack[helpStack.length - 1][0]] === arr[i]) {
      helpStack[helpStack.length - 1].push(i);
    }

    //数据过小，需要弹出，维护map的映射更新
    while (
      helpStack.length !== 0 &&
      arr[helpStack[helpStack.length - 1][0]] > arr[i]
    ) {
      let idxs = helpStack.pop();

      let rightLessIdx = i;
      let leftLessIdx =
        helpStack.length === 0 ? -1 : helpStack[helpStack.length - 1][0];

      for (let idx of idxs) {
        map.set(idx, { rightLessIdx, leftLessIdx });
      }
    }
    helpStack.push([i]);
  }

  //结算栈中剩余的idx
  while (helpStack.length > 0) {
    let idxs = helpStack.pop();
    let leftLessIdx =
      helpStack.length === 0 ? -1 : helpStack[helpStack.length - 1][0];
    for (let idx of idxs) {
      map.set(idx, { rightLessIdx: -1, leftLessIdx });
    }
  }

  return map;
}

function solve(arr) {
  let map = new Map();
  for (let i = 0; i < arr.length; ++i) {
    let leftLessIdx = -1;
    for (let start = i - 1; start >= 0; --start) {
      if (arr[start] < arr[i]) {
        leftLessIdx = start;
        break;
      }
    }
    let rightLessIdx = -1;
    for (let end = i + 1; end < arr.length; ++end) {
      if (arr[end] < arr[i]) {
        rightLessIdx = end;
        break;
      }
    }
    map.set(i, { rightLessIdx, leftLessIdx });
  }
  return map;
}

function solution(arr) {
  let map = monotonyStack(arr);
  let i = 0;
  let left = map.get(0).leftLessIdx === -1 ? 0 : map.get(0).leftLessIdx;
  let right = map.get(0).rightLessIdx === -1 ? 0 : map.get(0).rightLessIdx;
  let max = (right - left + 1) * arr[0];
  for (let j = 1; j < arr.length; ++j) {
    let left = map.get(j).leftLessIdx === -1 ? j : map.get(j).leftLessIdx;
    let right = map.get(j).rightLessIdx === -1 ? j : map.get(j).rightLessIdx;
    max = Math.max(max, (right - left + 1) * arr[i]);
  }

  return max;
}
