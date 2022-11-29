function drawChart27(data) {
  let optionsObj27 = {};

  data.forEach((d) => {
    if (
      d[
      "Do you cover non-immigrant visa costs for the employee's dependent family members?"
      ] != "" &&
      optionsObj27[
      d[
      "Do you cover non-immigrant visa costs for the employee's dependent family members?"
      ]
      ] == undefined
    ) {
      optionsObj27[
        d[
        "Do you cover non-immigrant visa costs for the employee's dependent family members?"
        ]
      ] = 1;
    } else if (
      d[
      "Do you cover non-immigrant visa costs for the employee's dependent family members?"
      ] != "" &&
      optionsObj27[
      d[
      "Do you cover non-immigrant visa costs for the employee's dependent family members?"
      ]
      ] != undefined
    ) {
      optionsObj27[
        d[
        "Do you cover non-immigrant visa costs for the employee's dependent family members?"
        ]
      ] =
        optionsObj27[
        d[
        "Do you cover non-immigrant visa costs for the employee's dependent family members?"
        ]
        ] + 1;
    }
  });

  let pieData27 = [];
  let total27 = 0;

  Object.keys(optionsObj27)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData27.push(optionsObj27[k]);
      total27 = total27 + optionsObj27[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx27 = document.getElementById("chart_27_dependents").getContext("2d");

  var myChart27 = new Chart(ctx27, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj27).sort().reverse(),
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
          data: pieData27,
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
              formatter: function (value, ctx27) {
                return ctx27.chart.data.labels[ctx27.dataIndex].length > 25
                  ? ctx27.chart.data.labels[ctx27.dataIndex].substring(0, 25) +
                  "..."
                  : ctx27.chart.data.labels[ctx27.dataIndex] +
                  " " +
                  `${Math.round(
                    ((value / total27) * 100 + Number.EPSILON) * 100
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
                ((value.raw / total27) * 100 + Number.EPSILON) * 100
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
  return myChart27;
}
