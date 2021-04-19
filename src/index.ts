import "./css/index.css";
import App from "./components/App";
import { id2Query } from "./common/utils";

new App(document.querySelector(id2Query("app")) as HTMLElement);
