function drawChart15(data) {
  let optionsObj15 = {};

  data.forEach((d) => {
    if (
      d[
      "Do you require that the F-1 OPT candidate has a minimum time period of OPT or STEM OPT remaining for them to be eligible for hire?"
      ] != "" &&
      optionsObj15[
      d[
      "Do you require that the F-1 OPT candidate has a minimum time period of OPT or STEM OPT remaining for them to be eligible for hire?"
      ]
      ] == undefined
    ) {
      optionsObj15[
        d[
        "Do you require that the F-1 OPT candidate has a minimum time period of OPT or STEM OPT remaining for them to be eligible for hire?"
        ]
      ] = 1;
    } else if (
      d[
      "Do you require that the F-1 OPT candidate has a minimum time period of OPT or STEM OPT remaining for them to be eligible for hire?"
      ] != "" &&
      optionsObj15[
      d[
      "Do you require that the F-1 OPT candidate has a minimum time period of OPT or STEM OPT remaining for them to be eligible for hire?"
      ]
      ] != undefined
    ) {
      optionsObj15[
        d[
        "Do you require that the F-1 OPT candidate has a minimum time period of OPT or STEM OPT remaining for them to be eligible for hire?"
        ]
      ] =
        optionsObj15[
        d[
        "Do you require that the F-1 OPT candidate has a minimum time period of OPT or STEM OPT remaining for them to be eligible for hire?"
        ]
        ] + 1;
    }
  });

  let pieData15 = [];
  let total15 = 0;

  Object.keys(optionsObj15)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData15.push(optionsObj15[k]);
      total15 = total15 + optionsObj15[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx15 = document.getElementById("chart_15_F1").getContext("2d");

  var myChart15 = new Chart(ctx15, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj15).sort().reverse(),
      datasets: [
        {
          fill: true,
          backgroundColor: ["#4cd5d2", "#1a3149", "#fd4b49"],
          borderWidth: 0,
          data: pieData15,
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
              formatter: function (value, ctx15) {
                return (
                  ctx15.chart.data.labels[ctx15.dataIndex] +
                  " " +
                  `${Math.round(
                    ((value / total15) * 100 + Number.EPSILON) * 100
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
          //         ((value.raw / total15) * 100 + Number.EPSILON) * 100
          //       ) / 100
          //     })%`;
          //   },
          // },
          enabled: false,
          position: "nearest",
          external: function (context) {
            externalTooltipHandler(context, total15);
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
  return myChart15;
}
