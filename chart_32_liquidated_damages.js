function drawChart32(data) {
  let optionsObj32 = {};
  data.forEach((d, i) => {
    if (
      d["Tenure of liquidated damages clause (modified) "] != "" &&
      optionsObj32[d["Tenure of liquidated damages clause (modified) "]] ==
      undefined
    ) {
      optionsObj32[d["Tenure of liquidated damages clause (modified) "]] = 1;
    } else if (
      d["Tenure of liquidated damages clause (modified) "] != "" &&
      optionsObj32[d["Tenure of liquidated damages clause (modified) "]] !=
      undefined
    ) {
      optionsObj32[d["Tenure of liquidated damages clause (modified) "]] =
        optionsObj32[d["Tenure of liquidated damages clause (modified) "]] + 1;
    }
  });

  let labelsArr = [];
  Object.keys(optionsObj32).forEach((d) => {
    labelsArr.push(parseInt(d));
  });

  let lineData32 = [];
  let total32 = 0;
  const DISPLAY = true;
  const BORDER = true;
  const CHART_AREA = true;
  const TICKS = true;

  Object.keys(optionsObj32)
    .sort()
    .reverse()
    .forEach((k) => {
      lineData32.push(optionsObj32[k]);
      total32 = total32 + optionsObj32[k];
    });

  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx32 = document
    .getElementById("chart_32_liquidated_damages")
    .getContext("2d");

  var myChart32 = new Chart(ctx32, {
    type: "line",
    data: {
      labels: labelsArr,
      datasets: [
        {
          label: "Tenure",
          fill: false,
          backgroundColor: ["#4cd5d2"],
          borderColor: ["#4cd5d2"],
          borderWidth: 3,
          data: lineData32,
        },
      ],
    },
    options: {
      animation: {
        duration: 2001,
      },
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: getAspectRatio(),
      layout: {
        padding: {
          top: 11,
        },
      },
      plugins: {
        // deferred: {
        //   xOffset: 151, // defer until 150px of the canvas width are inside the viewport
        //   yOffset: "51%", // defer until 50% of the canvas height are inside the viewport
        //   delay: 201, // delay of 500 ms after the canvas is considered inside the viewport
        // },

        datalabels: {
          display: false,
        },

        tooltip: {
          // displayColors: false,

          // bodyFont: {
          //   size: 14,
          // },
          // callbacks: {
          //   label: function (value, context) {
          //     return `${value.label}: ${value.raw} (${
          //       Math.round(
          //         ((value.raw / total32) * 100 + Number.EPSILON) * 100
          //       ) / 100
          //     })%`;
          //   },
          // },
          enabled: false,
          position: "nearest",
          external: function (context) {
            externalTooltipHandler(context, total32);
          },
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            padding: 25,
            usePointStyle: true,
            boxWidth: 7,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: BORDER,
            drawOnChartArea: CHART_AREA,
            drawTicks: TICKS,
          },
        },
        y: {
          grid: {
            drawBorder: false,
            color: function (context) {
              if (context.tick.value < 0) {
                return Utils.CHART_COLORS.green;
              } else if (context.tick.value < 0) {
                return Utils.CHART_COLORS.red;
              }
              return "#444";
            },
          },
        },
      },
    },
  });
  return myChart32;
}
