function drawChart8(data) {
  let optionsObj8 = {};

  data.forEach((d) => {
    if (
      d["Does your company sponsor L-1 visas?"] != "" &&
      optionsObj8[d["Does your company sponsor L-1 visas?"]] == undefined
    ) {
      optionsObj8[d["Does your company sponsor L-1 visas?"]] = 1;
    } else if (
      d["Does your company sponsor L-1 visas?"] != "" &&
      optionsObj8[d["Does your company sponsor L-1 visas?"]] != undefined
    ) {
      optionsObj8[d["Does your company sponsor L-1 visas?"]] =
        optionsObj8[d["Does your company sponsor L-1 visas?"]] + 1;
    }
  });

  let pieData8 = [];
  let total8 = 0;

  Object.keys(optionsObj8)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData8.push(optionsObj8[k]);
      total8 = total8 + optionsObj8[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx8 = document.getElementById("chart_8_L1").getContext("2d");

  var myChart8 = new Chart(ctx8, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj8).sort().reverse(),
      datasets: [
        {
          fill: true,
          backgroundColor: ["#4cd5d2", "#1a3149", "#fd4b49"],
          borderWidth: 0,
          data: pieData8,
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
              formatter: function (value, ctx8) {
                return (
                  ctx8.chart.data.labels[ctx8.dataIndex] +
                  " " +
                  `${
                    Math.round(
                      ((value / total8) * 100 + Number.EPSILON) * 100
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
                  ((value.raw / total8) * 100 + Number.EPSILON) * 100
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
  return myChart8;
}
