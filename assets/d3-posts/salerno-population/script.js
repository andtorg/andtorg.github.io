
var margin = {top: 20, right: 40, bottom: 30, left: 20},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    barWidth = Math.floor(width/100) - 1; // 100 years and 1px for space among bars;

var svg = d3.select(".d3-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// sliding container (todo: still needed?)
var birthyears = svg.append("g")
    .attr("class","birthyear"); // check again here, apparently an typo in source (plural name)

// A label for the starting year
var title = svg.append("text")
    .attr("class", "title")
    .attr("dy", ".71em");

var x = d3.scale.linear()
    .range([ 0, width ]);

var y = d3.scale.linear()
    .range([height, 0]);

var yAxis = d3.svg.axis() // NB: the axis has not been rendered yet, just defined as function
    .scale(y)
    .orient("right")
    .tickSize(-width) // this should render a tick as large as the svg (the white horizontal grid)
    .tickFormat(function(d){return Math.round(d/100)*100;}); // todo is it rendered at right level?

// here comes the Magic
d3.csv("/assets/d3-posts/salerno-population/salerno_pop_senza_fasce.csv", function(error, data){

    // cast from string to number.
    data.forEach(function(d) {
        d.year = +d.year;
        d.age = +d.age;
        d.people = +d.people;
    });

    // find min and max to set the domains
    var age1 = d3.max(data,function(d){return d.age;}),
        year0 = d3.min(data, function(d){return d.year}),
        year1 = d3.max(data, function(d){return d.year}),
        year = year0; //todo find out where / why use

    setTitle(year0);

    x.domain([0 , age1]); //todo ?
    y.domain([0, d3.max(data, function(d) { return d.people; })]);

    /* a map from year and birthyear to male / female array
     The objects belonging to the original array are first grouped by year,
     then by age. The resulting arrays of two objects (M and F, sex)
     for each grouping are flatted to an array size 2 with the rollup func.
     Finally the nest operator is applied to to the data array, returning a map,
     i.e. an associative array whose key/values has been set by previous key / rollup functions
     */
    data = d3.nest()
        .key(function(d){ return d.year; })
        .key(function(d){ return d.age;})
        .rollup(function(v){ return v.map(function(d){ return d.people; }); }) // collapsing the 2 objects (M and F) in an array of 2 element-size
        .map(data);

    // add horizontal axis that shows the pop numbers
    // the number of tick is set implicitly by the axis generator function
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + ",0)")
        .call(yAxis) // this displays the axis; 'till now it was just a function
        .selectAll("g")
        .filter(function(value) { return !value; }) // this only let line at 0 to pass (0 == false)
        .classed("zero", true); // apply class zero if not already applied

    // add g elements for rects
    var birthyear = birthyears.selectAll(".birthyear")
        //.data(d3.range(year0 - age1, year1 + 1, 5))  // an array of birth years at step 5
        .data(d3.range(0, age1))
        .enter().append("g")
        .attr("class", "birthyear")
        .attr("transform", function(birthyear) { return "translate(" + x(birthyear) + ",0)" }); //todo ?

    birthyear.selectAll("rect")
        .data(function(d) { return data[year][d] || [0,0]; })
        .enter().append("rect")
        .attr("x", 0)
        .attr("width", barWidth)
        .attr("y", y)
        .attr("height", function(value) { return height - y(value); });
//debugger;
 });


function setTitle(year){
    title.text(year);
}

 /*
====================












    // labels for birthyear
    birthyear.append("text")
        .attr("y", height - 4 )
        .text(function(birthyear){ return birthyear; })

    // labels for age
    svg.selectAll(".age")
        .data(d3.range(0, age1 + 1, 5 ))
        .enter().append("text")
        .attr("x", function(d) { return x(year - d); })
        .attr("y", height + 4)
        .attr("dy", ".71em")
        .text(function(d) { return d; });

    // Allow the arrow keys to change the displayed year.
    window.focus();
    d3.select(window).on("keydown", function() {
        switch (d3.event.keyCode) {
            case 37: year = Math.max(year0, year - 5); break;
            case 39: year = Math.min(year1, year + 5); break;
        }
        update();
    });


    function update() {
        if (!(year in data)) return;
        title.text(year);

        birthyears.transition()
            .duration(750)
            .attr("transform", "translate(" + (x(year1) - x(year)) + ",0)");

        birthyear.selectAll("rect")
            .data(function (birthyear) {
                return data[year][birthyear] || [0, 0];
            })
            .transition()
            .duration(750)
            .attr("y", y)
            .attr("height", function (value) {
                return height - y(value);
            });
    }


*/