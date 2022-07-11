// https://leetcode.cn/problems/sliding-window-maximum/
var maxSlidingWindow = function (nums, k) {
  let left = 0,
    right = k - 1;
  const N = nums.length;
  const helpArr = [];
  const ans = [];

  let max = nums[0];
  for (let i = 0; i < k; ++i) {
    max = Math.max(nums[i], max);
    // 在这里就应该维护好双端队列的状态了
    let enterNum = nums[i];
    while(helpArr.length > 0 && helpArr[helpArr.length - 1] < enterNum) {
      helpArr.pop();
    }
    helpArr.push(nums[i]);
  }

  ans.push(helpArr[0]);

  while (right < N - 1) {
    right++;
    let rightNum = nums[right];
    while (helpArr.length > 0 && helpArr[helpArr.length - 1] < rightNum) {
      helpArr.pop();
    }
    helpArr.push(rightNum);
    let leftNum = nums[left];
    left++;
    if (helpArr[0] === leftNum) {
      helpArr.shift();
    }

    ans.push(helpArr[0]);
  }

  return ans;
};
