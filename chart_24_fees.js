function drawChart24(data) {
  let optionsObj24 = {};

  data.forEach((d) => {
    if (
      d["What portion of I-485 costs do you cover?"] != "" &&
      optionsObj24[d["What portion of I-485 costs do you cover?"]] == undefined
    ) {
      optionsObj24[d["What portion of I-485 costs do you cover?"]] = 1;
    } else if (
      d["What portion of I-485 costs do you cover?"] != "" &&
      optionsObj24[d["What portion of I-485 costs do you cover?"]] != undefined
    ) {
      optionsObj24[d["What portion of I-485 costs do you cover?"]] =
        optionsObj24[d["What portion of I-485 costs do you cover?"]] + 1;
    }
  });

  let pieData24 = [];
  let total24 = 0;

  Object.keys(optionsObj24)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData24.push(optionsObj24[k]);
      total24 = total24 + optionsObj24[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx24 = document.getElementById("chart_24_fees").getContext("2d");

  var myChart24 = new Chart(ctx24, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj24).sort().reverse(),
      datasets: [
        {
          fill: true,
          backgroundColor: [
            "#4cd5d2",
            "#1a3149",
            "#fd4b49",
            "#2bf6a6",
            "#fdc159",
          ],
          borderWidth: 0,
          data: pieData24,
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
          top: 40,
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
          labels: {
            name: {
              align: "end",
              anchor: "end",
              font: function (context) {
                var width = context.chart.width;
                var size = Math.round(width / 75);
                return {
                  size: size,
                };
              },
              formatter: function (value, ctx24) {
                return (
                  ctx24.chart.data.labels[ctx24.dataIndex] +
                  " " +
                  `${Math.round(
                    ((value / total24) * 100 + Number.EPSILON) * 100
                  ) / 100
                  }%`
                );
              },
              offset: 3,
            },
          },
        },
        tooltip: {
          titleMarginBottom: 20,
          caretPadding: 10,
          padding: 20,
          displayColors: false,
          titleFont: {
            size: 20,
          },
          bodyFont: {
            size: 16,
          },
          callbacks: {
            label: function (value, context) {
              return `${value.label}: ${value.raw} (${Math.round(
                ((value.raw / total24) * 100 + Number.EPSILON) * 100
              ) / 100
                })%`;
            },
          },
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            padding: 25,
          },
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
    },
  });
  return myChart24;
}
