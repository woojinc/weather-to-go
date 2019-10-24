import {
    renderSlider,
    numMonthToName
} from "./slider";

// import {
//     onZoom,
//     clicked
// } from "./event_handling";

import { renderSelectedCountry } from "./selected-map";

export const renderMap = (month) => {

    const color = d3.scaleLinear()
        .domain([20, 40, 50, 65, 75, 85, 90, 100])
        .range(["#fffafa",
            "#00a6ca",
            "#00ccbc",
            "#90eb9d",
            "#ffff8c",
            "#f9d057",
            "#f29e2e",
            "#d7191c"]);

    const temperatureColor = (id, countryTemperature) => {

        if (countryTemperature[id] !== undefined) {
            const jsonCountryTemperature = countryTemperature[id].temperature;
            return color(jsonCountryTemperature)
        } else {
            return "black"
        }
    }

    let width = 500, height = 500, center = [-width / 2 + 3, 0], sens = 0.25,
        zoom, centeredFeature, timer;

    const globeConfig = {
        speed: 0.005,
        verticalTilt: -23.5,
        horizontalTilt: 0
    }

    let svg = d3.select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    // svg.append("path")
    //     .datum({ type: "Sphere" })
    //     .attr("class", "water")
    //     .attr("d", path)
    // console.log("g", g);


    let g = svg.append('g');

    console.log("g", g);
    console.log("g", g);


    let projection = d3.geoOrthographic()
        // .center(center);
        .translate([width / 2, height / 2])
    // .scale(200);
    const initialScale = projection.scale();
    const initialCenter = projection.center();
    console.log(initialScale);
    console.log(initialCenter);

    let path = d3.geoPath().projection(projection);




    queue()
        .defer(d3.json, "./data/world-110m2.json")
        .defer(d3.json, `./data/tas-2016-${month}.json`)
        .await(renderGlobalMap);

    function renderGlobalMap(error, topology, temperature) {
        if (error) throw error;

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

        const geojson = topojson.feature(topology, topology.objects.countries);


        drawOcean();
        drawGraticule();

        g.selectAll("path.land")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("class", "land")
            .attr("d", path)
            .style("fill", function (d) {
                return temperatureColor(d.id, temperature);
            })
            .style("stroke", "#eee")
            .on("click", function (selectedFeature) {
                timer.stop();
                clicked(selectedFeature);
                renderSelectedCountry("update",
                    selectedFeature,
                    temperatureColor(selectedFeature.id, temperature));
            })

        g.call(d3.drag()
                .subject(function () {
                    const r = projection.rotate();
                    return {
                        x: r[0] / sens, y: -r[1] / sens
                    };
                })
                .on("drag", function () {
                    timer.stop();
                    const rotate = projection.rotate();
                    projection.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
                    svg.selectAll("path").attr("d", path);
                }));
                
        const clicked = (selectedFeature) => {

            let centroid, inverted, rotate, currentRotate, desiredRotate, r, currentScale, desiredScale, s;

            //     // If the click was on the centered state or the background, re-center.
            //     // Otherwise, center the clicked-on state.
            if (!selectedFeature || centeredFeature === selectedFeature) {
                centeredFeature = null;
                centroid = path.centroid(selectedFeature);
                inverted = projection.invert([centroid[0], centroid[1]]);
                currentRotate = projection.rotate();

                currentScale = projection.scale();

                r = d3.interpolate(currentRotate, [currentRotate[0], globeConfig.verticalTilt, globeConfig.horizontalTilt]);
                s = d3.interpolate(currentScale, initialScale);

            } else {
                centroid = path.centroid(selectedFeature);
                inverted = projection.invert([centroid[0], centroid[1]]);
                currentRotate = projection.rotate();

                currentScale = projection.scale();
                // projection.fitSize([width, height], selectedFeature);
                console.log("current center", projection.center());
                console.log("initial center", initialCenter);
                desiredScale = projection.scale();

                r = d3.interpolate(currentRotate, [-inverted[0], -inverted[1]]);
                s = d3.interpolate(currentScale, 200);
                centeredFeature = selectedFeature;
            }
            g.transition()
                .duration(750)
                .tween("rotate", function () {
                    return function (t) {
                        projection.rotate(r(t));
                        // projection.scale(s(t));
                        // projection.center([(center[0] / s(t)), 0]);
                        svg.selectAll("path").attr("d", path);
                        console.log("Rotate!");
                    }
                })
                .on("end", function () {
                    if (!centeredFeature) {
                        enableRotation(currentRotate[0])
                    }
                });

            const initialScale = projection.scale();

            // Transition to the new transform.

        };

        enableRotation();

        renderSlider();
        renderSelectedCountry(
            "create",
            geojson.features[0], color(temperature[geojson.features[0].id].temperature)
        );

        document.getElementById("month-slider")
            .addEventListener("input", e => {
                const sliderLabel = document.getElementById("slider-current-month");

                let currentMonth = Number(e.target.value);
                let currentMonthString = e.target.value;

                sliderLabel.innerHTML = numMonthToName[currentMonth];

                if (currentMonthString.length === 1) {
                    currentMonthString = "0" + currentMonthString;
                }

                d3.json(`./data/tas-2016-${currentMonthString}.json`, function (error, temperature) {
                    if (error) throw error;
                    g.selectAll("path")
                        .style("fill", function (d) {
                            return temperatureColor(d.id, temperature);
                        })
                        .style("stroke", "#eee");

                    let g2 = d3.select("#selected-country")
                        .select('g')
                    g2.selectAll("path")
                        .style("fill", function (d) {
                            return temperatureColor(d.id, temperature);
                        })
                        .style("stroke", "#eee");
                })
            });

        // zoom and pan
        const zoom = d3.zoom()
            .scaleExtent([1, Infinity])
            .translateExtent([[0, 0], [width, height]])
            .extent([[0, 0], [width, height]])
            .on('zoom', () => {
                g.style('stroke-width', `${1.5 / d3.event.transform.k}px`)

                g.attr('transform', function (d) {
                    return 'translate('
                        + -250 * (d3.event.transform.k - 1) + ','
                        + -250 * (d3.event.transform.k - 1) + ')'
                        + 'scale(' + d3.event.transform.k + ')';
                })
                // g.attr('transform', function(d) {
                //     return 'scale(' + d3.event.transform.k + ')';
                // })

                g.selectAll("path").attr("d", path);

            })

        g.call(zoom);



        // zoom = d3.zoom()
        //     .center([width / 2, height / 2])
        //     .on("zoom", onZoom)
        //     .on("zoomend", function () { dragging = false; });

        // drag = d3.drag()
        //     .on('drag', onDrag)
        //     .on('dragend', function () { dragging = false; })

        // canvas.call(zoom);
        // canvas.call(drag);
    }

    function enableRotation(startingAngle = 300) {
        timer = d3.timer(function (elapsed) {
            projection.rotate([startingAngle + globeConfig.speed * elapsed, globeConfig.verticalTilt, globeConfig.horizontalTilt]);
            // projection.rotate([90,0,0]);
            svg.selectAll("path").attr("d", path);
            // drawMarkers();
        });
    }

    function drawOcean() {
        g.append("path")
            .datum({ type: "Sphere" })
            .attr("class", "water")
            .attr("d", path)
    }

    function drawGraticule() {
        const graticule = d3.geoGraticule()
            .step([10, 10]);

        g.selectAll("path.graticule")
            .data([graticule()])
            .enter()
            .append("path")
            .attr("class", "graticule")
            .attr("d", path)
            .style("fill", "transparent")
            .style("stroke", "rgba(204, 204, 204, 0.60)");
    }
}
