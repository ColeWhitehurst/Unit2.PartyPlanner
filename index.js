const API = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2502-FTB-ET-WEB-FT/Events';

const state = {
    events: [],
};

const form = document.querySelector('#partyForm');

async function getEvents() {
    try {
        const response = await fetch(API);
        const json = await response.json();
        state.events = json.data;
    } catch (error) {
        console.error(error);
    }
}

async function render() {
    await getEvents();
    renderEvents();
}

async function addEvent(event) {
    // const date = new Date(form.date.value);
    event.preventDefault();
    const eventInfo = {
        name: form.name.value,
        description: form.description.value,
        date: new Date(form.date.value),
        location: form.location.value,
    };
    
    
    try {
        const response = await fetch(API, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(eventInfo),
        });
        const json = await response.json();
        form.name.value = '';
        form.description.value = '';
        form.date.value = '';
        form.location.value = '';
        // if (json.error) {
        //     throw new Error(json.error.message);
        // }
    } catch (error) {
        console.error(error);
    }

    // await addEvent(event);
    render();
}

async function deleteEvent(id) {
    try {
        const response = await fetch(`${API}/${id}`, {
            method: "DELETE",
        });
        render();
    } catch (error) {
        console.error(error);
    }
}

// const form = document.querySelector('#partyForm');
form.addEventListener('submit', addEvent);
//     const event = {
//         name: form.eventName.value,
//         description: form.description.value,
//         date: newDate(form.date.value),
//         location: form.location.value,
//     };
//     console.log(event);
    
//     await addEvent(event);
//     render();
// };

function renderEvents() {
    const eventList = document.querySelector('.party');

    if (!state.events.length) {
        eventList.innerHTML = '<li>No events.</li>';
        return;
    }

    const eventCards = state.events.map((event) => {
        const card = document.createElement('li');
        card.classList.add('event');
        card.innerHTML = `
        <h2>${event.name}</h2>
        <p>${event.date}</p>
        <p>${event.location}</p>
        <p>${event.description}</p>
        `;


        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Event';
        card.append(deleteButton);

        deleteButton.addEventListener('click', () => deleteEvent(event.id));

        return card;
    });

    eventList.replaceChildren(...eventCards);
};

render();