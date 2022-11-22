function calculatePercentile_11_L1(data, percentile) {
  let arr = [];
  data.forEach((d) => {
    if (
      !isNaN(
        parseFloat(
          d[
            "How many months after the L-1 employee's start date are they eligible for H-1B lottery sponsorship?Please leave blank if unsure; use the arrow button below to move forward."
          ]
        )
      )
    ) {
      arr.push(
        parseFloat(
          d[
            "How many months after the L-1 employee's start date are they eligible for H-1B lottery sponsorship?Please leave blank if unsure; use the arrow button below to move forward."
          ]
        )
      );
    }
  });

  let ans = getInvertedPercentile(arr, percentile);
  document.getElementById("percentile_11_L1_result").innerText =
    ans + " months ";
}
