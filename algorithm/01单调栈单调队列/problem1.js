//https://leetcode.cn/problems/sliding-window-maximum/
var maxSlidingWindow = function (nums, k) {
  const ans = [],
    helpDbQ = [];
  let left = 0,
    right = k - 1;
  for (let i = 0; i < k; ++i) {
    while (helpDbQ.length > 0 && nums[helpDbQ[helpDbQ.length - 1]] <= nums[i])
      helpDbQ.pop();

    helpDbQ.push(i);
  }
  ans.push(nums[helpDbQ[0]]);

  while (right < nums.length - 1) {
    right++;
    while (
      helpDbQ.length > 0 &&
      nums[helpDbQ[helpDbQ.length - 1]] <= nums[right]
    )
      helpDbQ.pop();

    helpDbQ.push(right);

    left++;
    //队列其实不可能为空
    if (helpDbQ[0] === left - 1) helpDbQ.shift();

    ans.push(nums[helpDbQ[0]]);
  }
  return ans;
};
