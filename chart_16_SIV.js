function drawChart16(data) {
  let optionsObj16 = {};

  data.forEach((d) => {
    if (
      d[
      "Does your company sponsor single intent visas (e.g. TN, E-2, E-3, O-1) that can be renewed indefinitely?"
      ] != "" &&
      optionsObj16[
      d[
      "Does your company sponsor single intent visas (e.g. TN, E-2, E-3, O-1) that can be renewed indefinitely?"
      ]
      ] == undefined
    ) {
      optionsObj16[
        d[
        "Does your company sponsor single intent visas (e.g. TN, E-2, E-3, O-1) that can be renewed indefinitely?"
        ]
      ] = 1;
    } else if (
      d[
      "Does your company sponsor single intent visas (e.g. TN, E-2, E-3, O-1) that can be renewed indefinitely?"
      ] != "" &&
      optionsObj16[
      d[
      "Does your company sponsor single intent visas (e.g. TN, E-2, E-3, O-1) that can be renewed indefinitely?"
      ]
      ] != undefined
    ) {
      optionsObj16[
        d[
        "Does your company sponsor single intent visas (e.g. TN, E-2, E-3, O-1) that can be renewed indefinitely?"
        ]
      ] =
        optionsObj16[
        d[
        "Does your company sponsor single intent visas (e.g. TN, E-2, E-3, O-1) that can be renewed indefinitely?"
        ]
        ] + 1;
    }
  });

  let pieData16 = [];
  let total16 = 0;

  Object.keys(optionsObj16)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData16.push(optionsObj16[k]);
      total16 = total16 + optionsObj16[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx16 = document.getElementById("chart_16_SIV").getContext("2d");

  var myChart16 = new Chart(ctx16, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj16).sort().reverse(),
      datasets: [
        {
          fill: true,
          backgroundColor: ["#4cd5d2", "#1a3149", "#fd4b49"],
          borderWidth: 0,
          data: pieData16,
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
              formatter: function (value, ctx16) {
                return (
                  ctx16.chart.data.labels[ctx16.dataIndex] +
                  " " +
                  `${Math.round(
                    ((value / total16) * 100 + Number.EPSILON) * 100
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
              return `${value.label}: ${value.raw} (${Math.round(
                ((value.raw / total16) * 100 + Number.EPSILON) * 100
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
  return myChart16;
}
