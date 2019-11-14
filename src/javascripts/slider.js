export const numMonthToName = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
}




export const renderSlider = (month) => {
    const slider = document.getElementById("slider");
    slider.setAttribute("id", "slider-container");

    const sliderLabel = document.createElement("div");
    sliderLabel.setAttribute("id", "slider-current-month");
    sliderLabel.innerHTML = numMonthToName[month];

    const sliderSetting = document.createElement("input");
    sliderSetting.setAttribute("id", "month-slider");
    sliderSetting.setAttribute("type", "range");
    sliderSetting.setAttribute("min", "1");
    sliderSetting.setAttribute("max", "12");
    sliderSetting.setAttribute("value", "10");
    sliderSetting.setAttribute("step", "1");

    slider.appendChild(sliderSetting);
    slider.appendChild(sliderLabel);
}
