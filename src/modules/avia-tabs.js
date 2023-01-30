import { renderTickets } from './avia-tickets-render';

const aviaTicketsTabs = document.querySelectorAll('.avia-tickets__tab');

aviaTicketsTabs.forEach((element) => {
    element.addEventListener('click', (event) => {
        const data = JSON.parse(localStorage.getItem('tickets'));
        let sortedData = [];

        aviaTicketsTabs.forEach((el) => el.classList.remove('_active'));

        element.classList.add('_active');

        switch (event.target.dataset.sort) {
            case 'price':
                sortedData = data.sort((a, b) => a.price - b.price);
                return renderTickets(sortedData);
            case 'duration':
                sortedData = data.sort((a, b) => a.duration - b.duration);
                return renderTickets(sortedData);
        }
    });
});
