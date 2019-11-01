import {
    color,
    temperatureColor,
} from "./helper"

export const renderSelectedCountry = (
    action,
    geojsonFeature,
    jsonCountryTemperature,
    stations
) => {
    let width = 500, height = 400, centered;

    let centerSVGPos = [width / 2, height / 2];

    let projection = d3.geoMercator();
    // .center([50, 50])
    // .scale(150)
    // .rotate([0, 0]);

    let path = d3.geoPath().projection(projection);

    let canvas, context, stationData = [];
    let circleRadius = 4;

    const tooltip = d3.select(".tooltip");


    if (action === "update") {
        // canvas = d3.select("#selected-canvas").select("canvas");
        let svg = d3.select("#selected-functional-map");
        let g = svg.select('g');
        g.attr("transform", function (d) {
            return "translate(50,50)"
        });
        const bounds = path.bounds(geojsonFeature);

        // svg.append("text")
        //     .text("hello");

        projection.fitSize([(width - 100), (height - 100)], geojsonFeature)

        g.selectAll("path").remove();
        g.selectAll("path")
            .data([geojsonFeature])
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", jsonCountryTemperature)
            .style("stroke", "#eee")
        // .attr("transform", function (d) {
        //     //     const centroid = path.centroid(d);
        //     //     const x = width / 2 - centroid[0];
        //     //     const y = height / 2 - centroid[1];
        //         return "translate(" + projection([d.long, d.lat]) + ")"
        // });
        stationData = stations;
        // console.log("selected-map", stationData);
        drawStations();

        // const zoom = d3.zoom()
        //     .scaleExtent([1, Infinity])
        //     .translateExtent([[0, 0], [width, height]])
        //     .extent([[0, 0], [width, height]])
        //     .on('zoom', () => {
        //         g.style('stroke-width', `${1.5 / d3.event.transform.k}px`)
        //         g.attr('transform', d3.event.transform);
        //         // g.selectAll("circle").attr('transform', d3.event.transform);
        //         console.log(d3.event.transform);
        //     })

        // g.call(zoom);

    } else if (action === "create") {
        // canvas = d3.select("#selected-canvas").append("canvas")
        //     .attr("width", width)
        //     .attr("height", height)
        //     .style('position', 'absolute')
        //     .style('left', '0');

        let svg = d3.select("#selected-functional-map")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
        let g = svg.append("g");
        g.attr("transform", function (d) {
            return "translate(50,50)"
        });

        projection.fitSize([(width - 100), (height - 100)], geojsonFeature);

        // console.log("centroid", path.centroid(geojsonFeature));
        // console.log(projection.translate([0, 0]));
        // console.log("centroid2", path.centroid(geojsonFeature));
        // projection.translate([100,100]);
        // projection.center([width/2, height/2]);

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

        svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .html(d => {
                return `${(100 - d * 10)}&#176;F`;
            })
            .attr("font-size", "0.32em")
            .attr("x", 23)
            .attr("height", 20)
            .attr("y", (d, i) => 20 + i * 9)
            .attr("width", 10)
            .attr("fill", d => color(100 - d * 10))
        // .attr("stroke", "gray");

        g.selectAll("path")
            .data([geojsonFeature])
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", jsonCountryTemperature)
            .style("stroke", "#eee")
        // .attr("transform", function (d) {
        //     const centroid = path.centroid(d);
        //     const x = width / 2 - centroid[0];
        //     const y = height / 2 - centroid[1];
        //     return "translate(" + x + "," + y + ")"
        // });

        stationData = stations;
        // console.log(stationData);
        drawStations();

        const zoom = d3.zoom()
            .scaleExtent([1, Infinity])
            .translateExtent([[0, 0], [width, height]])
            .extent([[0, 0], [width, height]])
            .on('zoom', () => {
                let scaleXY = d3.event.transform;
                g.attr("transform", () => {
                    return "translate(" + (scaleXY.x + 50) + "," + (scaleXY.y + 50) + ") scale(" + scaleXY.k + ")";
                });
                g.selectAll("circle").attr("r", () => {
                    // console.log(d3.event.transform);
                    let scaleXY = d3.event.transform;
                    return (circleRadius / scaleXY.k);
                });
            })

        svg.call(zoom);


    }

    function drawStations() {
        let g = d3.select("#selected-functional-map").select("svg").select("g");
        // console.log(stationData)

        if (stationData) {
            g.selectAll('circle')
                // g.selectAll('text')
                .remove();

            let stationsValue = g.selectAll('circle')
                // let stationsValue = g.selectAll('text')
                .data(stationData)
                .enter()
                .append('circle')
                // .append('text')
                // .attr('class', 'temp-text')
                // .text(d => {
                //         return (d.TAVG * (9 / 5) + 32).toFixed(0);
                // })
                // .attr('cx', d => projection([d.LONGITUDE, d.LATITUDE])[0])
                // .attr('cy', d => projection([d.LONGITUDE, d.LATITUDE])[1])
                .attr("transform", d => {
                    return `translate(${projection([d.LONGITUDE, d.LATITUDE])[0]},
                        ${projection([d.LONGITUDE, d.LATITUDE])[1]})`
                })
                .style("stroke", "#111")
                .attr("stroke-width", 0.1)
                // .style("storke", "rgba(144, 253, 222, 1)")
                .attr('fill', (d) => {
                    return color(d.TAVG * (9 / 5) + 32)
                })
                .attr('r', circleRadius);

            stationsValue.on("mouseover", function (d, i) {
                d3.select(this)
                    .style("stroke", "#eee")
                    .attr("stroke-width", 0.2);

                return tooltip.style("opacity", .9)
                    .html(
                        "<p>" +
                        d.NAME + "<br/>" +
                        "Average Temp: " + (d.TAVG * (9 / 5) + 32).toFixed(1) + "&#176;F <br />" +
                        "</p>"
                    );
                // .text(`${d.NAME}`);
            })
                .on("mousemove", function (d) {
                    tooltip.style("opacity", .9)
                        .style("top", (d3.event.pageY) + "px")
                        .style("left", (d3.event.pageX + 10) + "px")
                    // .text(d.NAME);
                })
                .on("mouseout", function (d, i) {
                    d3.select(this)
                        .style("stroke", "#111")
                        .attr("stroke-width", 0.1)
                    tooltip.style("opacity", 0)
                        .style("top", 0 + "px")
                        .style("left", 0 + "px");
                });
        } else {
            g.selectAll('circle')
                // g.selectAll('text')
                .remove();
        }


    }

    // function drawStations() {
    //     context = canvas.node().getContext('2d');
    //     context.save();

    //     context.setTransform([1, 0, 0, 1, 0, 0]);

    //     context.clearRect(0, 0, width, height);

    //     context.restore();

    //     const pRotate = projection.rotate();

    //     for (let i in stationData) {

    //         let station = stationData[i],
    //             loc = station ? projection([station.LONGITUDE, station.LATITUDE]) : null;

    //         if (loc) {
    //             let longitude = Number(station.LONGITUDE) + 180,
    //                 startLongitude = 360 - ((pRotate[0] + 270) % 360),
    //                 endLongitude = (startLongitude + 180) % 360,
    //                 ending = projection([station.LONGITUDE, station.LATITUDE]);

    //             context.beginPath();
    //             context.arc(ending[0], ending[1], 6, 0, Math.PI * 2);
    //             context.strokeStyle = 'rgba(144, 253, 222, ' + 0.9 + ')';
    //             context.stroke();
    //             context.fillStyle = color(station.TAVG * (9 / 5) + 32);
    //             context.fill();
    //         }
    //     }

    // }
}