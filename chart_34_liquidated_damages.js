function drawChart34(data) {
  let optionsObj34 = {};

  data.forEach((d) => {
    if (
      d["Who is responsible for immigration costs at your company?"] != "" &&
      optionsObj34[
        d["Who is responsible for immigration costs at your company?"]
      ] == undefined
    ) {
      optionsObj34[
        d["Who is responsible for immigration costs at your company?"]
      ] = 1;
    } else if (
      d["Who is responsible for immigration costs at your company?"] != "" &&
      optionsObj34[
        d["Who is responsible for immigration costs at your company?"]
      ] != undefined
    ) {
      optionsObj34[
        d["Who is responsible for immigration costs at your company?"]
      ] =
        optionsObj34[
          d["Who is responsible for immigration costs at your company?"]
        ] + 1;
    }
  });

  let pieData34 = [];
  let total34 = 0;

  Object.keys(optionsObj34)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData34.push(optionsObj34[k]);
      total34 = total34 + optionsObj34[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx34 = document
    .getElementById("chart_34_liquidated_damages")
    .getContext("2d");

  var myChart34 = new Chart(ctx34, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj34).sort().reverse(),
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
          data: pieData34,
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
              formatter: function (value, ctx34) {
                return ctx34.chart.data.labels[ctx34.dataIndex].length > 25
                  ? ctx34.chart.data.labels[ctx34.dataIndex].substring(0, 25) +
                      "..."
                  : ctx34.chart.data.labels[ctx34.dataIndex] +
                      " " +
                      `${
                        Math.round(
                          ((value / total34) * 100 + Number.EPSILON) * 100
                        ) / 100
                      }%`;
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
                  ((value.raw / total34) * 100 + Number.EPSILON) * 100
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
  return myChart34;
}
