function drawChart2(data) {
  let optionsObj2 = {};

  data.forEach((d) => {
    if (
      d[
        "Do you require that the H-1B candidate has a minimum amount of time remaining in their overall 6-year maximum for them to be eligible for hire?"
      ] != "" &&
      optionsObj2[
        d[
          "Do you require that the H-1B candidate has a minimum amount of time remaining in their overall 6-year maximum for them to be eligible for hire?"
        ]
      ] == undefined
    ) {
      optionsObj2[
        d[
          "Do you require that the H-1B candidate has a minimum amount of time remaining in their overall 6-year maximum for them to be eligible for hire?"
        ]
      ] = 1;
    } else if (
      d[
        "Do you require that the H-1B candidate has a minimum amount of time remaining in their overall 6-year maximum for them to be eligible for hire?"
      ] != "" &&
      optionsObj2[
        d[
          "Do you require that the H-1B candidate has a minimum amount of time remaining in their overall 6-year maximum for them to be eligible for hire?"
        ]
      ] != undefined
    ) {
      optionsObj2[
        d[
          "Do you require that the H-1B candidate has a minimum amount of time remaining in their overall 6-year maximum for them to be eligible for hire?"
        ]
      ] =
        optionsObj2[
          d[
            "Do you require that the H-1B candidate has a minimum amount of time remaining in their overall 6-year maximum for them to be eligible for hire?"
          ]
        ] + 1;
    }
  });

  let pieData2 = [];
  let total2 = 0;

  Object.keys(optionsObj2)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData2.push(optionsObj2[k]);
      total2 = total2 + optionsObj2[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx2 = document.getElementById("chart_2_h1b").getContext("2d");

  var myChart2 = new Chart(ctx2, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj2).sort().reverse(),
      datasets: [
        {
          fill: true,
          backgroundColor: ["#4cd5d2", "#1a3149", "#fd4b49"],
          borderWidth: 0,
          data: pieData2,
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
              formatter: function (value, ctx2) {
                return (
                  ctx2.chart.data.labels[ctx2.dataIndex] +
                  " " +
                  `${
                    Math.round(
                      ((value / total2) * 100 + Number.EPSILON) * 100
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
                  ((value.raw / total2) * 100 + Number.EPSILON) * 100
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
  return myChart2;
}
