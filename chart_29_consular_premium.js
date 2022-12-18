const htmlLegendPlugin_chart_29_consular_premium = {
  id: "chart_29_consular_premium_legends",
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(
      chart,
      "chart_29_consular_premium_legends"
    );

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach((item) => {
      const li = document.createElement("li");
      li.style.alignItems = "center";
      li.style.cursor = "pointer";
      li.style.display = "flex";
      li.style.flexDirection = "row";
      li.style.marginLeft = "10px";
      // li.style.borderRadius = "15px";

      li.onclick = () => {
        const { type } = chart.config;
        if (type === "pie" || type === "doughnut") {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(
            item.datasetIndex,
            !chart.isDatasetVisible(item.datasetIndex)
          );
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement("span");
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + "px";
      boxSpan.style.display = "inline-block";
      boxSpan.style.height = "20px";
      boxSpan.style.marginRight = "10px";
      boxSpan.style.width = "20px";
      boxSpan.style.borderRadius = "40px";

      // Text
      const textContainer = document.createElement("p");
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.textAlign = "start";
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  },
};

function drawChart29(data) {
  let optionsObj29 = {};

  data.forEach((d) => {
    if (
      d[
        "What portion of consular processing costs do you cover when an employee goes abroad to obtain a visa stamp?"
      ] != "" &&
      optionsObj29[
        d[
          "What portion of consular processing costs do you cover when an employee goes abroad to obtain a visa stamp?"
        ]
      ] == undefined
    ) {
      optionsObj29[
        d[
          "What portion of consular processing costs do you cover when an employee goes abroad to obtain a visa stamp?"
        ]
      ] = 1;
    } else if (
      d[
        "What portion of consular processing costs do you cover when an employee goes abroad to obtain a visa stamp?"
      ] != "" &&
      optionsObj29[
        d[
          "What portion of consular processing costs do you cover when an employee goes abroad to obtain a visa stamp?"
        ]
      ] != undefined
    ) {
      optionsObj29[
        d[
          "What portion of consular processing costs do you cover when an employee goes abroad to obtain a visa stamp?"
        ]
      ] =
        optionsObj29[
          d[
            "What portion of consular processing costs do you cover when an employee goes abroad to obtain a visa stamp?"
          ]
        ] + 1;
    }
  });

  let pieData28 = [];
  let total29 = 0;

  Object.keys(optionsObj29)
    .sort()
    .reverse()
    .forEach((k) => {
      pieData28.push(optionsObj29[k]);
      total29 = total29 + optionsObj29[k];
    });

  Chart.register(ChartDataLabels); //register data labels plugin
  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx29 = document
    .getElementById("chart_29_consular_premium")
    .getContext("2d");

  var myChart29 = new Chart(ctx29, {
    type: "pie",
    data: {
      //labels: ["Yes", "No"],
      labels: Object.keys(optionsObj29).sort().reverse(),
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
          data: pieData28,
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
              formatter: function (value, ctx29) {
                return (
                  ctx29.chart.data.labels[ctx29.dataIndex] +
                  " " +
                  `${
                    Math.round(
                      ((value / total29) * 100 + Number.EPSILON) * 100
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
          //         ((value.raw / total29) * 100 + Number.EPSILON) * 100
          //       ) / 100
          //     })%`;
          //   },
          // },
          enabled: false,
          position: "nearest",
          external: function (context) {
            externalTooltipHandler(context, total29);
          },
        },
        legend: {
          display: false,
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
    plugins: [htmlLegendPlugin_chart_29_consular_premium],
  });
  return myChart29;
}
