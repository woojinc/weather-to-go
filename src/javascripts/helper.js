export const color = d3.scaleLinear()
    .domain([20, 40, 50, 65, 75, 85, 90, 100])
    .range(["#fffafa",
        "#00a6ca",
        "#00ccbc",
        "#90eb9d",
        "#ffff8c",
        "#f9d057",
        "#f29e2e",
        "#d7191c"]);

export const temperatureColor = (id, countryTemperature) => {

    if (countryTemperature[id] !== undefined) {
        const jsonCountryTemperature = countryTemperature[id].temperature;
        return color(jsonCountryTemperature)
    } else {
        return "black"
    }
}
