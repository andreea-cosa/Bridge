function drawChart31(data) {
  let optionsObj31 = {};

  data.forEach((d) => {
    if (
      d[
      "Do you have a liquidated damages clause that allows you to recoup immigration fees when an employee leaves your company within a specific time period?"
      ] != "" &&
      optionsObj31[
      d[
      "Do you have a liquidated damages clause that allows you to recoup immigration fees when an employee leaves your company within a specific time period?"
      ]
      ] == undefined
    ) {
      optionsObj31[
        d[
        "Do you have a liquidated damages clause that allows you to recoup immigration fees when an employee leaves your company within a specific time period?"
        ]
      ] = 1;
    } else if (
      d[
      "Do you have a liquidated damages clause that allows you to recoup immigration fees when an employee leaves your company within a specific time period?"
      ] != "" &&
      optionsObj31[
      d[
      "Do you have a liquidated damages clause that allows you to recoup immigration fees when an employee leaves your company within a specific time period?"
      ]
      ] != undefined
    ) {
      optionsObj31[
        d[
        "Do you have a liquidated damages clause that allows you to recoup immigration fees when an employee leaves your company within a specific time period?"
        ]
      ] =
        optionsObj31[
        d[
        "Do you have a liquidated damages clause that allows you to recoup immigration fees when an employee leaves your company within a specific time period?"
        ]
        ] + 1;
    }
  });

  let pieData31 = [];
  let total31 = 0;

  Object.keys(optionsObj31)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData31.push(optionsObj31[k]);
      total31 = total31 + optionsObj31[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx31 = document
    .getElementById("chart_31_liquidated_damages")
    .getContext("2d");

  var myChart31 = new Chart(ctx31, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj31).sort().reverse(),
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
          data: pieData31,
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
              formatter: function (value, ctx31) {
                return (
                  ctx31.chart.data.labels[ctx31.dataIndex] +
                  " " +
                  `${Math.round(
                    ((value / total31) * 100 + Number.EPSILON) * 100
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
          //         ((value.raw / total31) * 100 + Number.EPSILON) * 100
          //       ) / 100
          //     })%`;
          //   },
          // },
          enabled: false,
          position: "nearest",
          external: function (context) {
            externalTooltipHandler(context, total31);
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
  return myChart31;
}
