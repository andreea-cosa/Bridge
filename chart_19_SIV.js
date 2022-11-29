function drawChart19(data) {
  let optionsObj19 = {};

  data.forEach((d) => {
    if (
      d[
      "For PERM-based Green Cards, the employer is required to cover the cost of the PERM but either the employer or employee can cover the cost of the I-140 and I-485 processes. What portion of I-140 costs do you cover?"
      ] != "" &&
      optionsObj19[
      d[
      "For PERM-based Green Cards, the employer is required to cover the cost of the PERM but either the employer or employee can cover the cost of the I-140 and I-485 processes. What portion of I-140 costs do you cover?"
      ]
      ] == undefined
    ) {
      optionsObj19[
        d[
        "For PERM-based Green Cards, the employer is required to cover the cost of the PERM but either the employer or employee can cover the cost of the I-140 and I-485 processes. What portion of I-140 costs do you cover?"
        ]
      ] = 1;
    } else if (
      d[
      "For PERM-based Green Cards, the employer is required to cover the cost of the PERM but either the employer or employee can cover the cost of the I-140 and I-485 processes. What portion of I-140 costs do you cover?"
      ] != "" &&
      optionsObj19[
      d[
      "For PERM-based Green Cards, the employer is required to cover the cost of the PERM but either the employer or employee can cover the cost of the I-140 and I-485 processes. What portion of I-140 costs do you cover?"
      ]
      ] != undefined
    ) {
      optionsObj19[
        d[
        "For PERM-based Green Cards, the employer is required to cover the cost of the PERM but either the employer or employee can cover the cost of the I-140 and I-485 processes. What portion of I-140 costs do you cover?"
        ]
      ] =
        optionsObj19[
        d[
        "For PERM-based Green Cards, the employer is required to cover the cost of the PERM but either the employer or employee can cover the cost of the I-140 and I-485 processes. What portion of I-140 costs do you cover?"
        ]
        ] + 1;
    }
  });

  let pieData19 = [];
  let total19 = 0;

  Object.keys(optionsObj19)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData19.push(optionsObj19[k]);
      total19 = total19 + optionsObj19[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx19 = document.getElementById("chart_19_SIV").getContext("2d");

  var myChart19 = new Chart(ctx19, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj19).sort().reverse(),
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
          data: pieData19,
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
              formatter: function (value, ctx19) {
                return (
                  ctx19.chart.data.labels[ctx19.dataIndex] +
                  " " +
                  `${Math.round(
                    ((value / total19) * 100 + Number.EPSILON) * 100
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
                ((value.raw / total19) * 100 + Number.EPSILON) * 100
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
  return myChart19;
}
