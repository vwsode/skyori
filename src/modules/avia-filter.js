import { renderTickets } from "./avia-tickets-render";

const filterAviaByStops = (data, stops) => {
  const res = data.filter((item) => {
    for (let index = 0; index < item.segments.length; index++) {
      const element = item.segments[index];
      if (element.stops.length === stops) {
        return true;
      }
    }
  });
  return res;
};

const aviaInputFields = document.querySelectorAll(".input-field__control");
aviaInputFields.forEach((element) => {
  element.addEventListener("change", (event) => {
    const data = JSON.parse(localStorage.getItem("tickets"));
    let mergedArray = [];

    const filterData = {
      All: data,
      NoTransfer: filterAviaByStops(data, 0),
      OneTransfer: filterAviaByStops(data, 1),
      TwoTransfer: filterAviaByStops(data, 2),
      ThreeTransfer: filterAviaByStops(data, 3),
    };

    event.target.classList.toggle("_active");

    aviaInputFields.forEach((item) => {
      if (item.classList.contains("_active")) {
        if (item.dataset.stops === "all")
          mergedArray = mergedArray.concat(filterData.All);
        if (item.dataset.stops === "0")
          mergedArray = mergedArray.concat(filterData.NoTransfer);
        if (item.dataset.stops === "1")
          mergedArray = mergedArray.concat(filterData.OneTransfer);
        if (item.dataset.stops === "2")
          mergedArray = mergedArray.concat(filterData.TwoTransfer);
        if (item.dataset.stops === "3")
          mergedArray = mergedArray.concat(filterData.ThreeTransfer);
      }
    });

    const map = new Map(mergedArray.map((o) => [o.id, o]));
    const unique = [...map.values()];
    renderTickets(unique);
  });
});
