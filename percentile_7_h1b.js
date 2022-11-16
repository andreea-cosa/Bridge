function calculatePercentile_7_h1b(data, percentile) {
  let arr = [];
  data.forEach((d) => {
    if (
      !isNaN(
        parseFloat(
          d[
            "How many months before an employee's status expiration do you initiate an extension?Please leave blank if unsure; use the arrow button below to move forward."
          ]
        )
      )
    ) {
      arr.push(
        parseFloat(
          d[
            "How many months before an employee's status expiration do you initiate an extension?Please leave blank if unsure; use the arrow button below to move forward."
          ]
        )
      );
    }
  });

  let ans = getInvertedPercentile(arr, percentile);
  document.getElementById("percentile_7_h1b_result").innerText =
    ans + " months ";
}
