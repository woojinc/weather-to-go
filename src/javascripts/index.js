import "../styles/index.scss";
import {renderMap} from "./map";
import axios from "axios";

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("app").innerText = "Hello World!";
    console.log(renderMap);
    renderMap();
});