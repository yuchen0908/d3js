// creating svg in index.js
const svg = d3.select(".canvas")
    .append('svg')
    .attr('width', 600)
    .attr('height', 600);

// we want to set up the margin and dimensions
// bottom and left will be a bit more for legend
const margin = {top:20, right:20, bottom:100, left:100};
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.bottom - margin.top;

// please note the transform function and the value
// it's a placeholder
const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);


// load the json file we use "d3.json(url)" and it returns "data" as the object
// "then" function is to call back when the json file is ready
d3.json("../asset/menu.json").then(data => {

    // create the y scale
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.orders)])
        .range([0, 500]);

    // // looping through data and find the smallest and biggest number
    // const min = d3.min(data, d => d.orders);
    // const max = d3.max(data, d => d.orders);
    // const extent = d3.extent(data, d => d.orders); // return an array with min and max together
    // console.log(min, max, extent);
    
    
    // map circling through the data
    // scaleBand is to mapping the elements and pixels on x axis
    // it provides the bandwith of each element, and the start point on x-axis
    const x = d3.scaleBand()
        .domain(data.map(item => item.name))
        .range([0, 500])
        .paddingInner(0.2)  //setting up the margin between each element
        .paddingOuter(0.2); 

    // we try to join the data
    const rects = graph.selectAll("rect")
        .data(data);    // passing data to the rects

    // assuming there're rect DOMs
    // (d,i) => i*70 
    // if the bar is at position 0, it will start from 0
    // if it's at 1, it will start from 70, etc..
    // since i refers the index of the element in an array of elements
    rects.attr('width', x.bandwidth)
        .attr('height', d=>y(d.orders)) // using scale to transform the pixel value
        .attr('fill', "orange")
        .attr('x', d => x(d.name));
    
    // if there is not
    // appending rects to the object
    rects.enter()
        .append('rect')
            .attr('width', x.bandwidth)
            .attr('height', d=>y(d.orders))
            .attr('fill', "orange")
            .attr('x', d => x(d.name));
});
