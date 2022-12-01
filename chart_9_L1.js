function drawChart9(data) {
  let optionsObj9 = {};

  data.forEach((d) => {
    if (
      d["Are L-1 employees eligible for H-1B lottery sponsorship?"] != "" &&
      optionsObj9[
      d["Are L-1 employees eligible for H-1B lottery sponsorship?"]
      ] == undefined
    ) {
      optionsObj9[
        d["Are L-1 employees eligible for H-1B lottery sponsorship?"]
      ] = 1;
    } else if (
      d["Are L-1 employees eligible for H-1B lottery sponsorship?"] != "" &&
      optionsObj9[
      d["Are L-1 employees eligible for H-1B lottery sponsorship?"]
      ] != undefined
    ) {
      optionsObj9[
        d["Are L-1 employees eligible for H-1B lottery sponsorship?"]
      ] =
        optionsObj9[
        d["Are L-1 employees eligible for H-1B lottery sponsorship?"]
        ] + 1;
    }
  });

  let pieData9 = [];
  let total9 = 0;

  Object.keys(optionsObj9)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData9.push(optionsObj9[k]);
      total9 = total9 + optionsObj9[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx9 = document.getElementById("chart_9_L1").getContext("2d");

  var myChart9 = new Chart(ctx9, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj9).sort().reverse(),
      datasets: [
        {
          fill: true,
          backgroundColor: ["#4cd5d2", "#1a3149", "#fd4b49"],
          borderWidth: 0,
          data: pieData9,
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
              formatter: function (value, ctx9) {
                return (
                  ctx9.chart.data.labels[ctx9.dataIndex] +
                  " " +
                  `${Math.round(
                    ((value / total9) * 100 + Number.EPSILON) * 100
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
          //         ((value.raw / total9) * 100 + Number.EPSILON) * 100
          //       ) / 100
          //     })%`;
          //   },
          // },
          enabled: false,
          position: "nearest",
          external: function (context) {
            externalTooltipHandler(context, total9);
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
  return myChart9;
}
