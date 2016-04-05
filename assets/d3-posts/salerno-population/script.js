
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

var titleBar = svg.append("g");

// A label for the starting year
var title = titleBar.append("text")
    .attr("class", "title")
    .attr("dy", ".71em")
    .attr("x", width - 180);

addButton(titleBar);

var x = d3.scale.linear()
    .range([ 0, width ]);

var y = d3.scale.linear()
    .range([height, 0]);

var yAxis = d3.svg.axis() // NB: the axis has not been rendered yet, just defined as function
    .scale(y)
    .orient("right")
    .tickSize(-width) // this should render a tick as large as the svg (the white horizontal grid)
    .tickFormat(function(d){return Math.round(d/100)*100;}); // todo is it rendered at right level?


var years, year,
    animate,
    yearCounter= 0;

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
        year1 = d3.max(data, function(d){return d.year});
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

    // labels for age
    svg.selectAll(".age")
        .data(d3.range(0, age1, 5 ))
        .enter().append("text")
        .attr("x", function(d) { return x(d); })
        .attr("y", height + 4)
        .attr("dy", ".71em")
        .text(function(d) { return d; });


    function update() {
        if (!(year in data)) return;
        title.text(year);

        birthyear.selectAll("rect")
            .data(function(d) { return data[year][d] || [0,0]; })
            .transition()
            .duration(500)
            .ease("linear")
            .attr("x", 0)
            .attr("width", barWidth)
            .attr("y", y)
            .attr("height", function(value) { return height - y(value); });
    }



    years = d3.range(year0, year1+1);
    animate = update;
    //var i = 0;
    //var timer = setInterval(function(){
    //    year = years[i++];
    //    update();
    //    console.log(year);
    //    if (i == years.length){
    //        clearInterval(timer);
    //        i = 0;
    //    }
    //
    //} ,1000)

 });



function setTitle(year){
    title.text(year);
}


var interval;

function play(){
    interval = setInterval(function(){
        year = years[yearCounter++];
        animate();
        if (yearCounter == years.length){
            clearInterval(interval);
            //yearCounter = 0;
            //year = years[0];
            //console.log(year);
            //setTitle(year);
            //animate();
        }
    },1000)
}

function pause(){
    clearInterval(interval);
}



function addButton(container){
    var c = container;
    var h = 30,
        w = 60,
        x = width - 90,
        y = 60;

    c.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("height", h)
        .attr("width", w)
        .attr("ry", h/10)
        .attr("class","svg-btn");

    var symbolGroup = c.append("g");

    var playSymbol = function () {
        symbolGroup.selectAll("*").remove();
        symbolGroup.append("path")
            .attr("d", "M0 0 L 10 10 L 0 20 z")
            .attr("transform", "translate(" + (x+26) + "," + (y+5) + ")scale(.9)")
            .style("fill", "red");
    };

    var pauseSymbol = function(){
        symbolGroup.selectAll("*").remove();
        symbolGroup.append("rect")
            .attr("x", x + w/2 - 7)
            .attr("y", y + h/2 - 7)
            .attr("height", 15)
            .attr("width", 5)
            .style("fill", "orange")
            .style("opacity", 1)

        symbolGroup.append("rect")
            .attr("x", x + w/2 - 0)
            .attr("y", y + h/2 - 7)
            .attr("height", 15)
            .attr("width", 5)
            .style("fill", "orange")
            .style("opacity",1)

    };

    playSymbol();

    c.append("rect")  // transparent overlay to catch mouse events
        .attr("id","myButton")
        .attr("width", w + "px")
        .attr("height", h + "px")
        .style("opacity", 0)
        .style("pointer-events", "all")
        .attr("x", x)
        .attr("y", y)
        .attr("ry", h/2)
        .on("click", playButton);

    function playButton(){
        pauseSymbol();
        d3.select(this).on("click", pauseButton);
        play();
    }

    function pauseButton(){
        playSymbol();
        d3.select(this).on("click", playButton);
        pause();
    }

}

