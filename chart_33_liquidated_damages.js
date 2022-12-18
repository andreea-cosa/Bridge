const htmlLegendPlugin_chart_33_liquidated_damages = {
  id: "chart_33_liquidated_damages_legends",
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(
      chart,
      "chart_33_liquidated_damages_legends"
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

function drawChart33(data) {
  let optionsObj33 = {};
  data.forEach((d, i) => {
    if (
      d["Percent of damages recovered (modified)"] != "" &&
      optionsObj33[d["Percent of damages recovered (modified)"]] == undefined
    ) {
      optionsObj33[d["Percent of damages recovered (modified)"]] = 1;
    } else if (
      d["Percent of damages recovered (modified)"] != "" &&
      optionsObj33[d["Percent of damages recovered (modified)"]] != undefined
    ) {
      optionsObj33[d["Percent of damages recovered (modified)"]] =
        optionsObj33[d["Percent of damages recovered (modified)"]] + 1;
    }
  });

  let labelsArr33 = [];
  Object.keys(optionsObj33).forEach((d) => {
    labelsArr33.push(parseInt(d));
  });

  let lineData33 = [];
  let total33 = 0;
  const BORDER = true;
  const CHART_AREA = true;
  const TICKS = true;

  Object.keys(optionsObj33)
    .sort()
    .reverse()
    .forEach((k) => {
      lineData33.push(optionsObj33[k]);
      total33 = total33 + optionsObj33[k];
    });

  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx33 = document
    .getElementById("chart_33_liquidated_damages")
    .getContext("2d");

  var myChart33 = new Chart(ctx33, {
    type: "line",
    data: {
      labels: labelsArr33,
      datasets: [
        {
          label: "Percent",
          fill: false,
          backgroundColor: ["#4cd5d2"],
          borderColor: ["#4cd5d2"],
          borderWidth: 3,
          data: lineData33,
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
          //         ((value.raw / total33) * 100 + Number.EPSILON) * 100
          //       ) / 100
          //     })%`;
          //   },
          // },
          enabled: false,
          position: "nearest",
          external: function (context) {
            externalTooltipHandler(context, total33);
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
          grid: {
            display: false,
            drawBorder: BORDER,
            drawOnChartArea: CHART_AREA,
            drawTicks: TICKS,
          },
        },
        y: {
          grid: {
            drawBorder: false,
            color: function (context) {
              if (context.tick.value < 0) {
                return Utils.CHART_COLORS.green;
              } else if (context.tick.value < 0) {
                return Utils.CHART_COLORS.red;
              }
              return "#444";
            },
          },
        },
      },
    },
    plugins: [htmlLegendPlugin_chart_33_liquidated_damages],
  });
  return myChart33;
}
