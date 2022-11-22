function calculatePercentile_32_liquidated_damages(data, percentile) {
  let arr = [];
  data.forEach((d) => {
    if (
      !isNaN(parseFloat(d["Tenure of liquidated damages clause (modified) "]))
    ) {
      arr.push(
        parseFloat(d["Tenure of liquidated damages clause (modified) "])
      );
    }
  });

  let ans = getPercentile(arr, percentile);
  document.getElementById("percentile_32_liquidated_damages_result").innerText =
    ans + " months ";
}
