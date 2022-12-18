const htmlLegendPlugin_chart_32_liquidated_damages = {
  id: "chart_32_liquidated_damages_legends",
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(
      chart,
      "chart_32_liquidated_damages_legends"
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

function drawChart32(data) {
  let optionsObj32 = {};
  data.forEach((d, i) => {
    if (
      d["Tenure of liquidated damages clause (modified) "] != "" &&
      optionsObj32[d["Tenure of liquidated damages clause (modified) "]] ==
        undefined
    ) {
      optionsObj32[d["Tenure of liquidated damages clause (modified) "]] = 1;
    } else if (
      d["Tenure of liquidated damages clause (modified) "] != "" &&
      optionsObj32[d["Tenure of liquidated damages clause (modified) "]] !=
        undefined
    ) {
      optionsObj32[d["Tenure of liquidated damages clause (modified) "]] =
        optionsObj32[d["Tenure of liquidated damages clause (modified) "]] + 1;
    }
  });

  let labelsArr = [];
  Object.keys(optionsObj32).forEach((d) => {
    labelsArr.push(parseInt(d));
  });

  let lineData32 = [];
  let total32 = 0;
  const DISPLAY = true;
  const BORDER = true;
  const CHART_AREA = true;
  const TICKS = true;

  Object.keys(optionsObj32)
    .sort()
    .reverse()
    .forEach((k) => {
      lineData32.push(optionsObj32[k]);
      total32 = total32 + optionsObj32[k];
    });

  //   Chart.register(ChartDeferred); //register chart deferred plugin
  var ctx32 = document
    .getElementById("chart_32_liquidated_damages")
    .getContext("2d");

  var myChart32 = new Chart(ctx32, {
    type: "line",
    data: {
      labels: labelsArr,
      datasets: [
        {
          label: "Tenure",
          fill: false,
          backgroundColor: ["#4cd5d2"],
          borderColor: ["#4cd5d2"],
          borderWidth: 3,
          data: lineData32,
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
          //         ((value.raw / total32) * 100 + Number.EPSILON) * 100
          //       ) / 100
          //     })%`;
          //   },
          // },
          enabled: false,
          position: "nearest",
          external: function (context) {
            externalTooltipHandler(context, total32);
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
    plugins: [htmlLegendPlugin_chart_32_liquidated_damages],
  });
  return myChart32;
}
