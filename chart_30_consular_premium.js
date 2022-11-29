function drawChart30(data) {
  let optionsObj30 = {};

  data.forEach((d) => {
    if (
      d[
      "If an application is filed with USCIS' Premium Processing option, who covers the cost?"
      ] != "" &&
      optionsObj30[
      d[
      "If an application is filed with USCIS' Premium Processing option, who covers the cost?"
      ]
      ] == undefined
    ) {
      optionsObj30[
        d[
        "If an application is filed with USCIS' Premium Processing option, who covers the cost?"
        ]
      ] = 1;
    } else if (
      d[
      "If an application is filed with USCIS' Premium Processing option, who covers the cost?"
      ] != "" &&
      optionsObj30[
      d[
      "If an application is filed with USCIS' Premium Processing option, who covers the cost?"
      ]
      ] != undefined
    ) {
      optionsObj30[
        d[
        "If an application is filed with USCIS' Premium Processing option, who covers the cost?"
        ]
      ] =
        optionsObj30[
        d[
        "If an application is filed with USCIS' Premium Processing option, who covers the cost?"
        ]
        ] + 1;
    }
  });

  let pieData30 = [];
  let total30 = 0;

  Object.keys(optionsObj30)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData30.push(optionsObj30[k]);
      total30 = total30 + optionsObj30[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx30 = document
    .getElementById("chart_30_consular_premium")
    .getContext("2d");

  var myChart30 = new Chart(ctx30, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj30).sort().reverse(),
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
          data: pieData30,
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
              formatter: function (value, ctx30) {
                return ctx30.chart.data.labels[ctx30.dataIndex].length > 25
                  ? ctx30.chart.data.labels[ctx30.dataIndex].substring(0, 25) +
                  "..."
                  : ctx30.chart.data.labels[ctx30.dataIndex] +
                  " " +
                  `${Math.round(
                    ((value / total30) * 100 + Number.EPSILON) * 100
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
                ((value.raw / total30) * 100 + Number.EPSILON) * 100
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
  return myChart30;
}
