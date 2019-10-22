export const renderSelectedCountry = (action, geojsonFeature, jsonCountryTemperature) => {
    const color = d3.scaleQuantize()
        .domain([45, 90])
        .range(["#3288BD", "#66C2A5", "#ABDDA4", "#E6F598",
            "#FFFFBF", "#FEE08B", "#FDAE61", "#F46D43", "#D53E4F", "#9E0142"]);

    let width = 400, height = 400, centered;

    let projection = d3.geoMercator()
        .center([0, 0])
        .scale(150)
        .rotate([0, 0]);

    let path = d3.geoPath().projection(projection);


    if (action === "update") {
        let svg = d3.select("#selected-country")
        let g = svg.select('g');
        const bounds = path.bounds(geojsonFeature);
        // const scale = Math.min((bounds[1][0] - bounds[0][0]) / Math.PI, (bounds[1][1] - bounds[0][1]) / Math.PI);

        projection.fitSize([width, height], geojsonFeature);

        g.selectAll("path").remove();
        g.selectAll("path")
            .data([geojsonFeature])
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", jsonCountryTemperature)
            .style("stroke", "#eee")
            .attr("transform", function(d) {
                const centroid = path.centroid(d);
                const x = width / 2 - centroid[0];
                const y = height / 2 - centroid[1];
                return "translate(" + x + "," + y + ")"
            });

    } else if (action === "create")  {
        let svg = d3.select("#selected-country")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
        let g = svg.append("g");

        projection.fitSize([width, height], geojsonFeature);

        const data = d3.range(10);
        const rects = svg.selectAll(".rects")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", 10)
            .attr("height", 10)
            .attr("y", (d, i) => 10 + i * 9)
            .attr("width", 10)
            .attr("fill", d => color(100 - d * 10))
            .attr("stroke", "gray");
    
        g.selectAll("path")
            .data([geojsonFeature])
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", jsonCountryTemperature)
            .style("stroke", "#eee")
            .attr("transform", function (d) {
                const centroid = path.centroid(d);
                const x = width / 2 - centroid[0];
                const y = height / 2 - centroid[1];
                return "translate(" + x + "," + y + ")"
            });

        const zoom = d3.zoom()
            .on('zoom', () => {
                g.style('stroke-width', `${1.5 / d3.event.transform.k}px`)
                g.attr('transform', d3.event.transform)
            })

        svg.call(zoom);
    }
}