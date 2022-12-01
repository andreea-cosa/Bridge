function drawChart28(data) {
  let optionsObj28 = {};

  data.forEach((d) => {
    if (
      d[
      "Will you cover travel expenses related to consular processing of visa applications?"
      ] != "" &&
      optionsObj28[
      d[
      "Will you cover travel expenses related to consular processing of visa applications?"
      ]
      ] == undefined
    ) {
      optionsObj28[
        d[
        "Will you cover travel expenses related to consular processing of visa applications?"
        ]
      ] = 1;
    } else if (
      d[
      "Will you cover travel expenses related to consular processing of visa applications?"
      ] != "" &&
      optionsObj28[
      d[
      "Will you cover travel expenses related to consular processing of visa applications?"
      ]
      ] != undefined
    ) {
      optionsObj28[
        d[
        "Will you cover travel expenses related to consular processing of visa applications?"
        ]
      ] =
        optionsObj28[
        d[
        "Will you cover travel expenses related to consular processing of visa applications?"
        ]
        ] + 1;
    }
  });

  let pieData28 = [];
  let total28 = 0;

  Object.keys(optionsObj28)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData28.push(optionsObj28[k]);
      total28 = total28 + optionsObj28[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx28 = document
    .getElementById("chart_28_consular_premium")
    .getContext("2d");

  var myChart28 = new Chart(ctx28, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj28).sort().reverse(),
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
              formatter: function (value, ctx28) {
                return (
                  ctx28.chart.data.labels[ctx28.dataIndex] +
                  " " +
                  `${Math.round(
                    ((value / total28) * 100 + Number.EPSILON) * 100
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
          //         ((value.raw / total28) * 100 + Number.EPSILON) * 100
          //       ) / 100
          //     })%`;
          //   },
          // },
          enabled: false,
          position: "nearest",
          external: function (context) {
            externalTooltipHandler(context, total28);
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
  return myChart28;
}
