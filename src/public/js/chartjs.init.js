$( document ).ready(function() {


    var ctx = document.getElementById("Chart3").getContext('2d');
var chart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["EFECTIVO", "CRÉDITO", "CHEQUE", "TARJETA DE CRÉDITO", "DEP/TRANS"],
    datasets: [{
      backgroundColor: [
        "#009efb",
        "#55ce63",
        "#2f3d4a",
        "#edf1f5",
        "#7460ee"

      ],
      data: [12, 19, 3, 6, 17]
    }]
  },
  options: {
    legend: {
      display: false
    },
  }
});

var myLegendContainer = document.getElementById("legend");
// generate HTML legend
myLegendContainer.innerHTML = chart.generateLegend();
// bind onClick event to all LI-tags of the legend
var legendItems = myLegendContainer.getElementsByTagName('li');
for (var i = 0; i < legendItems.length; i += 1) {
  legendItems[i].addEventListener("click", legendClickCallback, false);
}

function legendClickCallback(event) {
  event = event || window.event;

  var target = event.target || event.srcElement;
  while (target.nodeName !== 'LI') {
    target = target.parentElement;
  }
  var parent = target.parentElement;
  var chartId = parseInt(parent.classList[0].split("-")[0], 10);
  var chart = Chart.instances[chartId];
  var index = Array.prototype.slice.call(parent.children).indexOf(target);
  var meta = chart.getDatasetMeta(0);
  console.log(index);
	var item = meta.data[index];

  if (item.hidden === null || item.hidden === false) {
    item.hidden = true;
    target.classList.add('hidden');
  } else {
    target.classList.remove('hidden');
    item.hidden = null;
  }
  chart.update();
}


//CHART BARRAS

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["2015-01", "2015-02", "2015-03", "2015-04", "2015-05", "2015-06", "2015-07", "2015-08", "2015-09", "2015-10", "2015-11", "2015-12"],
    datasets: [{
      label: '# of Tomatoes',
      data: [12, 19, 3, 5, 2, 3, 20, 3, 5, 6, 2, 1],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          maxRotation: 90,
          minRotation: 80
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});




    
    // var ctx1 = document.getElementById("chart1").getContext("2d");
    // var data1 = {
    //     labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
    //     datasets: [
    //         {
    //             label: "My Second dataset",
    //             fillColor: "rgba(243,245,246,0.9)",
    //             strokeColor: "rgba(243,245,246,0.9)",
    //             pointColor: "rgba(243,245,246,0.9)",
    //             pointStrokeColor: "#fff",
    //             pointHighlightFill: "#fff",
    //             pointHighlightStroke: "rgba(243,245,246,0.9)",
    //             data: [28, 48, 40, 19, 86, 27, 90]
    //         },
    //         {
    //             label: "My First dataset",
    //             fillColor: "#009efb",
    //             strokeColor: "#009efb",
    //             pointColor: "#009efb",
    //             pointStrokeColor: "#fff",
    //             pointHighlightFill: "#fff",
    //             pointHighlightStroke: "#009efb",
    //             data: [0, 59, 80, 65, 10, 55, 40]
    //         }
            
    //     ],
        
    // };
    // Chart.types.Line.extend({
    //   name: "LineAlt",
    //   initialize: function () {
    //     Chart.types.Line.prototype.initialize.apply(this, arguments);

    //     var ctx = this.chart.ctx;
    //     var originalStroke = ctx.stroke;
    //     ctx1.stroke = function () {
    //       ctx1.save();
    //       ctx1.shadowColor = 'rgba(0, 0, 0, 0.4)';
    //       ctx1.shadowBlur = 10;
    //       ctx1.shadowOffsetX = 8;
    //       ctx1.shadowOffsetY = 8;
    //       originalStroke.apply(this, arguments)
    //       ctx1.restore();

    //     }
    //   }
    // });
    // var chart1 = new Chart(ctx1).LineAlt(data1, {
    //     scaleShowGridLines : true,
    //     scaleGridLineColor : "rgba(0,0,0,.005)",
    //     scaleGridLineWidth : 0,
    //     scaleShowHorizontalLines: true,
    //     scaleShowVerticalLines: true,
    //     bezierCurve : true,
    //     bezierCurveTension : 0.4,
    //     pointDot : true,
    //     pointDotRadius : 4,
    //     pointDotStrokeWidth : 2,
    //     pointHitDetectionRadius : 2,
    //     datasetStroke : true,
	// 	tooltipCornerRadius: 2,
    //     datasetStrokeWidth : 0,
    //     datasetFill : false,
    //     legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
    //     responsive: true
    // });
    
    // var ctx2 = document.getElementById("chart2").getContext("2d");
    // var data2 = {
    //     labels: ["January", "February", "March", "April", "May", "June", "July"],
    //     datasets: [
    //         {
    //             label: "My First dataset",
    //             fillColor: "#009efb",
    //             strokeColor: "#009efb",
    //             highlightFill: "#009efb",
    //             highlightStroke: "#009efb",
    //             data: [10, 30, 80, 61, 26, 75, 40]
    //         },
    //         {
    //             label: "My Second dataset",
    //             fillColor: "#55ce63",
    //             strokeColor: "#55ce63",
    //             highlightFill: "#55ce63",
    //             highlightStroke: "#55ce63",
    //             data: [28, 48, 40, 19, 86, 27, 90]
    //         }
    //     ]
    // };
    
    // var chart2 = new Chart(ctx2).Bar(data2, {
    //     scaleBeginAtZero : true,
    //     scaleShowGridLines : true,
    //     scaleGridLineColor : "rgba(0,0,0,.005)",
    //     scaleGridLineWidth : 0,
    //     scaleShowHorizontalLines: true,
    //     scaleShowVerticalLines: true,
    //     barShowStroke : true,
    //     barStrokeWidth : 0,
	// 	tooltipCornerRadius: 2,
    //     barDatasetSpacing : 3,
    //     legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
    //     responsive: true
    // });
    
    // var ctx3 = document.getElementById("chart3").getContext("2d");
    // var data3 = [
    //     {
    //         value: 300,
    //         color:"#009efb",
    //         highlight: "#009efb",
    //         label: "Blue"
    //     },
    //     {
    //         value: 50,
    //         color: "#edf1f5",
    //         highlight: "#edf1f5",
    //         label: "Light"
    //     },
	// 	 {
    //         value: 50,
    //         color: "#2f3d4a",
    //         highlight: "#2f3d4a",
    //         label: "Dark"
    //     },
	// 	 {
    //         value: 50,
    //         color: "#55ce63",
    //         highlight: "#55ce63",
    //         label: "Megna"
    //     },
    //     {
    //         value: 100,
    //         color: "#7460ee",
    //         highlight: "#7460ee",
    //         label: "Orange"
    //     }
    // ];
    
    // var myPieChart = new Chart(ctx3).Pie(data3,{
    //     segmentShowStroke : true,
    //     segmentStrokeColor : "#fff",
    //     segmentStrokeWidth : 0,
    //     animationSteps : 100,
	// 	tooltipCornerRadius: 0,
    //     animationEasing : "easeOutBounce",
    //     animateRotate : true,
    //     animateScale : false,
    //     legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
    //     responsive: true
    // });
    






    
    // var ctx4 = document.getElementById("chart4").getContext("2d");
    // var data4 = [
    //     {
    //         value: 300,
    //         color:"#2f3d4a",
    //         highlight: "#2f3d4a",
    //         label: "Megna"
    //     },
    //     {
    //         value: 50,
    //         color: "#009efb",
    //         highlight: "#009efb",
    //         label: "Blue"
    //     },
    //     {
    //         value: 100,
    //         color: "#55ce63",
    //         highlight: "#55ce63",
    //         label: "Orange"
    //     }
    // ];
    
    // var myDoughnutChart = new Chart(ctx4).Doughnut(data4,{
    //     segmentShowStroke : true,
    //     segmentStrokeColor : "#fff",
    //     segmentStrokeWidth : 0,
    //     animationSteps : 100,
	// 	tooltipCornerRadius: 2,
    //     animationEasing : "easeOutBounce",
    //     animateRotate : true,
    //     animateScale : false,
    //     legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
    //     responsive: true
    // });
    
    // var ctx5 = document.getElementById("chart5").getContext("2d");
    // var data5 =  [
    //     {
    //         value: 300,
    //         color:"#2f3d4a",
    //         highlight: "#2f3d4a",
    //         label: "Megna"
    //     },
    //     {
    //         value: 50,
    //         color: "#009efb",
    //         highlight: "#009efb",
    //         label: "Blue"
    //     },
    //     {
    //         value: 100,
    //         color: "#55ce63",
    //         highlight: "#55ce63",
    //         label: "Orange"
    //     },
    //     {
    //         value: 40,
    //         color: "#949FB1",
    //         highlight: "#A8B3C5",
    //         label: "Grey"
    //     }

    // ];
    
    // var myPolarArea = new Chart(ctx5).PolarArea(data5, {
    //     scaleShowLabelBackdrop : true,
    //     scaleBackdropColor : "rgba(255,255,255,0.75)",
    //     scaleBeginAtZero : true,
    //     scaleBackdropPaddingY : 2,
    //     scaleBackdropPaddingX : 2,
    //     scaleShowLine : true,
    //     segmentShowStroke : true,
    //     segmentStrokeColor : "#fff",
    //     segmentStrokeWidth : 2,
    //     animationSteps : 100,
	// 	tooltipCornerRadius: 2,
    //     animationEasing : "easeOutBounce",
    //     animateRotate : true,
    //     animateScale : false,
    //     legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
    //     responsive: true
    // });
    
    // var ctx6 = document.getElementById("chart6").getContext("2d");
    // var data6 = {
    //     labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
    //     datasets: [
    //         {
    //             label: "My First dataset",
    //             fillColor: "#55ce63",
    //             strokeColor: "#55ce63",
    //             pointColor: "#55ce63",
    //             pointStrokeColor: "#fff",
    //             pointHighlightFill: "#fff",
    //             pointHighlightStroke: "#55ce63",
    //             data: [65, 59, 90, 81, 56, 55, 40]
    //         },
    //         {
    //             label: "My Second dataset",
    //             fillColor: "rgba(97,100,193,0.8)",
    //             strokeColor: "rgba(97,100,193,1)",
    //             pointColor: "rgba(97,100,193,1)",
    //             pointStrokeColor: "#fff",
    //             pointHighlightFill: "#fff",
    //             pointHighlightStroke: "rgba(97,100,193,1)",
    //             data: [28, 48, 40, 19, 96, 27, 100]
    //         }
    //     ]
    // };
    
    // var myRadarChart = new Chart(ctx6).Radar(data6, {
    //     scaleShowLine : true,
    //     angleShowLineOut : true,
    //     scaleShowLabels : false,
    //     scaleBeginAtZero : true,
    //     angleLineColor : "rgba(0,0,0,.1)",
    //     angleLineWidth : 1,
    //     pointLabelFontFamily : "'Arial'",
    //     pointLabelFontStyle : "normal",
    //     pointLabelFontSize : 10,
    //     pointLabelFontColor : "#666",
    //     pointDot : true,
    //     pointDotRadius : 3,
	// 	tooltipCornerRadius: 2,
    //     pointDotStrokeWidth : 1,
    //     pointHitDetectionRadius : 20,
    //     datasetStroke : true,
    //     datasetStrokeWidth : 2,
    //     datasetFill : true,
    //     legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
    //     responsive: true
    // });
    
});