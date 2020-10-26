// 1. Read csv, parse data
d3.csv("assets/data/data.csv").then(function(Health) {

  Health.forEach(d => {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
        d.abbr = d.abbr;
    }); 


//2. Set-out layout
var svgWidth = 1000;
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


    // 3. Create axes
    xlinearScale = d3.scaleLinear().domain([d3.min(Health,d=>d.poverty)-0.5, d3.max(Health,d=>d.poverty)+1]).range([0,chartwidth]);
    ylinearScale = d3.scaleLinear().domain([d3.min(Health,d=>d.healthcare)-2, d3.max(Health,d=>d.healthcare)+1]).range([chartheight,0]);
     
    var xAxis = d3.axisBottom(xlinearScale);
    var yAxis   = d3.axisLeft(ylinearScale);

    // 4. Append axis to chartGroup.
    chartGroup.append("g").attr("transform",`translate(0, ${chartheight})`).call(xAxis);
    chartGroup.append("g").call(yAxis);

    // 5. Add circles and text
    chartGroup.selectAll("circle")
              .data(Health)
              .enter()
              .append("circle")
              .attr("cx",d => xlinearScale(d.poverty))
              .attr("cy",d => ylinearScale(d.healthcare))
              .attr("r",20)
              .attr("fill", "blue")
              .attr("opacity", 0.6)

    chartGroup.selectAll("circleText")
              .data(Health)
              .enter()
              .append("text")
              .attr("dx",d => xlinearScale(d.poverty))
              .attr("dy",d => ylinearScale(d.healthcare))
              .text(d=>d.abbr) 
              .style("fill","white")
              .style("font-size",10)
              .style("font-weight","bold");
    
    // 6. Ad axes lables
    chartGroup.append("text")
    .attr("transform", `translate(${chartwidth / 2}, ${chartheight + margin.top + 25})`)
    .attr("class", "axisText")
    .text("Below poverty line (%)")
    .style("font-size", "20px")
    .style("font-weight","bold");

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (chartheight / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Without health insurance (%)")
    .style("font-size", "20px")
    .style("font-weight","bold");

});   