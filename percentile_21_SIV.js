function calculatePercentile_21_SIV(data, percentile) {
  let arr = [];
  data.forEach((d) => {
    if (
      !isNaN(
        parseFloat(
          d[
            "How many months after the single intent visa employee's start date are they eligible for initiation of a Green Card process?Please leave blank if unsure; use the arrow button below to move forward."
          ]
        )
      )
    ) {
      arr.push(
        parseFloat(
          d[
            "How many months after the single intent visa employee's start date are they eligible for initiation of a Green Card process?Please leave blank if unsure; use the arrow button below to move forward."
          ]
        )
      );
    }
  });

  let ans = getInvertedPercentile(arr, percentile);
  document.getElementById("percentile_21_SIV_result").innerText =
    ans + " months ";
}
