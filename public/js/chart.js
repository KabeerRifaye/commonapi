/**
 * Class to draw Chart
 */

 var lineChart = function() {};

 lineChart.prototype.init = function(margin, width, height, elem, _baseUrl) {
  this.margin = margin;
  this.width = width - this.margin.left - this.margin.right;
  this.height = height - this.margin.top - this.margin.bottom;
  this.elem = elem;
  this.baseUrl = _baseUrl;

  this.svg = d3.select(this.elem).append("svg")
      .attr("width",this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .attr('class','aiLine')
    .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

  return this;
 }

lineChart.prototype.prepdata = function(torName, ePort) {
  var that = this,
      host = window.location.origin;
  console.log("URL",window.location.origin);
  d3.json(host +'/api/chart/'+torName+'/'+ePort, function(err, data) {
    // console.log("data",data);
    $("#CRC").empty();
    DrawBWGraph(data, 'CRC', 'Time', 'RX CRC Errors');
    // $("#Drop_chart_container").show();
  });
  function DrawBWGraph(seriesData, container, XLabel, YLabel) {   // this graph need to change with line chart.
    var jsonData = seriesData.map(function(d) {
      var tmpData = {}; // convert the data into format that's compatible with nv.d3
      tmpData.key = d.key;
      tmpData.values = []; // changes values from [ {x,y}, {x,y}, {x,y} ] to [ [x,y], [x,y], [x,y] ]
      for (var i = 0; i < d.values.length; i++) { 
        var arr = [];
        arr.push(d.values[i].x);
        arr.push(d.values[i].y);
        tmpData.values.push(arr);
      }
      return tmpData; 
    });
    internalDrawBWGraph(jsonData, container, XLabel, YLabel);
  }
  function internalDrawBWGraph(jsonData, container, XLabel, YLabel) {   // this graph need to change with line chart.
    // var colors = d3.scale.category20();
    var colorScale = d3.scale.linear()
          .range(["#8000FF","#FF9999"]);
    var chart2;
    nv.addGraph(function() {
      chart2 = nv.models.lineChart()
      chart2.margin({top: 10, bottom: 100, left: 50, right: 80})
                .x(function(d) { return d[0] })
                // .y(function(d) { return d[1]/100 }) // adjusting, 100% is 1.00, not 100 as it is in the data
                .y(function(d) { return d[1] }) // adjusting, 100% is 1.00, not 100 as it is in the data
                // .color(d3.scale.category10().range())
                .color(colorScale.range())
                .rightAlignYAxis(true)
                .useInteractiveGuideline(false);

      // chart2.xAxis.tickFormat(function(d) { return d3.time.format('%x')(new Date(d*1000)) });
      // chart2.yAxis.tickFormat(d3.format(',.1%'));
      chart2.xAxis.tickFormat(function(d){return d3.time.format('%d/%b %H:%M')(new Date(d * 1000));});
      chart2.yAxis.tickFormat(function(d) {
        if (d === null) {
          return 'N/A';
        }
        return d3.format('.08f')(d);
      });

      d3.select("#" + container)
        .append('svg')
        .datum(jsonData)
        .call(chart2);

      nv.utils.windowResize(chart2.update);
      return chart2;
    });
  } 
}