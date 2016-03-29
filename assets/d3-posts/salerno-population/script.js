var margin = {top: 20, right: 40, bottom: 30, left: 20},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    barWidth = Math.floor(width/18) - 1 // 18 age range and 1px for space among bars;

//todo add scales

var x = d3.scale.linear()
    .range(barWidth/2, width - barWidth/2);

var y = d3.scale.linear()
    .range(height, 0);

var yAxis = d3.svg.axis()// NB: the axis has not been rendered yet, just defined as function
    .scale(y)
    .orient("right")
    .tickSize(-width) // this should render a tick as large as the svg (the white horizontal grid)
    .tickFormat(function(d){return Math.round(d/1e3) + "K";}); // double check the exp notation

var svg = d3.select(".d3-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// sliding container (todo: understand)
var birthyears = svg.append("g")
    .attr("class","birthyear"); // check again here, apparently an typo in source (plural name)

// A label for the starting year
var title = svg.append("text")
    .attr("class", "title")
    .attr("dy", ".71em")
    .text(1982);

// here comes the Magic
d3.csv("/assets/d3-posts/salerno-population/salerno_pop.csv", function(error, data){

    // understanding data structure
    data.forEach(function(d) {
        console.log(d.people); //ok, we access the data, TBD

    })
})