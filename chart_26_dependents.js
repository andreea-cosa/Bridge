function drawChart26(data) {
  let optionsObj26 = {};

  data.forEach((d) => {
    if (
      d[
      "Do you cover Green Card processing costs for the employee's dependent family members?"
      ] != "" &&
      optionsObj26[
      d[
      "Do you cover Green Card processing costs for the employee's dependent family members?"
      ]
      ] == undefined
    ) {
      optionsObj26[
        d[
        "Do you cover Green Card processing costs for the employee's dependent family members?"
        ]
      ] = 1;
    } else if (
      d[
      "Do you cover Green Card processing costs for the employee's dependent family members?"
      ] != "" &&
      optionsObj26[
      d[
      "Do you cover Green Card processing costs for the employee's dependent family members?"
      ]
      ] != undefined
    ) {
      optionsObj26[
        d[
        "Do you cover Green Card processing costs for the employee's dependent family members?"
        ]
      ] =
        optionsObj26[
        d[
        "Do you cover Green Card processing costs for the employee's dependent family members?"
        ]
        ] + 1;
    }
  });

  let pieData26 = [];
  let total26 = 0;

  Object.keys(optionsObj26)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData26.push(optionsObj26[k]);
      total26 = total26 + optionsObj26[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx26 = document.getElementById("chart_26_dependents").getContext("2d");

  var myChart26 = new Chart(ctx26, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj26).sort().reverse(),
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
          data: pieData26,
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
              formatter: function (value, ctx26) {
                return ctx26.chart.data.labels[ctx26.dataIndex].length > 25
                  ? ctx26.chart.data.labels[ctx26.dataIndex].substring(0, 25) +
                  "..."
                  : ctx26.chart.data.labels[ctx26.dataIndex] +
                  " " +
                  `${Math.round(
                    ((value / total26) * 100 + Number.EPSILON) * 100
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
                ((value.raw / total26) * 100 + Number.EPSILON) * 100
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
  return myChart26;
}
