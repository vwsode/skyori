import "./index.html";
import "./sass/index.scss";

// Modules
import "./modules/avia-tabs";
import "./modules/avia-filter";

import { renderTickets } from "./modules/avia-tickets-render";
import { getAviaTicketsData } from "./api/requestAviaData";

window.addEventListener("load", async () => {
  const data = await getAviaTicketsData();
  localStorage.setItem("tickets", JSON.stringify(data));
  renderTickets(data);
});
