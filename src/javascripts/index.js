import "../styles/index.scss";
import { renderMap } from "./map";
import { renderSlider } from "./slider";
import axios from "axios";

window.addEventListener("DOMContentLoaded", () => {
    renderMap(10);
});