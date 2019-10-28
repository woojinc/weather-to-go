import {
    renderSlider,
    numMonthToName
} from "./slider";

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
        zoom, centeredFeature, timer, scaleChange, originalScale = height / 2.1,
        scale = originalScale;

    const globeConfig = {
        speed: 0.005,
        verticalTilt: -23.5,
        horizontalTilt: 0
    }

    let svg = d3.select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    let canvas = d3.select("#canvas").append("canvas")
        .attr("width", width)
        .attr("height", height)
        .style('position', 'absolute')
        .style('left', '0');

    let g = svg.append('g');

    let svg2 = d3.select("#functional-map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    let g2 = svg2.append('g');
    let context;

    let projection = d3.geoOrthographic()
        .translate([width / 2, height / 2]);

    const initialScale = projection.scale();

    let path = d3.geoPath().projection(projection);

    let stationData = [];

    queue()
        .defer(d3.json, "./data/world-110m2.json")
        .defer(d3.json, `./data/tas-2016-${month}.json`)
        .defer(d3.json, "./data/iso-num-to-country.json")
        .defer(d3.json, `./data/gsom-2016-${month}-tavg-prcp.json`)
        .await(renderGlobalMap);

    function renderGlobalMap(
        error,
        topology,
        temperature,
        isoToCountryName,
        stations,
    ) {
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
        const tooltip = d3.select(".tooltip");


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
            .on("click", function (selectedFeature) {
                timer.stop();
                clicked(selectedFeature);
                renderSelectedCountry("update",
                    selectedFeature,
                    temperatureColor(selectedFeature.id, temperature),
                    stations[selectedFeature.id]);
            });

        let countries = g2.selectAll("path.land")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("class", "land")
            .attr("d", path)
            .style("fill", "transparent")
            .on("click", function (selectedFeature) {
                console.log(selectedFeature.id);
                timer.stop();
                clicked(selectedFeature);
                renderSelectedCountry("update",
                    selectedFeature,
                    temperatureColor(selectedFeature.id, temperature),
                    stations[selectedFeature.id]);
            });

        stationData = stations;
        // drawStations();

        countries.on("mouseover", function (d, i) {
            d3.select(this)
                .attr("fill", "grey")
                .style("stroke", "#eee")
                .attr("stroke-width", 3);

            return tooltip.style("opacity", .9)
                .text(isoToCountryName[d.id]);
        })
            .on("mousemove", function (d) {
                tooltip.style("opacity", .9)
                    .style("top", (d3.event.pageY) + "px")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .text(isoToCountryName[d.id]);
            })
            .on("mouseout", function (d, i) {
                d3.select(this)
                    .attr("fill", "white")
                    .attr("stroke-width", 1);
                tooltip.style("opacity", 0);
            });

        g2.call(
            d3.drag()
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
                    svg2.selectAll("path").attr("d", path);
                    drawStations();
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
                        svg.selectAll("path").attr("d", path);
                        svg2.selectAll("path").attr("d", path);
                        drawStations();
                    }
                })
                .on("end", function () {
                    if (!centeredFeature) {
                        enableRotation(currentRotate[0])
                    }
                });
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
                    g.selectAll("path.land")
                        .style("fill", function (d) {
                            return temperatureColor(d.id, temperature);
                        })
                        .style("stroke", "#eee");

                    let g2 = d3.select("#selected-country").select('g');

                    g2.selectAll("path")
                        .style("fill", function (d) {
                            return temperatureColor(d.id, temperature);
                        })
                        .style("stroke", "#eee");
                    
                    let canvas2 = d3.select("#selected-canvas").select("canvas");
                    
                })
                d3.json(`./data/gsom-2016-${currentMonthString}-tavg-prcp.json`, function (error, station) {
                    stationData = station;
                    drawStations();
                })


            });

        // zoom and pan
        const zoom = d3.zoom()
            .scaleExtent([1, Infinity])
            // .translateExtent([[0, 0], [width, height]])
            // .extent([[0, 0], [width, height]])
            // .scaleExtent([0.5, 4])
            .on('zoom', () => {
                // g.style('stroke-width', `${1.5 / d3.event.transform.k}px`)
                // g2.style('stroke-width', `${1.5 / d3.event.transform.k}px`)

                // g.attr('transform', function (d) {
                //     return 'translate('
                //         + -250 * (d3.event.transform.k - 1) + ','
                //         + -250 * (d3.event.transform.k - 1) + ')'
                //         + 'scale(' + d3.event.transform.k + ')';
                // })
                // g2.attr('transform', function (d) {
                //     return 'translate('
                //         + -250 * (d3.event.transform.k - 1) + ','
                //         + -250 * (d3.event.transform.k - 1) + ')'
                //         + 'scale(' + d3.event.transform.k + ')';
                // })
                zoomed();
                // g.selectAll("path").attr("d", path);
                // g2.selectAll("path").attr("d", path);
                // zoomed();
                // drawStations();
            })

        // g.call(zoom);
        g2.call(zoom);
        // canvas.call(zoom);
        let czoom = d3.zoom()
            .scaleExtent([0.5, 4])
            .on("zoom", zoomed)



        let previousScaleFactor = 1, originalScale = height / 2.1;

        function zoomed() {


            let dx = d3.event.sourceEvent.movementX;
            let dy = d3.event.sourceEvent.movementY;

            let event = d3.event.sourceEvent.type;

            context.save();
            context.clearRect(0, 0, width, height);
            // console.log("scale-pre",scale);

            if (event === 'wheel') {
                console.log(d3.event.transform.k);
                let scaleFactor = d3.event.transform.k;
                scaleChange = scaleFactor - previousScaleFactor;
                scale = scale + scaleChange * originalScale;

                projection.scale(scale);
                previousScaleFactor = scaleFactor;

                g.selectAll("path").attr("d", path);
                g2.selectAll("path").attr("d", path);

            } else {

                // let r = projection.rotate();
                // rotation = [r[0] + dx * 0.4, r[1] - dy * 0.5, r[2]];
                // projection.rotate(rotation);

                // g.selectAll("path").attr("d", path);
                // g2.selectAll("path").attr("d", path);

            }

            // requestAnimationFrame(drawStations);
            drawStations();

            // context.restore();

        }
    }


    function drawStations() {
        context = canvas.node().getContext('2d');
        context.save();

        context.setTransform([1, 0, 0, 1, 0, 0]);

        // erase what is on the canvas currently
        context.clearRect(0, 0, width, height);

        context.restore();

        const pRotate = projection.rotate();

        for (let i in stationData) {
            let sationsPerCountry = stationData[i];
            for (let j in sationsPerCountry) {
                let station = sationsPerCountry[j],

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

    function enableRotation(startingAngle = 300) {
        timer = d3.timer(function (elapsed) {
            projection.rotate([startingAngle + globeConfig.speed * elapsed, globeConfig.verticalTilt, globeConfig.horizontalTilt]);
            svg.selectAll("path").attr("d", path);
            svg2.selectAll("path").attr("d", path);
            drawStations();
        });
    }

    function drawOcean() {
        g.selectAll("path.ocean")
            .data([{ type: "Sphere" }])
            .enter()
            .append("path")
            .attr("class", "ocean")
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
    }
}
