const htmlLegendPlugin_chart_34_liquidated_damages = {
  id: "chart_34_liquidated_damages_legends",
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(
      chart,
      "chart_34_liquidated_damages_legends"
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
            "#2bf6a6",
            "#1a3149",
            "#fd4b49",
            "#4cd5d2",
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
          // displayColors: false,

          // bodyFont: {
          //   size: 14,
          // },
          // callbacks: {
          //   label: function (value, context) {
          //     return `${value.label}: ${value.raw} (${
          //       Math.round(
          //         ((value.raw / total34) * 100 + Number.EPSILON) * 100
          //       ) / 100
          //     })%`;
          //   },
          // },
          enabled: false,
          position: "nearest",
          external: function (context) {
            externalTooltipHandler(context, total34);
          },
        },
        legend: {
          display: false,
          position: "right",
          labels: {
            generateLabels: (chart) =>
              chart.data.labels.map((l, i) => ({
                datasetIndex: 0,
                index: i,
                text: l.length > 35 ? l.substring(0, 38) : l,
                fillStyle: chart.data.datasets[0].backgroundColor[i],
                strokeStyle: chart.data.datasets[0].backgroundColor[i],
                hidden: false,
              })),
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
    plugins: [htmlLegendPlugin_chart_34_liquidated_damages],
  });
  return myChart34;
}
