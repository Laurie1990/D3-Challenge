// @TODO: YOUR CODE HERE!

//Import and format data

d3.csv("assets/data/data.csv").then(function(GetData) {
   GetData.forEach(x => {
        x.poverty = +x.poverty;
        x.healthcare = +x.healthcare;
    })});


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
var Charts = svg.append("c")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  xtick = d3.scaleLinear().domain([d3.min(GetData,x=>x.poverty)-0.5, d3.max(GetData,x=>x.poverty)+1]).range([0,chartwidth]);
  ytick = d3.scaleLinear().domain([d3.min(GetData,x=>x.healthcare)-2, d3.max(GetData,x=>x.healthcare)+1]).range([chartheight,0]);