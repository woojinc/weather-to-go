import { 
    renderSlider,
    numMonthToName
} from "./slider";
import { renderSelectedCountry } from "./selected-map";

export const renderMap = (month) => {

    const color = d3.scaleQuantize()
        .domain([45, 90])
        .range(["#3288BD", "#66C2A5", "#ABDDA4", "#E6F598",
            "#FFFFBF", "#FEE08B", "#FDAE61", "#F46D43", "#D53E4F", "#9E0142"]);

    const temperatureColor = (id, countryTemperature) => {
        
        if (countryTemperature[id] !== undefined) {
            const jsonCountryTemperature = countryTemperature[id].temperature;
            return color(jsonCountryTemperature)
        } else {
            return "black"
        }
    }

    let width = 600, height = 400, centered;

    let projection = d3.geoMercator()
        .center([90, 0])
        .scale(100)
        .rotate([0, 0]);

    let svg = d3.select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    let g = svg.append('g');

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
            .on("click", function (d) {
                clicked(d);
                renderSelectedCountry("update", d, temperatureColor(d.id, temperature));
            });

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
                g.attr('transform', d3.event.transform)
            })

        svg.call(zoom);
    }
}
