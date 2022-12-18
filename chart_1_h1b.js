const htmlLegendPlugin = {
  id: "chart_1_h1b_legends",
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, "chart_1_h1b_legends");

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
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  },
};

let total1 = 0;

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
      aspectRatio: 1,
      layout: {
        padding: {
          top: 11,
        },
      },

      plugins: {
        htmlLegend: {
          // ID of the container to put the legend in
          containerID: "chart_1_h1b_legends",
        },
        legend: {
          display: false,
        },
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
                  `${
                    Math.round(
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
          // displayColors: false,
          // bodyFont: {
          //   size: 14,
          // },
          // callbacks: {
          //   label: function (value, context) {
          //     return `${value.label}: ${value.raw} (${
          //       Math.round(
          //         ((value.raw / total1) * 100 + Number.EPSILON) * 100
          //       ) / 100
          //     })%`;
          //   },
          // },
          enabled: false,
          position: "nearest",
          external: function (context) {
            externalTooltipHandler(context, total1);
          },
        },
        legend: {
          display: false,
          position: "right",
          labels: {
            padding: 21,
            usePointStyle: true,
            boxWidth: 7,
          },
          // legendCallback: function (chart) {
          //   var text = [];
          //   text.push('<ul class="0-legend">');
          //   var ds = chart.data.datasets[0];
          //   var sum = ds.data.reduce(function add(a, b) {
          //     return a + b;
          //   }, 0);
          //   for (var i = 0; i < ds.data.length; i++) {
          //     text.push("<li>");
          //     var perc = Math.round((100 * ds.data[i]) / sum, 0);
          //     text.push(
          //       '<span style="background-color:' +
          //         ds.backgroundColor[i] +
          //         '">' +
          //         "</span>" +
          //         chart.data.labels[i] +
          //         " (" +
          //         ds.data[i] +
          //         ") (" +
          //         perc +
          //         "%)"
          //     );
          //     text.push("</li>");
          //   }
          //   text.push("</ul>");
          //   return text.join("");
          // },
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
    plugins: [htmlLegendPlugin],
  });

  return myChart1;
}
