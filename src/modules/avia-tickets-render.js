import { toHoursAndMinutes, formatRusWord } from "./helpers";

export const renderTickets = (data) => {
  if (!data) {
    return;
  }
  const aviaTicketsList = document.querySelector(".avia-tickets__list");

  let content = "";

  data.forEach(({ price, carrier, segments }) => {
    content += `<li class="avia-tickets__item ticket">
                      <div class="ticket__header">
                        <h4 class="ticket__price">${price} P</h4>
                        <div class="ticket__company-logo">
                          <img src="http://pics.avs.io/99/36/${carrier}.png" />
                        </div>
                      </div>
                      <div class="ticket__info-segments">
                        ${renderSegments(segments)}
                      </div>
                    </li>`;
  });
  aviaTicketsList.innerHTML = content;
};

const renderSegments = (segments) => {
  let content = "";
  segments.forEach(({ origin, destination, date, duration, stops }) => {
    const datetimeFrom = `${new Date(date).getHours()}:${new Date(
      date
    ).getMinutes()}`;

    const datetimeTo = `${new Date(
      new Date(date).setHours(
        new Date(date).getHours() + Math.ceil(duration / 60)
      )
    ).getHours()}:${new Date(
      new Date(date).setMinutes(new Date(date).getMinutes() + duration)
    ).getMinutes()}`;

    content += `
              <div class="info-segment">
                <div class="info-segment__route">
                  <span class="info-segment__title">${origin} – ${destination}</span>
                  <span class="info-segment__desc">${datetimeFrom} – ${datetimeTo}</span>
                </div>
                <div class="info-segment__time">
                  <span class="info-segment__title">В пути </span>
                  <span class="info-segment__desc">${toHoursAndMinutes(
                    duration
                  )}</span>
                </div>
                <div class="info-segment__transfer">
                  <span class="info-segment__title">${
                    stops.length
                  } ${formatRusWord(stops.length, [
      "пересадка",
      "пересадки",
      "пересадок",
    ])} </span>
                  <span class="info-segment__desc">${stops}</span>
                </div>
              </div>`;
  });
  return content;
};
