function calculatePercentile_14_F1(data, percentile) {
  let arr = [];
  data.forEach((d) => {
    if (
      !isNaN(
        parseFloat(
          d[
            "How many months must be remaining in their F-1 status (time before max out)?Please leave blank if unsure; use the arrow button below to move forward."
          ]
        )
      )
    ) {
      arr.push(
        parseFloat(
          d[
            "How many months must be remaining in their F-1 status (time before max out)?Please leave blank if unsure; use the arrow button below to move forward."
          ]
        )
      );
    }
  });

  let ans = getInvertedPercentile(arr, percentile);
  document.getElementById("percentile_14_F1_result").innerText =
    ans + " months ";
}
