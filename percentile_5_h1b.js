function calculatePercentile_5_h1b(data, percentile) {
  let arr = [];
  data.forEach((d) => {
    if (
      !isNaN(
        parseFloat(
          d[
            "How many months must be remaining in their H-1B status (time before max out)? Please leave blank if unsure; use the arrow button below to move forward."
          ]
        )
      )
    ) {
      arr.push(
        parseFloat(
          d[
            "How many months must be remaining in their H-1B status (time before max out)? Please leave blank if unsure; use the arrow button below to move forward."
          ]
        )
      );
    }
  });

  let ans = getPercentile(arr, percentile);
  document.getElementById("percentile_5_h1b_result").innerText =
    ans + " months ";
}
