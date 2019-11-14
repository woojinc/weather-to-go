import {
    renderSlider,
    numMonthToName
} from "./slider";

import {
    color,
    temperatureColor,
} from "./helper"

import { renderSelectedCountry } from "./selected-map";

export const renderMap = (month) => {

    let width = 500,
        height = 500,
        center = [-width / 2 + 3, 0],
        sens = 0.25,
        centeredFeature,
        timer,
        scaleChange,
        selectedFeature,
        originalScale = height / 2.1,
        scale = originalScale;

    const globeConfig = {
        speed: 0.005,
        verticalTilt: -23.5,
        horizontalTilt: 0
    }

    let svgVisual = d3.select("#map").append("svg"),
        svgFunctional = d3.select("#functional-map").append("svg"),
        gVisual = svgVisual.append('g'),
        gFunctional = svgFunctional.append('g');

    svgVisual.attr("width", width).attr("height", height);
    svgFunctional.attr("width", width).attr("height", height);

    let canvas = d3.select("#canvas").append("canvas");
    canvas
        .attr("width", width)
        .attr("height", height)
        .style('position', 'absolute')
        .style('left', '0');

    let context, stationData = [];

    let projection = d3.geoOrthographic().translate([width / 2, height / 2]),
        path = d3.geoPath().projection(projection);

    const initialScale = projection.scale();

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

        stationData = stations;

        const data = d3.range(10);

        // const tempScaleGroup = svgVisual.append("tempScaleGroup")

        const tempRangeBg = svgVisual.select

        const rects = svgVisual.selectAll(".rects")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", 10)
            .attr("height", 10)
            .attr("y", (d, i) => 10 + i * 9)
            .attr("width", 10)
            .attr("fill", d => color(100 - d * 10))
            .attr("stroke", "gray");

        svgVisual.selectAll("text")
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

        const geojson = topojson.feature(topology, topology.objects.countries);

        const tooltip = d3.select(".tooltip");

        drawOcean();
        drawGraticule();

        gVisual.selectAll("path.land")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("class", "land")
            .attr("d", path)
            .style("fill", function (d) {
                return temperatureColor(d.id, temperature);
            });

        let countries = gFunctional.selectAll("path.land")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("class", "land")
            .attr("d", path)
            .style("fill", "transparent")
            .on("click", function (d) {
                click(d, temperature)
            });

        function click(d, temperature) {
            selectedFeature = d;
            // console.log(selectedFeature.id);
            timer.stop();
            clicked(selectedFeature);
            // console.log("still me")

            renderSelectedCountry(
                "update",
                selectedFeature,
                temperatureColor(selectedFeature.id, temperature),
                stationData[selectedFeature.id]);
            selectedCountryName = document.querySelector("#selected-country-name");
            countryName = isoToCountryName[selectedFeature.id];
            selectedCountryTemp = temperature[selectedFeature.id].temperature;

            selectedCountryName.innerHTML = `${countryName}</br>Avg Temp. ${selectedCountryTemp.toFixed(1)} &#176;F`;
        }

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
                tooltip.style("opacity", 0)
                    .style("top", 0 + "px")
                    .style("left", 0 + "px");
            });

        gFunctional.call(
            d3.drag()
                .subject(function () {
                    const r = projection.rotate();
                    return {
                        x: r[0] / sens, y: -r[1] / sens
                        // x: r[0], y: r[1]
                    };
                })
                .on("drag", function () {
                    timer.stop();
                    const rotate = projection.rotate();
                    let scaleFactor = initialScale / projection.scale();
                    projection.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
                    svgVisual.selectAll("path").attr("d", path);
                    svgFunctional.selectAll("path").attr("d", path);
                    drawStations();
                }));

        const clicked = (selectedFeature) => {

            let centroid, inverted, currentRotate, desiredRotate, r, currentScale, desiredScale, s;

            if (!selectedFeature || centeredFeature === selectedFeature) {
                centeredFeature = null;
                centroid = path.centroid(selectedFeature);
                inverted = projection.invert([centroid[0], centroid[1]]);
                currentRotate = projection.rotate();

                currentScale = projection.scale();

                r = d3.interpolate(currentRotate, [currentRotate[0], globeConfig.verticalTilt, globeConfig.horizontalTilt]);
                // s = d3.interpolate(currentScale, initialScale);

            } else {
                centroid = path.centroid(selectedFeature);
                inverted = projection.invert([centroid[0], centroid[1]]);
                currentRotate = projection.rotate();

                currentScale = projection.scale();
                // desiredScale = projection.scale();

                r = d3.interpolate(currentRotate, [-inverted[0], -inverted[1]]);
                // s = d3.interpolate(currentScale, 200);
                centeredFeature = selectedFeature;
            }
            gVisual.transition()
                .duration(750)
                .tween("rotate", function () {
                    return function (t) {
                        projection.rotate(r(t));
                        svgVisual.selectAll("path").attr("d", path);
                        svgFunctional.selectAll("path").attr("d", path);
                        drawStations();
                    }
                })
                .on("end", function () {
                    if (!centeredFeature) {
                        enableRotation(currentRotate[0])
                    }
                });
            let selectedCountryName = document.querySelector("#selected-country-name");
            let countryName = isoToCountryName[selectedFeature.id];
            let selectedCountryTemp = temperature[selectedFeature.id].temperature;

            selectedCountryName.innerHTML = `${countryName}</br>Avg Temp. ${selectedCountryTemp.toFixed(1) } &#176;F`;
        };

        enableRotation();

        renderSlider(month);
        renderSelectedCountry(
            "create",
            geojson.features[5],
            color(temperature[geojson.features[5].id].temperature),
            stations[geojson.features[5].id],
        );

        let selectedCountryName = document.querySelector("#selected-country-name");
        let countryName = isoToCountryName[geojson.features[5].id];
        let selectedCountryTemp = temperature[geojson.features[5].id].temperature;

        selectedCountryName.innerHTML = `${countryName}</br>Avg Temp. ${selectedCountryTemp.toFixed(1) } &#176;F`;

        let selectedCountry;
        document.getElementById("month-slider")
            .addEventListener("input", e => {
                const sliderLabel = document.getElementById("slider-current-month");

                let currentMonth = Number(e.target.value);
                let currentMonthString = e.target.value;

                sliderLabel.innerHTML = numMonthToName[currentMonth];

                if (currentMonthString.length === 1) {
                    currentMonthString = "0" + currentMonthString;
                }

                queue()
                    // .defer(d3.json, "./data/world-110m2.json")
                    .defer(d3.json, `./data/tas-2016-${currentMonthString}.json`)
                    // .defer(d3.json, "./data/iso-num-to-country.json")
                    .defer(d3.json, `./data/gsom-2016-${currentMonthString}-tavg-prcp.json`)
                    .await(handleSlider);
                function handleSlider(
                    error,
                    temperature,
                    stations
                ) {
                    if (error) throw error;
                    // console.log("hello")

                    gVisual.selectAll("path.land")
                        .style("fill", function (d) {
                            return temperatureColor(d.id, temperature);
                        })
                        .style("stroke", "#eee");

                    let gFunctional = d3.select("#selected-country").select('g');

                    gFunctional.selectAll("path")
                        .style("fill", function (d) {
                            selectedCountry = d.id || selectedCountry;
                            return temperatureColor(d.id, temperature);
                        })
                        .style("stroke", "#eee");

                    countries.on("click", function (d) {
                        click(d, temperature);
                    });

                    // d3.json(`./data/gsom-2016-${currentMonthString}-tavg-prcp.json`, function (error, station) {
                    stationData = stations;
                    drawStations();
                    renderSelectedCountry(
                        "update",
                        selectedFeature,
                        temperatureColor(selectedCountry, temperature),
                        stationData[selectedCountry]
                    );

                    selectedCountryName = document.querySelector("#selected-country-name");
                    countryName = isoToCountryName[selectedFeature.id];
                    selectedCountryTemp = temperature[selectedFeature.id].temperature;

                    selectedCountryName.innerHTML = `${countryName}</br>Avg Temp. ${selectedCountryTemp.toFixed(1) } &#176;F`;

                    // })
                }
            

                // d3.json(`./data/tas-2016-${currentMonthString}.json`, function (error, temperature) {
                //     if (error) throw error;

                //     gVisual.selectAll("path.land")
                //         .style("fill", function (d) {
                //             return temperatureColor(d.id, temperature);
                //         })
                //         .style("stroke", "#eee");

                //     let gFunctional = d3.select("#selected-country").select('g');

                //     gFunctional.selectAll("path")
                //         .style("fill", function (d) {
                //             selectedCountry = d.id || selectedCountry;
                //             return temperatureColor(d.id, temperature);
                //         })
                //         .style("stroke", "#eee");

                //     countries.on("click", function(d) {
                //             click(d, temperature);
                //         });

                //     d3.json(`./data/gsom-2016-${currentMonthString}-tavg-prcp.json`, function (error, station) {
                //         stationData = station;
                //         drawStations();
                //         renderSelectedCountry(
                //             "update",
                //             selectedFeature,
                //             temperatureColor(selectedCountry, temperature),
                //             // stationData);
                //             stationData[selectedCountry]);

                //     })
                // })


            });

    // zoom and pan
    const zoom = d3.zoom()
        .scaleExtent([1, Infinity])
        .on('zoom', () => {
            zoomed();
        })

    gFunctional.call(zoom);

    let previousScaleFactor = 1, originalScale = height / 2.1;

    function zoomed() {

        let dx = d3.event.sourceEvent.movementX;
        let dy = d3.event.sourceEvent.movementY;

        let event = d3.event.sourceEvent.type;

        context.save();
        context.clearRect(0, 0, width, height);
        // console.log("scale-pre",scale);

        if (event === 'wheel') {
            // console.log(d3.event.transform.k);
            let scaleFactor = d3.event.transform.k;
            scaleChange = scaleFactor - previousScaleFactor;
            scale = scale + scaleChange * originalScale;

            projection.scale(scale);
            previousScaleFactor = scaleFactor;

            gVisual.selectAll("path").attr("d", path);
            gFunctional.selectAll("path").attr("d", path);

        } else {

            // let r = projection.rotate();
            // rotation = [r[0] + dx * 0.4, r[1] - dy * 0.5, r[2]];
            // projection.rotate(rotation);

            // gVisual.selectAll("path").attr("d", path);
            // gFunctional.selectAll("path").attr("d", path);

        }

        // requestAnimationFrame(drawStations);
        drawStations();

        // context.restore();

    }
}
function drawStationsSpecifiedCanvas(canvas, stationData) {
    context = canvas.node().getContext('2d');
    context.save();

    context.setTransform([1, 0, 0, 1, 0, 0]);

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

            if ((startLongitude < endLongitude &&
                longitude > startLongitude &&
                longitude < endLongitude) ||
                (startLongitude > endLongitude &&
                    (longitude > startLongitude || longitude < endLongitude))) {

                let ending = projection([station.LONGITUDE, station.LATITUDE]);
                context.beginPath();
                context.arc(ending[0], ending[1], 2, 0, Math.PI * 2);
                context.strokeStyle = 'rgba(144, 253, 222, ' + 0.9 + ')';
                context.stroke();
                context.fillStyle = color(station.TAVG * (9 / 5) + 32);
                context.fill()
            }
        }

    }
}

    function drawStationsSpecificMonth(stationData) {
        context = canvas.node().getContext('2d');
        context.save();

        context.setTransform([1, 0, 0, 1, 0, 0]);

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

function drawStations() {
    context = canvas.node().getContext('2d');
    context.save();

    context.setTransform([1, 0, 0, 1, 0, 0]);

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
        svgVisual.selectAll("path").attr("d", path);
        svgFunctional.selectAll("path").attr("d", path);
        drawStations();
    });
}

function drawOcean() {

    gFunctional.selectAll("path.ocean")
        .data([{ type: "Sphere" }])
        .enter()
        .append("path")
        .style("fill", "transparent")

    gVisual.selectAll("path.ocean")
        .data([{ type: "Sphere" }])
        .enter()
        .append("path")
        .attr("class", "ocean")
    // .attr("class", "ocean")
}

function drawGraticule() {
    const graticule = d3.geoGraticule()
        .step([10, 10]);

    gVisual.selectAll("path.graticule")
        .data([graticule()])
        .enter()
        .append("path")
        .attr("class", "graticule")
        .attr("d", path)
        .style("fill", "transparent")
}
}
