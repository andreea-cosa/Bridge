function drawChart29(data) {
  let optionsObj29 = {};

  data.forEach((d) => {
    if (
      d[
      "What portion of consular processing costs do you cover when an employee goes abroad to obtain a visa stamp?"
      ] != "" &&
      optionsObj29[
      d[
      "What portion of consular processing costs do you cover when an employee goes abroad to obtain a visa stamp?"
      ]
      ] == undefined
    ) {
      optionsObj29[
        d[
        "What portion of consular processing costs do you cover when an employee goes abroad to obtain a visa stamp?"
        ]
      ] = 1;
    } else if (
      d[
      "What portion of consular processing costs do you cover when an employee goes abroad to obtain a visa stamp?"
      ] != "" &&
      optionsObj29[
      d[
      "What portion of consular processing costs do you cover when an employee goes abroad to obtain a visa stamp?"
      ]
      ] != undefined
    ) {
      optionsObj29[
        d[
        "What portion of consular processing costs do you cover when an employee goes abroad to obtain a visa stamp?"
        ]
      ] =
        optionsObj29[
        d[
        "What portion of consular processing costs do you cover when an employee goes abroad to obtain a visa stamp?"
        ]
        ] + 1;
    }
  });

  let pieData28 = [];
  let total29 = 0;

  Object.keys(optionsObj29)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData28.push(optionsObj29[k]);
      total29 = total29 + optionsObj29[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx29 = document
    .getElementById("chart_29_consular_premium")
    .getContext("2d");

  var myChart29 = new Chart(ctx29, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj29).sort().reverse(),
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
          data: pieData28,
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
              formatter: function (value, ctx29) {
                return (
                  ctx29.chart.data.labels[ctx29.dataIndex] +
                  " " +
                  `${Math.round(
                    ((value / total29) * 100 + Number.EPSILON) * 100
                  ) / 100
                  }%`
                );
              },
              offset: 3,
            },
          },
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
          //         ((value.raw / total29) * 100 + Number.EPSILON) * 100
          //       ) / 100
          //     })%`;
          //   },
          // },
          enabled: false,
          position: "nearest",
          external: function (context) {
            externalTooltipHandler(context, total29);
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
          display: false,
        },
        y: {
          display: false,
        },
      },
    },
  });
  return myChart29;
}
