function drawChart1(data) {
  let optionsObj1 = {};

  data.forEach((d) => {
    if (
      d["Does your company hire candidates on H-1B visas?"] != "" &&
      optionsObj1[d["Does your company hire candidates on H-1B visas?"]] ==
      undefined
    ) {
      optionsObj1[d["Does your company hire candidates on H-1B visas?"]] = 1;
    } else if (
      d["Does your company hire candidates on H-1B visas?"] != "" &&
      optionsObj1[d["Does your company hire candidates on H-1B visas?"]] !=
      undefined
    ) {
      optionsObj1[d["Does your company hire candidates on H-1B visas?"]] =
        optionsObj1[d["Does your company hire candidates on H-1B visas?"]] + 1;
    }
  });

  let pieData1 = [];
  let total1 = 0;

  Object.keys(optionsObj1)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData1.push(optionsObj1[k]);
      total1 = total1 + optionsObj1[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  // Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx1 = document.getElementById("chart_1_h1b").getContext("2d");

  var myChart1 = new Chart(ctx1, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj1).sort().reverse(),
      datasets: [
        {
          fill: true,
          backgroundColor: ["#4cd5d2", "#1a3149"],
          borderWidth: 0,
          data: pieData1,
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
              formatter: function (value, ctx1) {
                return (
                  ctx1.chart.data.labels[ctx1.dataIndex] +
                  " " +
                  `${Math.round(
                    ((value / total1) * 100 + Number.EPSILON) * 100
                  ) / 100
                  }%`
                );
              },
              offset: -3,
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
                ((value.raw / total1) * 100 + Number.EPSILON) * 100
              ) / 100
                })%`;
            },
          },
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            padding: 21,
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
  return myChart1;
}
