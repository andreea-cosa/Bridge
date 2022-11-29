function drawChart22(data) {
  let optionsObj22 = {};

  data.forEach((d) => {
    if (
      d[
      "Do you limit which occupations/jobs you are willing to sponsor for a non-immigrant visa?"
      ] != "" &&
      optionsObj22[
      d[
      "Do you limit which occupations/jobs you are willing to sponsor for a non-immigrant visa?"
      ]
      ] == undefined
    ) {
      optionsObj22[
        d[
        "Do you limit which occupations/jobs you are willing to sponsor for a non-immigrant visa?"
        ]
      ] = 1;
    } else if (
      d[
      "Do you limit which occupations/jobs you are willing to sponsor for a non-immigrant visa?"
      ] != "" &&
      optionsObj22[
      d[
      "Do you limit which occupations/jobs you are willing to sponsor for a non-immigrant visa?"
      ]
      ] != undefined
    ) {
      optionsObj22[
        d[
        "Do you limit which occupations/jobs you are willing to sponsor for a non-immigrant visa?"
        ]
      ] =
        optionsObj22[
        d[
        "Do you limit which occupations/jobs you are willing to sponsor for a non-immigrant visa?"
        ]
        ] + 1;
    }
  });

  let pieData22 = [];
  let total22 = 0;

  Object.keys(optionsObj22)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData22.push(optionsObj22[k]);
      total22 = total22 + optionsObj22[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx22 = document.getElementById("chart_22_SIV").getContext("2d");

  var myChart22 = new Chart(ctx22, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj22).sort().reverse(),
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
          data: pieData22,
        },
      ],
    },
    options: {
      animation: {
        duration: 2001,
      },
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 0.7,
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
              formatter: function (value, ctx22) {
                return (
                  ctx22.chart.data.labels[ctx22.dataIndex] +
                  " " +
                  `${Math.round(
                    ((value / total22) * 100 + Number.EPSILON) * 100
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
                ((value.raw / total22) * 100 + Number.EPSILON) * 100
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
  return myChart22;
}
