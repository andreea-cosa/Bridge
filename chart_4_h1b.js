function drawChart4(data) {
  let optionsObj4 = {};

  data.forEach((d) => {
    if (
      d[
      "When are employees eligible to start with your company after an H-1B transfer has been filed?"
      ] != "" &&
      optionsObj4[
      d[
      "When are employees eligible to start with your company after an H-1B transfer has been filed?"
      ]
      ] == undefined
    ) {
      optionsObj4[
        d[
        "When are employees eligible to start with your company after an H-1B transfer has been filed?"
        ]
      ] = 1;
    } else if (
      d[
      "When are employees eligible to start with your company after an H-1B transfer has been filed?"
      ] != "" &&
      optionsObj4[
      d[
      "When are employees eligible to start with your company after an H-1B transfer has been filed?"
      ]
      ] != undefined
    ) {
      optionsObj4[
        d[
        "When are employees eligible to start with your company after an H-1B transfer has been filed?"
        ]
      ] =
        optionsObj4[
        d[
        "When are employees eligible to start with your company after an H-1B transfer has been filed?"
        ]
        ] + 1;
    }
  });

  let pieData4 = [];
  let total4 = 0;

  Object.keys(optionsObj4)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData4.push(optionsObj4[k]);
      total4 = total4 + optionsObj4[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx4 = document.getElementById("chart_4_h1b").getContext("2d");

  var myChart4 = new Chart(ctx4, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj4).sort().reverse(),
      datasets: [
        {
          fill: true,
          backgroundColor: ["#4cd5d2", "#1a3149", "#fd4b49"],
          borderWidth: 0,
          data: pieData4,
        },
      ],
    },
    options: {
      animation: {
        duration: 2001,
      },
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 0.7,
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
              formatter: function (value, ctx4) {
                return ctx4.chart.data.labels[ctx4.dataIndex].length > 25
                  ? ctx4.chart.data.labels[ctx4.dataIndex].substring(0, 25) +
                  "..."
                  : ctx4.chart.data.labels[ctx4.dataIndex] +
                  " " +
                  `${Math.round(
                    ((value / total4) * 100 + Number.EPSILON) * 100
                  ) / 100
                  }%`;
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
                ((value.raw / total4) * 100 + Number.EPSILON) * 100
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
  return myChart4;
}
