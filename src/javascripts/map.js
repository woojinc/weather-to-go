import { 
    renderSlider,
    numMonthToName
} from "./slider";
import { renderSelectedCountry } from "./selected-map";

export const renderMap = (month) => {

    const color = d3.scaleQuantize()
        .domain([45, 90])
        .range(["#3288BD80", "#66C2A580", "#ABDDA480", "#E6F59880",
            "#FFFFBF80", "#FEE08B80", "#FDAE6180", "#F46D4380", "#D53E4F80", "#9E014280"]);

    const temperatureColor = (id, countryTemperature) => {
        
        if (countryTemperature[id] !== undefined) {
            const jsonCountryTemperature = countryTemperature[id].temperature;
            return color(jsonCountryTemperature)
        } else {
            return "black"
        }
    }

    let width = 500, height = 500, center = [-width / 2 + 3, 0], sens = 0.25, centered, timer;

    const globeConfig = {
        speed: 0.005,
        verticalTilt: -23.5,
        horizontalTilt: 0
    }

    // let projection = d3.geoMercator()
    //     .center([90, 0])
    //     .scale(100)
    //     .rotate([0, 0]);

    let svg = d3.select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    let g = svg.append('g');
    let projection = d3.geoOrthographic()
        .center(center)
        // .scale(200);
    const initialScale = projection.scale();
    const initialCenter = projection.center();
    console.log(initialScale);
    console.log(initialCenter);


    let path = d3.geoPath().projection(projection);

    enableRotation();
    
    // drawGraticule();
    queue()
        .defer(d3.json, "./data/world-110m2.json")
        .defer(d3.json, `./data/tas-2016-${month}.json`)
        .await(renderGlobalMap);
    // enableRotation();
    
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
            .attr("fill", d => color(100 - d*10))
            .attr("stroke", "gray");

        const geojson = topojson.feature(topology, topology.objects.countries);

        g.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function (d) {
                return temperatureColor(d.id, temperature);
            })
            .style("stroke", "#eee")
            .call(d3.drag()
                .subject(function () { 
                    const r = projection.rotate(); 
                    return { 
                        x: r[0] / sens, y: -r[1] / sens 
                        // x: 0, y: 0
                    }; 
                })
                .on("drag", function () {
                    timer.stop();
                    const rotate = projection.rotate();
                    // console.log(d3.event.x);
                    projection.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
                    svg.selectAll("path").attr("d", path);
                    // svg.selectAll(".focused").classed("focused", focused = false);
                }))
            .on("click", function (d) {
                clicked(d);
                renderSelectedCountry("update", d, temperatureColor(d.id, temperature));
            });

        

        // enableRotation();

        function clicked(d) {
            let x = 0, y = 0;

            // If the click was on the centered state or the background, re-center.
            // Otherwise, center the clicked-on state.
            if (!d || centered === d) {
                centered = null;
            } else {
                let centroid = path.centroid(d);
                x = width / 2 - centroid[0];
                y = height / 2 - centroid[1];
                centered = d;
            }

            // Transition to the new transform.
            g.transition()
                .duration(750)
                .attr("transform", "translate(" + x + "," + y + ")");
        }

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

                d3.json(`./data/tas-2016-${currentMonthString}.json`, function(error, temperature) {
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
            .on('zoom', () => {
                g.style('stroke-width', `${1.5 / d3.event.transform.k}px`)
                g.attr('transform', d3.event.traform)
            })

        svg.call(zoom);
    }

    function enableRotation() {
        timer = d3.timer(function (elapsed) {
            projection.rotate([globeConfig.speed * elapsed - 120, globeConfig.verticalTilt, globeConfig.horizontalTilt]);
            // projection.rotate([90,0,0]);
            svg.selectAll("path").attr("d", path);
            // drawMarkers();
        });
    }  

    function drawGraticule() {
        const graticule = d3.geoGraticule()
            .step([10, 10]);

        g.selectAll("path")
            .datum(graticule)
            .enter()
            .append("gpath")
            .attr("class", "graticule")
            .attr("d", path)
            .style("fill", "transparent")
            .style("stroke", "rgba(204, 204, 204, 0.60)");
    }
}
