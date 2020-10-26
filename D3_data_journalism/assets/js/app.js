//
// 
// 1. Read csv
// ===================================
d3.csv("assets/data/data.csv").then(function(NewsPaper) {

    NewsPaper.forEach(d => {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
        d.abbr = d.abbr;
    }); 


//2. Set-out layout
//= ========================
var svgWidth = 900;
var svgHeight = 600;

var margin = {
  top: 30,
  bottom: 70, 
  right: 50,
  left: 50
};

var chartwidth = svgWidth - margin.left - margin.right;
var chartheight = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


    // Step 5: Create the scales for the chart.
    // ========================================
    xlinearScale = d3.scaleLinear().domain([d3.min(NewsPaper,d=>d.poverty)-0.5, d3.max(NewsPaper,d=>d.poverty)+1]).range([0,chartwidth]);
    ylinearScale = d3.scaleLinear().domain([d3.min(NewsPaper,d=>d.healthcare)-2, d3.max(NewsPaper,d=>d.healthcare)+1]).range([chartheight,0]);
     
    // Step 6: Create the axes.
    // ========================
    var xAxis = d3.axisBottom(xlinearScale);
    var yAxis   = d3.axisLeft(ylinearScale);

    // Step 7: Append the axes to the chartGroup.
    // ==========================================
    //Add x-axis
    chartGroup.append("g").attr("transform",`translate(0, ${chartheight})`).call(xAxis);
    //Add y-axis
    chartGroup.append("g").call(yAxis);

    // Step 10: Add circles.
    // ====================
    chartGroup.selectAll("circle")
                      .data(NewsPaper)
                      .enter()
                      .append("circle")
                      .attr("cx",d => xlinearScale(d.poverty))
                      .attr("cy",d => ylinearScale(d.healthcare))
                      .attr("r",20)
                      .attr("fill", "blue")
                      .attr("opacity", 0.9)

    // Step 11: Add text in circles.
    // =============================
    chartGroup.selectAll("circleText")
              .data(NewsPaper)
              .enter()
              .append("text")
              .attr("dx",d => xlinearScale(d.poverty))
              .attr("dy",d => ylinearScale(d.healthcare))
              .text(d=>d.abbr) 
              .style("text-anchor", "middle")
              .style("fill","white")
              .style("font-size",".8em")
              .style("font-family", "Times New Roman")
              .style("font-weight","bold");
    
    // Step 12: Create and append axes labels.
    //========================================
    chartGroup.append("text")
    .attr("transform", `translate(${chartwidth / 2}, ${chartheight + margin.top + 25})`)
    .attr("class", "axisText")
    .text("Below poverty line (%)")
    .style("text-anchor", "middle")
    .style("font-family", "Times New Roman")
    .style("font-size", "20px")
    .style("font-weight","bold");

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (chartheight / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Without health insurance (%)")
    .style("text-anchor", "middle")
    .style("font-family", "Times New Roman")
    .style("font-size", "20px")
    .style("font-weight","bold");

});   