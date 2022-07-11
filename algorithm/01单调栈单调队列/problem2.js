function solve(arr, num) {
  const minHelp = [];
  const maxHelp = [];
  const length = arr.length;
  let ans = 0;
  let right = 0;
  for (let left = 0; left < length; ++left) {
    while (right < length) {
      while (
        minHelp.length !== 0 &&
        arr[minHelp[minHelp.length - 1]] >= arr[right]
      ) {
        minHelp.pop();
      }
      while (
        maxHelp.length !== 0 &&
        arr[maxHelp[maxHelp.length - 1]] <= arr[left]
      ) {
        maxHelp.pop();
      }
      minHelp.push(right);
      maxHelp.push(right);

      if (arr[maxHelp[0]] - arr[minHelp[0]] > num) {
        break;
      }

      right++;
    }
    ans += right - left;
    //因为left++收缩，所以需要看最大、最小值的索引是否过期
    if (left === minHelp[0]) {
      minHelp.shift();
    }
    if (right === maxHelp[0]) {
      maxHelp.shift();
    }
  }

  return ans;
}
