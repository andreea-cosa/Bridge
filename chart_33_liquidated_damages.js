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
                  ((value.raw / total33) * 100 + Number.EPSILON) * 100
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
  });
  return myChart33;
}
