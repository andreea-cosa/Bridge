d3.csv("https://uploads-ssl.webflow.com/5d678d8bf62c496d0b518eb4/636e58544fd41cf6c6f1d69f_master_data.csv").then(
  function (rawData) {
    let industryObj = {},
      employeesObj = {},
      stateObj = {};

    $(document).ready(function () {
      $(".industry_class").multiselect({
        includeSelectAllOption: true,
      });
    });

    $(document).ready(function () {
      $(".employee_class").multiselect({
        includeSelectAllOption: true,
      });
    });

    $(document).ready(function () {
      $(".state_class").multiselect({
        includeSelectAllOption: true,
      });
    });

    var selectedIndustry = [],
      selectedEmployee = [],
      selectedState = [];

    let industryArr = [],
      employeesArr = [],
      stateArr = [];

    rawData.forEach((d) => {
      if (
        employeesObj[d["How many employees work at your company?"]] == undefined
      ) {
        employeesObj[d["How many employees work at your company?"]] = 1;
        employeesArr.push(d["How many employees work at your company?"]);
      }

      if (
        stateObj[d["What state is your company headquartered in?"]] == undefined
      ) {
        stateObj[d["What state is your company headquartered in?"]] = 1;
        stateArr.push(d["What state is your company headquartered in?"]);
      }

      if (
        industryObj[d["What industry is your company in? (modified)"]] ==
        undefined
      ) {
        industryObj[d["What industry is your company in? (modified)"]] = 1;
        industryArr.push(d["What industry is your company in? (modified)"]);
      }
    });

    industryArr.sort();
    employeesArr.sort();
    stateArr.sort();
    industryArr.forEach((d) => {
      $(".industry_class").append(
        $("<option>", {
          value: d,
          text: d,
        })
      );
    });

    stateArr.forEach((d) => {
      $(".state_class").append(
        $("<option>", {
          value: d,
          text: d,
        })
      );
    });

    employeesArr.forEach((d) => {
      $(".employee_class").append(
        $("<option>", {
          value: d,
          text: d.split(" ")[1],
        })
      );
    });

    /////charts callings and passing data
    let chart1,
      chart2,
      chart3,
      chart4,
      percentile5 = 10,
      percentile6 = 10,
      percentile7 = 10,
      chart8,
      chart9,
      chart10,
      percentile11 = 10,
      percentile12 = 10,
      chart13,
      percentile14 = 10,
      chart15,
      chart16,
      chart17,
      chart18,
      chart19,
      percentile20 = 10,
      percentile21 = 10,
      chart22,
      chart24,
      chart25,
      chart26,
      chart27,
      chart28,
      chart29,
      chart30,
      chart31,
      chart32,
      percentile32 = 10,
      percentile33 = 10,
      chart33,
      chart34;

    drawCharts(rawData);

    ///filters calling
    $(".state_class").change(function (d) {
      selectedState = $(this).val();

      $(".state_class").val(selectedState).multiselect("refresh");

      let tempData = filterData(
        selectedEmployee,
        selectedIndustry,
        selectedState
      );

      deleteCharts();
      // if (tempData.length > 0) {
      drawCharts(tempData);
      // }
    });

    $(".industry_class").change(function (d) {
      selectedIndustry = $(this).val();
      $(".industry_class").val(selectedIndustry).multiselect("refresh");

      let tempData = filterData(
        selectedEmployee,
        selectedIndustry,
        selectedState
      );

      deleteCharts();
      if (tempData.length > 0) {
        drawCharts(tempData);
      }
    });

    $(".employee_class").change(function (d) {
      selectedEmployee = $(this).val();
      $(".employee_class").val(selectedEmployee).multiselect("refresh");

      let tempData = filterData(
        selectedEmployee,
        selectedIndustry,
        selectedState
      );

      deleteCharts();
      if (tempData.length > 0) {
        drawCharts(tempData);
      }
    });

    $(".reset").click(function (d) {
      selectedEmployee = [];
      selectedIndustry = [];
      selectedState = [];
      $(".state_class").val([]).multiselect("refresh");
      $(".industry_class").val([]).multiselect("refresh");
      $(".employee_class").val([]).multiselect("refresh");

      percentile5 = 10;
      percentile6 = 10;
      percentile7 = 10;
      percentile11 = 10;
      percentile12 = 10;
      percentile14 = 10;
      percentile20 = 10;
      percentile21 = 10;
      percentile32 = 10;
      percentile33 = 10;

      document.getElementById("percentile_5_h1b_input1").checked = true;
      document.getElementById("percentile_6_h1b_input1").checked = true;
      document.getElementById("percentile_7_h1b_input1").checked = true;
      document.getElementById("percentile_11_L1_input1").checked = true;
      document.getElementById("percentile_12_L1_input1").checked = true;
      document.getElementById("percentile_14_F1_input1").checked = true;
      document.getElementById("percentile_20_SIV_input1").checked = true;
      document.getElementById("percentile_21_SIV_input1").checked = true;
      document.getElementById(
        "percentile_32_liquidated_damages_input1"
      ).checked = true;
      document.getElementById(
        "percentile_33_liquidated_damages_input1"
      ).checked = true;

      deleteCharts();
      drawCharts(rawData);
    });

    $("#percentile_5_h1b_tab1").click(function (d) {
      percentile5 = 10;
      calculatePercentile_5_h1b(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile5
      );
    });

    $("#percentile_5_h1b_tab2").click(function (d) {
      percentile5 = 25;
      calculatePercentile_5_h1b(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile5
      );
    });

    $("#percentile_5_h1b_tab3").click(function (d) {
      percentile5 = 50;
      calculatePercentile_5_h1b(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile5
      );
    });

    $("#percentile_5_h1b_tab4").click(function (d) {
      percentile5 = 75;
      calculatePercentile_5_h1b(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile5
      );
    });

    $("#percentile_5_h1b_tab5").click(function (d) {
      percentile5 = 90;
      calculatePercentile_5_h1b(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile5
      );
    });

    ///Percentile 6
    $("#percentile_6_h1b_tab1").click(function (d) {
      percentile6 = 10;
      calculatePercentile_6_h1b(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile6
      );
    });

    $("#percentile_6_h1b_tab2").click(function (d) {
      percentile6 = 25;
      calculatePercentile_6_h1b(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile6
      );
    });

    $("#percentile_6_h1b_tab3").click(function (d) {
      percentile6 = 50;
      calculatePercentile_6_h1b(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile6
      );
    });

    $("#percentile_6_h1b_tab4").click(function (d) {
      percentile6 = 75;
      calculatePercentile_6_h1b(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile6
      );
    });

    $("#percentile_6_h1b_tab5").click(function (d) {
      percentile6 = 90;
      calculatePercentile_6_h1b(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile6
      );
    });

    ///Percentile 7
    $("#percentile_7_h1b_tab1").click(function (d) {
      percentile7 = 10;
      calculatePercentile_7_h1b(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile7
      );
    });

    $("#percentile_7_h1b_tab2").click(function (d) {
      percentile7 = 25;
      calculatePercentile_7_h1b(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile7
      );
    });

    $("#percentile_7_h1b_tab3").click(function (d) {
      percentile7 = 50;
      calculatePercentile_7_h1b(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile7
      );
    });

    $("#percentile_7_h1b_tab4").click(function (d) {
      console.log("786 75th percentile");
      percentile7 = 75;
      calculatePercentile_7_h1b(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile7
      );
    });

    $("#percentile_7_h1b_tab5").click(function (d) {
      percentile7 = 90;
      calculatePercentile_7_h1b(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile7
      );
    });

    ///Percentile 11
    $("#percentile_11_L1_tab1").click(function (d) {
      percentile11 = 10;
      calculatePercentile_11_L1(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile11
      );
    });

    $("#percentile_11_L1_tab2").click(function (d) {
      percentile11 = 25;
      calculatePercentile_11_L1(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile11
      );
    });

    $("#percentile_11_L1_tab3").click(function (d) {
      percentile11 = 50;
      calculatePercentile_11_L1(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile11
      );
    });

    $("#percentile_11_L1_tab4").click(function (d) {
      percentile11 = 75;
      calculatePercentile_11_L1(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile11
      );
    });

    $("#percentile_11_L1_tab5").click(function (d) {
      percentile11 = 90;
      calculatePercentile_11_L1(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile11
      );
    });

    ///Percentile 12
    $("#percentile_12_L1_tab1").click(function (d) {
      percentile12 = 10;
      calculatePercentile_12_L1(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile12
      );
    });

    $("#percentile_12_L1_tab2").click(function (d) {
      percentile12 = 25;
      calculatePercentile_12_L1(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile12
      );
    });

    $("#percentile_12_L1_tab3").click(function (d) {
      percentile12 = 50;
      calculatePercentile_12_L1(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile12
      );
    });

    $("#percentile_12_L1_tab4").click(function (d) {
      percentile12 = 75;
      calculatePercentile_12_L1(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile12
      );
    });

    $("#percentile_12_L1_tab5").click(function (d) {
      percentile12 = 90;
      calculatePercentile_12_L1(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile12
      );
    });

    ///Percentile 14
    $("#percentile_14_F1_tab1").click(function (d) {
      percentile14 = 10;
      calculatePercentile_14_F1(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile14
      );
    });

    $("#percentile_14_F1_tab2").click(function (d) {
      percentile14 = 25;
      calculatePercentile_14_F1(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile14
      );
    });

    $("#percentile_14_F1_tab3").click(function (d) {
      percentile14 = 50;
      calculatePercentile_14_F1(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile14
      );
    });

    $("#percentile_14_F1_tab4").click(function (d) {
      percentile14 = 75;
      calculatePercentile_14_F1(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile14
      );
    });

    $("#percentile_14_F1_tab5").click(function (d) {
      percentile14 = 90;
      calculatePercentile_14_F1(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile14
      );
    });

    ///Percentile 20
    $("#percentile_20_SIV_tab1").click(function (d) {
      percentile20 = 10;
      calculatePercentile_20_SIV(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile20
      );
    });

    $("#percentile_20_SIV_tab2").click(function (d) {
      percentile20 = 25;
      calculatePercentile_20_SIV(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile20
      );
    });

    $("#percentile_20_SIV_tab3").click(function (d) {
      percentile20 = 50;
      calculatePercentile_20_SIV(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile20
      );
    });

    $("#percentile_20_SIV_tab4").click(function (d) {
      percentile20 = 75;
      calculatePercentile_20_SIV(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile20
      );
    });

    $("#percentile_20_SIV_tab5").click(function (d) {
      percentile20 = 90;
      calculatePercentile_20_SIV(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile20
      );
    });

    ///Percentile 21
    $("#percentile_21_SIV_tab1").click(function (d) {
      percentile21 = 10;
      calculatePercentile_21_SIV(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile21
      );
    });

    $("#percentile_21_SIV_tab2").click(function (d) {
      percentile21 = 25;
      calculatePercentile_21_SIV(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile21
      );
    });

    $("#percentile_21_SIV_tab3").click(function (d) {
      percentile21 = 50;
      calculatePercentile_21_SIV(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile21
      );
    });

    $("#percentile_21_SIV_tab4").click(function (d) {
      percentile21 = 75;
      calculatePercentile_21_SIV(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile21
      );
    });

    $("#percentile_21_SIV_tab5").click(function (d) {
      percentile21 = 90;
      calculatePercentile_21_SIV(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile21
      );
    });

    ///Percentile 32
    $("#percentile_32_liquidated_damages_tab1").click(function (d) {
      percentile32 = 10;
      calculatePercentile_32_liquidated_damages(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile32
      );
    });

    $("#percentile_32_liquidated_damages_tab2").click(function (d) {
      percentile32 = 25;
      calculatePercentile_32_liquidated_damages(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile32
      );
    });

    $("#percentile_32_liquidated_damages_tab3").click(function (d) {
      percentile32 = 50;
      calculatePercentile_32_liquidated_damages(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile32
      );
    });

    $("#percentile_32_liquidated_damages_tab4").click(function (d) {
      percentile32 = 75;
      calculatePercentile_32_liquidated_damages(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile32
      );
    });

    $("#percentile_32_liquidated_damages_tab5").click(function (d) {
      percentile32 = 90;
      calculatePercentile_32_liquidated_damages(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile32
      );
    });

    ///Percentile 33
    $("#percentile_33_liquidated_damages_tab1").click(function (d) {
      percentile33 = 10;
      calculatePercentile_33_liquidated_damages(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile33
      );
    });

    $("#percentile_33_liquidated_damages_tab2").click(function (d) {
      percentile33 = 25;
      calculatePercentile_33_liquidated_damages(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile33
      );
    });

    $("#percentile_33_liquidated_damages_tab3").click(function (d) {
      percentile33 = 50;
      calculatePercentile_33_liquidated_damages(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile33
      );
    });

    $("#percentile_33_liquidated_damages_tab4").click(function (d) {
      percentile33 = 75;
      calculatePercentile_33_liquidated_damages(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile33
      );
    });

    $("#percentile_33_liquidated_damages_tab5").click(function (d) {
      percentile33 = 90;
      calculatePercentile_33_liquidated_damages(
        filterData(selectedEmployee, selectedIndustry, selectedState),
        percentile33
      );
    });

    function filterData(selectedEmployee, selectedIndustry, selectedState) {
      let tempRawData = JSON.parse(JSON.stringify(rawData));

      let tempArr = [];
      if (selectedIndustry.length > 0) {
        tempRawData.forEach((d) => {
          selectedIndustry.forEach((b) => {
            if (
              d["What industry is your company in? (modified)"].localeCompare(
                b
              ) == 0
            ) {
              tempArr.push(d);
            }
          });
        });
        tempRawData = tempArr;
      }

      tempArr = [];

      if (selectedEmployee.length > 0) {
        tempRawData.forEach((d) => {
          selectedEmployee.forEach((b) => {
            if (
              d["How many employees work at your company?"].localeCompare(b) ==
              0
            ) {
              tempArr.push(d);
            }
          });
        });
        tempRawData = tempArr;
      }

      tempArr = [];

      if (selectedState.length > 0) {
        tempRawData.forEach((d) => {
          selectedState.forEach((b) => {
            if (
              d["What state is your company headquartered in?"].localeCompare(
                b
              ) == 0
            ) {
              tempArr.push(d);
            }
          });
        });
        tempRawData = tempArr;
      }

      return tempRawData;
    }

    function deleteCharts() {
      chart1.destroy();
      chart2.destroy();
      chart3.destroy();
      chart4.destroy();
      chart8.destroy();
      chart9.destroy();
      chart10.destroy();
      chart13.destroy();
      chart15.destroy();
      chart16.destroy();
      chart17.destroy();
      chart18.destroy();
      chart19.destroy();
      chart22.destroy();
      chart24.destroy();
      chart25.destroy();
      chart26.destroy();
      chart27.destroy();
      chart28.destroy();
      chart29.destroy();
      chart30.destroy();
      chart31.destroy();
      // chart32.destroy();
      // chart33.destroy();
      chart34.destroy();
    }

    function drawCharts(data) {
      chart1 = drawChart1(data);
      chart2 = drawChart2(data);
      chart3 = drawChart3(data);
      chart4 = drawChart4(data);
      calculatePercentile_5_h1b(data, percentile5);
      calculatePercentile_6_h1b(data, percentile6);
      calculatePercentile_7_h1b(data, percentile7);
      chart8 = drawChart8(data);
      chart9 = drawChart9(data);
      chart10 = drawChart10(data);
      calculatePercentile_11_L1(data, percentile11);
      calculatePercentile_12_L1(data, percentile12);
      chart13 = drawChart13(data);
      calculatePercentile_14_F1(data, percentile14);
      chart15 = drawChart15(data);
      chart16 = drawChart16(data);
      chart17 = drawChart17(data);
      chart18 = drawChart18(data);
      chart19 = drawChart19(data);
      calculatePercentile_20_SIV(data, percentile20);
      calculatePercentile_21_SIV(data, percentile21);
      chart22 = drawChart22(data);
      chart24 = drawChart24(data);
      chart25 = drawChart25(data);
      chart26 = drawChart26(data);
      chart27 = drawChart27(data);
      chart28 = drawChart28(data);
      chart29 = drawChart29(data);
      chart30 = drawChart30(data);
      chart31 = drawChart31(data);
      //chart32 = drawChart32(data);
      calculatePercentile_32_liquidated_damages(data, percentile32);
      calculatePercentile_33_liquidated_damages(data, percentile33);
      // chart33 = drawChart33(data);
      chart34 = drawChart34(data);
    }
  }
);

function getPercentile(data, percentile) {
  data = data.sort(function (a, b) {
    return a - b;
  });

  var index = (percentile / 100) * data.length;
  var result;
  if (Math.floor(index) == index) {
    result = (data[index - 1] + data[index]) / 2;
  } else {
    result = data[Math.floor(index)];
  }
  return result;
}

function getInvertedPercentile(data, percentile) {
  let invertedPercentile = 100 - percentile;
  data = data.sort(function (a, b) {
    return a - b;
  });

  var index = (invertedPercentile / 100) * data.length;
  var result;
  if (Math.floor(index) == index) {
    result = (data[index - 1] + data[index]) / 2;
  } else {
    result = data[Math.floor(index)];
  }
  return result;
}
