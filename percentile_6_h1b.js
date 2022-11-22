function calculatePercentile_6_h1b(data, percentile) {
  let arr = [];
  data.forEach((d) => {
    if (
      !isNaN(
        parseFloat(
          d[
            "How many months after the employee's start date are H-1B employees eligible for initiation of a Green Card process?Please leave blank if unsure; use the arrow button below to move forward."
          ]
        )
      )
    ) {
      arr.push(
        parseFloat(
          d[
            "How many months after the employee's start date are H-1B employees eligible for initiation of a Green Card process?Please leave blank if unsure; use the arrow button below to move forward."
          ]
        )
      );
    }
  });

  let ans = getInvertedPercentile(arr, percentile);
  document.getElementById("percentile_6_h1b_result").innerText =
    ans + " months ";
}
