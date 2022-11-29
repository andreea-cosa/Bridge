function drawChart13(data) {
  let optionsObj13 = {};

  data.forEach((d) => {
    if (
      d["Does your company sponsor F-1 OPT visas?"] != "" &&
      optionsObj13[d["Does your company sponsor F-1 OPT visas?"]] == undefined
    ) {
      optionsObj13[d["Does your company sponsor F-1 OPT visas?"]] = 1;
    } else if (
      d["Does your company sponsor F-1 OPT visas?"] != "" &&
      optionsObj13[d["Does your company sponsor F-1 OPT visas?"]] != undefined
    ) {
      optionsObj13[d["Does your company sponsor F-1 OPT visas?"]] =
        optionsObj13[d["Does your company sponsor F-1 OPT visas?"]] + 1;
    }
  });

  let pieData13 = [];
  let total13 = 0;

  Object.keys(optionsObj13)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData13.push(optionsObj13[k]);
      total13 = total13 + optionsObj13[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx13 = document.getElementById("chart_13_F1").getContext("2d");

  var myChart13 = new Chart(ctx13, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj13).sort().reverse(),
      datasets: [
        {
          fill: true,
          backgroundColor: ["#4cd5d2", "#1a3149", "#fd4b49"],
          borderWidth: 0,
          data: pieData13,
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
              formatter: function (value, ctx13) {
                return (
                  ctx13.chart.data.labels[ctx13.dataIndex] +
                  " " +
                  `${Math.round(
                    ((value / total13) * 100 + Number.EPSILON) * 100
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
                ((value.raw / total13) * 100 + Number.EPSILON) * 100
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
  return myChart13;
}
