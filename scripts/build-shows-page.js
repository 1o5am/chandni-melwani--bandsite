// const shows = [
//     {
//         date: 'Mon Sept 09 2024',
//         venue: 'Ronald Lane',
//         location: 'San Francisco, CA'
//     },
//     {
//         date: 'Tue Sept 17 2024',
//         venue: 'Pier 3 East',
//         location: 'San Francisco, CA'
//     },
//     {
//         date: 'Sat Oct 12 2024',
//         venue: 'View Lounge',
//         location: 'San Francisco, CA'
//     },
//     {
//         date: 'Sat Nov 16 2024',
//         venue: 'Hyatt Agency',
//         location: 'San Francisco, CA'
//     },
//     {
//         date: 'Fri Nov 29 2024',
//         venue: 'Moscow Center',
//         location: 'San Francisco, CA'
//     },
//     {
//         date: 'Wed Dec 18 2024',
//         venue: 'Press Club',
//         location: 'San Francisco, CA'
//     }
// ];

const API_KEY = 'chandni';
const api = new BandSiteApi(API_KEY);

function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    });
}

function createShowElement(show) {
    const showElement = document.createElement('div');
    showElement.className = 'show';

    const dateSection = document.createElement('div');
    dateSection.className = 'show__info';
    
    const dateLabel = document.createElement('p');
    dateLabel.className = 'show__label';
    dateLabel.textContent = 'DATE';
    
    const dateText = document.createElement('p');
    dateText.className = 'show__info--date';
    // dateText.textContent = show.date;
    dateText.textContent = new Date(show.date).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    });
    
    dateSection.appendChild(dateLabel);
    dateSection.appendChild(dateText);

    const venueSection = document.createElement('div');
    venueSection.className = 'show__info';
    
    const venueLabel = document.createElement('p');
    venueLabel.className = 'show__label';
    venueLabel.textContent = 'VENUE';
    
    const venueText = document.createElement('p');
    venueText.className = 'show__info--venue';
    venueText.textContent = show.place;
    
    venueSection.appendChild(venueLabel);
    venueSection.appendChild(venueText);

    const locationSection = document.createElement('div');
    locationSection.className = 'show__info';
    
    const locationLabel = document.createElement('p');
    locationLabel.className = 'show__label';
    locationLabel.textContent = 'LOCATION';
    
    const locationText = document.createElement('p');
    locationText.className = 'show__info--location';
    locationText.textContent = show.location;
    
    locationSection.appendChild(locationLabel);
    locationSection.appendChild(locationText);

    const button = document.createElement('button');
    button.className = 'show__button';
    button.textContent = 'BUY TICKETS';

    showElement.addEventListener('click', () => {
        document.querySelectorAll('.show').forEach(show => {
            show.classList.remove('show--selected');
        });
        showElement.classList.add('show--selected');
    });

    showElement.appendChild(dateSection);
    showElement.appendChild(venueSection);
    showElement.appendChild(locationSection);
    showElement.appendChild(button);

    return showElement;
}

async function initializeShows() {
    const showsContainer = document.getElementById('shows-container');
    if (!showsContainer) {
        console.error('Shows container not found!');
        return;
    }

    try {
        const shows = await api.getShows();

        const header = document.createElement('div');
        header.className = 'shows__header';
        
        const headers = ['DATE', 'VENUE', 'LOCATION'];
        headers.forEach(text => {
            const cell = document.createElement('div');
            cell.className = 'shows__header-cell';
            cell.textContent = text;
            header.appendChild(cell);
        });

        const spacerCell = document.createElement('div');
        spacerCell.className = 'shows__header-cell';
        header.appendChild(spacerCell);

        showsContainer.appendChild(header);

        shows.forEach(show => {
            const showElement = createShowElement(show);
            showsContainer.appendChild(showElement);
        });
    } catch (error) {
        console.error('Error loading shows:', error);
    }
}

document.addEventListener('DOMContentLoaded', initializeShows);