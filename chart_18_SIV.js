function drawChart18(data) {
  let optionsObj18 = {};

  data.forEach((d) => {
    if (
      d[
        "Are single intent visa employees eligible for H-1B lottery sponsorship?"
      ] != "" &&
      optionsObj18[
        d[
          "Are single intent visa employees eligible for H-1B lottery sponsorship?"
        ]
      ] == undefined
    ) {
      optionsObj18[
        d[
          "Are single intent visa employees eligible for H-1B lottery sponsorship?"
        ]
      ] = 1;
    } else if (
      d[
        "Are single intent visa employees eligible for H-1B lottery sponsorship?"
      ] != "" &&
      optionsObj18[
        d[
          "Are single intent visa employees eligible for H-1B lottery sponsorship?"
        ]
      ] != undefined
    ) {
      optionsObj18[
        d[
          "Are single intent visa employees eligible for H-1B lottery sponsorship?"
        ]
      ] =
        optionsObj18[
          d[
            "Are single intent visa employees eligible for H-1B lottery sponsorship?"
          ]
        ] + 1;
    }
  });

  let pieData18 = [];
  let total18 = 0;

  Object.keys(optionsObj18)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData18.push(optionsObj18[k]);
      total18 = total18 + optionsObj18[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx18 = document.getElementById("chart_18_SIV").getContext("2d");
  var myChart18 = new Chart(ctx18, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj18).sort().reverse(),
      datasets: [
        {
          fill: true,
          backgroundColor: ["#4cd5d2", "#1a3149", "#fd4b49"],
          borderWidth: 0,
          data: pieData18,
        },
      ],
    },
    options: {
      animation: {
        duration: 2001,
      },
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
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
              formatter: function (value, ctx18) {
                return (
                  ctx18.chart.data.labels[ctx18.dataIndex] +
                  " " +
                  `${
                    Math.round(
                      ((value / total18) * 100 + Number.EPSILON) * 100
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
              return `${value.label}: ${value.raw} (${
                Math.round(
                  ((value.raw / total18) * 100 + Number.EPSILON) * 100
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
  return myChart18;
}
