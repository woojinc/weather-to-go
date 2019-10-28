export const renderSelectedCountry = (
    action,
    geojsonFeature,
    jsonCountryTemperature,
    stations
) => {
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

    let canvas = d3.select("#selected-canvas").append("canvas")
        .attr("width", width)
        .attr("height", height)
        .style('position', 'absolute')
        .style('left', '0');
    let context, stationData = [];


    if (action === "update") {
        let svg = d3.select("#selected-country")
        let g = svg.select('g');
        const bounds = path.bounds(geojsonFeature);

        projection.fitSize([width, height], geojsonFeature);

        g.selectAll("path").remove();
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

    } else if (action === "create") {
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
            .scaleExtent([1, Infinity])
            .translateExtent([[0, 0], [width, height]])
            .extent([[0, 0], [width, height]])
            .on('zoom', () => {
                g.style('stroke-width', `${1.5 / d3.event.transform.k}px`)
                g.attr('transform', d3.event.transform)
            })

        svg.call(zoom);

    }
    stationData = stations;
    drawStations();
    function drawStations() {
        context = canvas.node().getContext('2d');
        context.save();

        context.setTransform([1, 0, 0, 1, 0, 0]);

        // erase what is on the canvas currently
        context.clearRect(0, 0, width, height);

        context.restore();

        const pRotate = projection.rotate();
        for (let i in stationData) {
            let station = stationData[i],

                loc = station ? projection([station.LONGITUDE, station.LATITUDE]) : null;

            if (loc) {
                let longitude = Number(station.LONGITUDE) + 180,
                    startLongitude = 360 - ((pRotate[0] + 270) % 360),
                    endLongitude = (startLongitude + 180) % 360;
                let circ = Math.PI * 2;
                let quart = Math.PI / 2;

                // mask 
                if ((startLongitude < endLongitude &&
                    longitude > startLongitude &&
                    longitude < endLongitude) ||
                    (startLongitude > endLongitude &&
                        (longitude > startLongitude || longitude < endLongitude))) {
                    context.strokeStyle = 'rgba(144, 253, 222, ' + 0.9 + ')';
                    // context.strokeStyle = 'rgba(0,0,0,1)';
                    let ending = projection([station.LONGITUDE, station.LATITUDE]);
                    // context.lineWidth = 2
                    context.beginPath();
                    context.arc(ending[0], ending[1], 2, 0, Math.PI * 2);
                    context.stroke();
                    context.fillStyle = color(station.TAVG * (9 / 5) + 32);
                    context.fill()
                }
            }
        }

    }
}