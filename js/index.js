// select svg container
// wrapped with d3 functions
const svg = d3.select("svg");

// load the json file we use "d3.json(url)" and it returns "data" as the object
// "then" function is to call back when the json file is ready
d3.json("../asset/menu.json").then(data => {

    // create the y scale
    const y = d3.scaleLinear()
        .domain([0,1000])
        .range([0,500]);

    // we try to join the data
    const rects = svg.selectAll("rect")
        .data(data);    // passing data to the rects

    // assuming there're rect DOMs
    rects.attr('width', 50)
        .attr('height', d=>y(d.orders))
        .attr('fill', "orange")
        .attr('x', (d,i)=>i*70)
    
    // if there is not
    // appending rects to the object
    rects.enter()
        .append('rect')
            .attr('width', 50)
            .attr('height', d=>y(d.orders))
            .attr('fill', "orange")
            .attr('x', (d,i)=>i*70);
});