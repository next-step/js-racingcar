import "./css/index.css";
import App from "./components/App";
import { $, id2Query } from "./common/dom";

new App($(id2Query("app")));
