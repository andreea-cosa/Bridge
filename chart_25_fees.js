function drawChart25(data) {
  let optionsObj25 = {};

  data.forEach((d) => {
    if (
      d[
      "Does your company support the maintenance of the employee's underlying nonimmigrant visa once an I-485 is pending?"
      ] != "" &&
      optionsObj25[
      d[
      "Does your company support the maintenance of the employee's underlying nonimmigrant visa once an I-485 is pending?"
      ]
      ] == undefined
    ) {
      optionsObj25[
        d[
        "Does your company support the maintenance of the employee's underlying nonimmigrant visa once an I-485 is pending?"
        ]
      ] = 1;
    } else if (
      d[
      "Does your company support the maintenance of the employee's underlying nonimmigrant visa once an I-485 is pending?"
      ] != "" &&
      optionsObj25[
      d[
      "Does your company support the maintenance of the employee's underlying nonimmigrant visa once an I-485 is pending?"
      ]
      ] != undefined
    ) {
      optionsObj25[
        d[
        "Does your company support the maintenance of the employee's underlying nonimmigrant visa once an I-485 is pending?"
        ]
      ] =
        optionsObj25[
        d[
        "Does your company support the maintenance of the employee's underlying nonimmigrant visa once an I-485 is pending?"
        ]
        ] + 1;
    }
  });

  let pieData25 = [];
  let total25 = 0;

  Object.keys(optionsObj25)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData25.push(optionsObj25[k]);
      total25 = total25 + optionsObj25[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx25 = document.getElementById("chart_25_fees").getContext("2d");

  var myChart25 = new Chart(ctx25, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj25).sort().reverse(),
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
          data: pieData25,
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
              formatter: function (value, ctx25) {
                return (
                  ctx25.chart.data.labels[ctx25.dataIndex] +
                  " " +
                  `${Math.round(
                    ((value / total25) * 100 + Number.EPSILON) * 100
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
          //         ((value.raw / total25) * 100 + Number.EPSILON) * 100
          //       ) / 100
          //     })%`;
          //   },
          // },
          enabled: false,
          position: "nearest",
          external: function (context) {
            externalTooltipHandler(context, total25);
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
  return myChart25;
}
