// select svg container
// wrapped with d3 functions
const svg = d3.select("svg");

// load the json file we use "d3.json(url)" and it returns "data" as the object
// "then" function is to call back when the json file is ready
d3.json("../asset/menu.json").then(data => {

    // create the y scale
    const y = d3.scaleLinear()
        .domain([0, 1000])
        .range([0, 500]);

    // looping through data and find the smallest and biggest number
    const min = d3.min(data, d => d.orders);
    const max = d3.max(data, d => d.orders);
    const extent = d3.extent(data, d => d.orders); // return an array with min and max together
    console.log(min, max, extent);
    
    
    // map circling through the data
    // scaleBand is to mapping the elements and pixels on x axis
    // it provides the bandwith of each element, and the start point on x-axis
    const x = d3.scaleBand()
        .domain(data.map(item => item.name))
        .range([0, 500])
        .paddingInner(0.2)  //setting up the margin between each element
        .paddingOuter(0.2); 

    // we try to join the data
    const rects = svg.selectAll("rect")
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
