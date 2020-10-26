// @TODO: YOUR CODE HERE!

//Import and format data

d3.csv("assets/data/data.csv").then(function(GetData) {
   GetData.forEach(x => {
        x.poverty = +x.poverty;
        x.healthcare = +x.healthcare;
        x.state=x.abbr;
    });


//Set-up page
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 30,
    right: 50,
    bottom: 60, 
    left: 50
            };

// Set visualisation width and height
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

//Create graphs
var Graph = svg.append("c")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  xtick = d3.scaleLinear().domain([d3.min(GetData,x=>x.poverty)-0.5, d3.max(GetData,x=>x.poverty)+1]).range([0,chartwidth]);
  ytick = d3.scaleLinear().domain([d3.min(GetData,x=>x.healthcare)-2, d3.max(GetData,x=>x.healthcare)+1]).range([chartheight,0]);

  var xAxis = d3.axisBottom(xtick);
  var yAxis   = d3.axisLeft(ytick);

  Graph.append("c").attr("transform",`translate(0, ${chartheight})`).call(xAxis);
  Graph.append("c").call(yAxis);

  
  //Create circles
  Graph.selectAll("circle")
    .data(GetData)
    .enter()
    .append("circle")
    .attr("cx",x => xtick(x.poverty))
    .attr("cy",x => ytick(x.healthcare))
    .attr("r",20)
    .attr("fill", "blue")
    .attr("opacity", 0.5)

    //Add text to circles
    Graph.selectAll("circleText")
    .data(GetData)
    .enter()
    .append("text")
    .attr("dx",x => xlinearScale(x.poverty))
    .attr("dy",x => ylinearScale(x.healthcare))
    .text(x=>x.abbr) 
    .style("text-anchor", "middle")
    .style("fill","white")
    .style("font-size",10)
    .style("font-family", "Times New Roman")
    .style("font-weight","bold");

      




});
