function calculatePercentile_33_liquidated_damages(data, percentile) {
  let arr = [];
  data.forEach((d) => {
    if (!isNaN(parseFloat(d["Percent of damages recovered (modified)"]))) {
      arr.push(parseFloat(d["Percent of damages recovered (modified)"]));
    }
  });

  let ans = getPercentile(arr, percentile);
  document.getElementById("percentile_33_liquidated_damages_result").innerText =
    ans + " months ";
}
