export const renderMap = () => {
    var color = d3.scaleThreshold()
        .domain([
            -21,
            -13,
            5,
            14,
            23,
            32,
            41,
            50,
            59,
            68,
            86,
            95,
            104
        ])
        .range([
            "#a0a0a0",
            "#c0c0c0",
            "#dcdcdc",
            "#8ac8e6",
            "#01f0ff",
            "#8af091",
            "#eafc91",
            "#fffb00",
            "#b58f00",
            "#ff8f00",
            "#ff5400",
            "#ff2600",
            "#c21a00",
            "#610800",
        ]);


    var places = [
        {
            "x": 35.89174,
            "y": 34.39635,
            "temperature": 75.1,
        },
        {
            "x": 45.89174,
            "y": 14.39635,
            "temperature": 22.1,
        },
        {
            "x": 20.89174,
            "y": -20.39635,
            "temperature": -10.1,
        },
    ]

    let width = 960;
    let height = 500;

    let projection = d3.geoMercator()
        .center([0, 5])
        .scale(150)
        .rotate([0, 0]);

    let svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    let g = svg.append('g');

    let path = d3.geoPath()
        .projection(projection);

    queue()
        .defer(d3.json, "./data/world-110m2.json")
        .defer(d3.json, "./data/tas-2016-01.json")
        .await(ready);

    function ready(error, topology, temperature) {

        const geojson = topojson.feature(topology, topology.objects.countries);

        g.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function (d) {
                // console.log(d.id)
                // console.log(temperature[d.id].temperature)
                if (temperature[d.id] !== undefined) {
                    const jsonCountryTemperature = temperature[d.id].temperature;
                    // return jsonCountryTemperature
                    return color(jsonCountryTemperature)
                } else {
                    return "black"
                }
                // codraw(d.id)
            })
            .style("stroke", "#eee");
    }

    // d3.json("./data/world-110m2.json", function (error, topology) {
    //     if (error) throw error;

    //     // console.log("topojson", topology);
    //     var geojson = topojson.feature(topology, topology.objects.countries);
    //     // console.log("geojson", geojson);

    //     g.selectAll("path")
    //         .data(geojson.features)
    //         .enter()
    //         .append("path")
    //         .attr("d", path)
    //         .style("fill", function (d) {
    //             // console.log(d.id)
    //             console.log(draw(d.id))
    //             // codraw(d.id)
    //             return color(draw(d.id))})
    //         .style("stroke", "#eee");


    //     const tempeartures = g.selectAll("temperature")
    //     .data(places)
    //     .enter()
    //     .append("text", "temperature")
    //     .text(function (d) {
    //         return `${d.temperature} F`;
    //     })
    //     .attr("class", "temp-shadow")
    //     .attr("transform", function (d) {
    //         return "translate(" + projection([
    //             (d.x + 1),
    //             (d.y - 1)
    //         ]) + ")";
    //     });
    // });

    // function draw(iso3_id){
    //     const temperature = d3.json("./data/tas-2016-01.json", function(data) {
    //         if (data[iso3_id] !== undefined) {
    //             const jsonCountryTemperature = data[iso3_id].temperature;
    //             return jsonCountryTemperature
    //         } else {
    //             return ""
    //         }
    //     })
    //     console.log(temperature);
    //     return temperature;
    // }
    // var contours = d3.contours()
    //     .size([width, height])
    //     .thresholds(d3.range(2, 21).map(p => Math.pow(2, p)))
    //     (values);

    // // Temperature Text
    // const tempeartures = g.selectAll("temperature")
    //     .data(places)
    //     .enter()
    //     .append("text", "temperature")
    //     .text(function (d) {
    //         return `${d.temperature} F`;
    //     })
    //     .attr("class", "temp-shadow")
    //     .attr("transform", function (d) {
    //         return "translate(" + projection([
    //             (d.x + 1),
    //             (d.y - 1)
    //         ]) + ")";
    //     });

    // g.selectAll("temperature")
    //     .data(places)
    //     .enter()
    //     .append("text", "temperature")
    //     .text(function (d) {
    //         return `${d.temperature} F`;
    //     })
    //     .style("fill", function (d) {
    //         return color(+d.temperature);
    //     })
    //     .attr("transform", function (d) {
    //         return "translate(" + projection([
    //             d.x,
    //             d.y
    //         ]) + ")";
    //     });

    // const drag_handler = d3.drag()
    //     .on('start', drag_start)
    //     .on('drag', drag_drag);

    // function drag_start() {
    //     start_x = +d3.event.x
    //     start_y = +d3.event.y
    // }

    // function drag_drag(d) {
    //     //Get the current scale of the circle 
    //     //case where we haven't scaled the circle yet
    //     // get lon x lat
    //     console.log(start_x)
    //     console.log('lon x lat', projection.invert([d3.event.x, d3.event.y]))

    //     if (!this.getAttribute('transform'))
    //         current_scale = 1
    //     else {
    //         current_scale_string = this.getAttribute('transform').split(' ')[1]
    //         current_scale = +current_scale_string
    //             .substring(6, current_scale_string.length - 1)
    //     }
    //     d3.select(this)
    //         .attr('cx', d.x = start_x + ((d3.event.x - start_x) / current_scale))
    //         .attr('cy', d.y = start_y + ((d3.event.y - start_y) / current_scale))
    // }

    // drag_handler(tempeartures)

    // // zoom and pan
    // const zoom = d3.zoom()
    //     .on('zoom', () => {
    //         g.style('stroke-width', `${1.5 / d3.event.transform.k}px`)
    //         g.attr('transform', d3.event.transform) // updated for d3 v4
    //     })

    // svg.call(zoom)
    // });

    // d3.request("./data/output.tif", function(data) {
    //     console.log(data)
    // })

    // d3.json("./data/gsom-2018-02-tavg-prcp.json", function (data) {
    //     // console.log("tempData", data[0].LATITUDE);
    //     const tempeartures = g.selectAll("temperature")
    //         .data(data)
    //         .enter()
    //         // .append("text", "temperature")
    //         // .text(function (da) {
    //         //     return `${da.TAVG} F`;
    //         // })
    //         .append("circle", "temperature")
    //         .style("r", 1)
    //         .style("fill", function (da) {
    //             if (da.TAVG !== "") {
    //                 return color(+da.TAVG);
    //             } else {
    //                 return "transparent"
    //             }
    //         })
    //         .attr("transform", function (da) {
    //             return "translate(" + projection([
    //                 da.LONGITUDE,
    //                 da.LATITUDE
    //             ]) + ")";
    //         });

    //     var contours = d3.contours()
    //         .size([width, height])
    //         .thresholds(d3.range(2, 21).map(d =>{ 
    //             console.log(data)
    //             return Math.pow(2, d)
    //         }))
    //         (data);




    //     const drag_handler = d3.drag()
    //         .on('start', drag_start)
    //         .on('drag', drag_drag);

    //     function drag_start() {
    //         start_x = +d3.event.x
    //         start_y = +d3.event.y
    //     }

    //     function drag_drag(d) {
    //         //Get the current scale of the circle 
    //         //case where we haven't scaled the circle yet
    //         // get lon x lat
    //         console.log(start_x)
    //         console.log('lon x lat', projection.invert([d3.event.x, d3.event.y]))

    //         if (!this.getAttribute('transform'))
    //             current_scale = 1
    //         else {
    //             current_scale_string = this.getAttribute('transform').split(' ')[1]
    //             current_scale = +current_scale_string
    //                 .substring(6, current_scale_string.length - 1)
    //         }
    //         d3.select(this)
    //             .attr('cx', d.x = start_x + ((d3.event.x - start_x) / current_scale))
    //             .attr('cy', d.y = start_y + ((d3.event.y - start_y) / current_scale))
    //     }

    //     drag_handler(tempeartures)

    //     // zoom and pan
    //     const zoom = d3.zoom()
    //         .on('zoom', () => {
    //             g.style('stroke-width', `${1.5 / d3.event.transform.k}px`)
    //             g.attr('transform', d3.event.transform) // updated for d3 v4
    //         })

    //     svg.call(zoom)
    // });

}
