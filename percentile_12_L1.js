// function percentileFunc(pOrPs, list) {
//   var ps = Array.isArray(pOrPs) ? pOrPs : [pOrPs];
//   var validationErrors = validateInput(ps);

//   if (validationErrors.length) {
//     throw new Error(validationErrors.join(" "));
//   }

//   list = list.slice().sort(function (a, b) {
//     // if (fn) {
//     //   a = fn(a);
//     //   b = fn(b);
//     // }

//     a = Number.isNaN(a) ? Number.NEGATIVE_INFINITY : a;
//     b = Number.isNaN(b) ? Number.NEGATIVE_INFINITY : b;

//     if (a > b) return 1;
//     if (a < b) return -1;

//     return 0;
//   });

//   if (ps.length === 1) {
//     return getPsValue(ps[0], list);
//   }

//   return ps.map(function (p) {
//     return getPsValue(p, list);
//   });
// }

// function validateInput(ps) {
//   return ps.reduce(function (errors, p) {
//     if (isNaN(Number(p))) {
//       errors.push(nanError(p));
//     } else if (p < 0) {
//       errors.push(lessThanZeroError(p));
//     } else if (p > 100) {
//       errors.push(greaterThanHundredError(p));
//     }
//     return errors;
//   }, []);
// }

// function getPsValue(p, list) {
//   if (p === 0) return list[0];
//   var kIndex = Math.ceil(list.length * (p / 100)) - 1;
//   return list[kIndex];
// }

function calculatePercentile_12_L1(data, percentile) {
  let arr12 = [];
  data.forEach((d) => {
    if (
      !isNaN(
        parseFloat(
          d[
            "How many months after the L-1 employee's start date are they eligible for initiation of a Green Card process?Please leave blank if unsure; use the arrow button below to move forward."
          ]
        )
      )
    ) {
      arr12.push(
        parseFloat(
          d[
            "How many months after the L-1 employee's start date are they eligible for initiation of a Green Card process?Please leave blank if unsure; use the arrow button below to move forward."
          ]
        )
      );
    }
    // else {
    //   arr12.push(NaN);
    // }
  });

  // console.log("786 percentile new", percentileFunc(90, arr12));
  let ans = getPercentile(arr12, percentile);
  document.getElementById("percentile_12_L1_result").innerText =
    ans + " months ";
}
