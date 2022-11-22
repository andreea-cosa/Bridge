function drawChart10(data) {
  let optionsObj10 = {};

  data.forEach((d) => {
    if (
      d["Are L-1 employees eligible for Green Card sponsorship?"] != "" &&
      optionsObj10[
        d["Are L-1 employees eligible for Green Card sponsorship?"]
      ] == undefined
    ) {
      optionsObj10[
        d["Are L-1 employees eligible for Green Card sponsorship?"]
      ] = 1;
    } else if (
      d["Are L-1 employees eligible for Green Card sponsorship?"] != "" &&
      optionsObj10[
        d["Are L-1 employees eligible for Green Card sponsorship?"]
      ] != undefined
    ) {
      optionsObj10[
        d["Are L-1 employees eligible for Green Card sponsorship?"]
      ] =
        optionsObj10[
          d["Are L-1 employees eligible for Green Card sponsorship?"]
        ] + 1;
    }
  });

  let pieData10 = [];
  let total10 = 0;

  Object.keys(optionsObj10)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData10.push(optionsObj10[k]);
      total10 = total10 + optionsObj10[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx10 = document.getElementById("chart_10_L1").getContext("2d");

  var myChart10 = new Chart(ctx10, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj10).sort().reverse(),
      datasets: [
        {
          fill: true,
          backgroundColor: ["#4cd5d2", "#1a3149", "#fd4b49"],
          borderWidth: 0,
          data: pieData10,
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
              formatter: function (value, ctx10) {
                return (
                  ctx10.chart.data.labels[ctx10.dataIndex] +
                  " " +
                  `${
                    Math.round(
                      ((value / total10) * 100 + Number.EPSILON) * 100
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
                  ((value.raw / total10) * 100 + Number.EPSILON) * 100
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
  return myChart10;
}
