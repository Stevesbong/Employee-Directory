// GET GRID CONTAINER
const gridBox = document.getElementById("employee-main");
const container = document.getElementById("container");

// GENERATE RANDOM EMPLOYEES
const url = 'https://randomuser.me/api/?results=12'

let data = [];
// Modal Div
const modalDiv = document.createElement('div');
const modalCardDiv = document.createElement('div');

// FETCHING DATA FROM GENERATE RANDOM EMPLOYEES WEBSITE
// USING ASYNC / AWAIT AND FETCH() METHODS TO GET DATA
async function fetcingData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch ( error ) {
        throw error;
    }
}


// DISPLAY 12 EMPLOYEES TO THE WEBSITE
fetcingData('https://randomuser.me/api/?results=12')
.then( disPlayEmployees );


// FUNCTION FOR DISPLAY ALL 12 EMPLOYEES TO THE WEBSITE
function disPlayEmployees(json) {

    // LOOP THROUGH EACH EMPLOYEE FROM JSON DATA
    data = json.results.map( employee => {

        // CREATE EACH SECTION FOR EACH EMPLOYEE
        const section = document.createElement("section");
        section.className = "card";

        // CREATE EACH EMPLOYEE'S INFOMATION TO GRID CONTAINER
        section.innerHTML = `
            <img class="avatar" src="${employee.picture.large}" alt="${employee.name.title} ${employee.name.last} ${employee.name.first}">
            <div class="text-wrapper">
            <h4 class="name">${employee.name.first} ${employee.name.last}</h4>
            <p class="email">${employee.email}</p>
            <p class="city">${employee.location.city}</p>
            </div>
        `
        gridBox.appendChild(section);

        // RETURN EACH EMPLOYEES OBJECTS TO ONE ARRAY
        return { ... employee };
    })
    // DISPLAY EMPLOYEE INFOMATION TO MODAL
    displayCardsToModal(data);
}


// CREATE FUNCTION FOR A MODAL INFOMATION
function modalCard(i) {
    console.log(data[i])
    const birthday = new Date(Date.parse(data[i].dob.date)).toLocaleDateString()  

    modalCardDiv.className = "modal-card";
    modalCardDiv.innerHTML = `
        <p class="close">&times;</p>

            <img class="back" src="img/icons8-back-50.png" alt="back-arrow"/>


            <img class="forward" src="img/icons8-forward-50.png" alt="forward-arrow"/>

        <div class ="info">
            <img src="${data[i].picture.large}" >
            <h3>${data[i].name.first} ${data[i].name.last}</h3>
            <p>${data[i].email}</p>
            <p>${data[i].location.city}</p>
            <hr class="line">
            <p>${data[i].cell}</p>
            <p>${data[i].location.street.number} ${data[i].location.street.name} ${data[i].nat} ${data[i].location.postcode}</p>
            <p>Birthday: ${birthday}</p>
        </div>
    `
    modalDiv.style.display = "block"
    modalDiv.className = 'modalOverlay';
    modalDiv.appendChild(modalCardDiv);
    container.appendChild(modalDiv);
}


// CREATE FUNCTION FOR DISPLAY EMPLOYEE INFOMATION TO MODAL
function displayCardsToModal(data) {

    // WHEN EACH EMPLOYEE CLICKED DISPLAY MODAL
    const cards = gridBox.querySelectorAll(".card");
    cards.forEach( (element, i) => {
        element.addEventListener('click', () => {
            modalCard(i)
        });
    });
}


// CLOSE MODAL DISPLAY EVENT LISTENER
modalDiv.addEventListener('click', event => {

    // CLOSE THE MODAL WITH CLOSE BUTTON OR GRAY BACKGROUND 
    if(event.target.className === "close" || event.target.className === "modalOverlay") {
        modalDiv.style.display = "none";
    }
})

modalCardDiv.addEventListener('click', e => {
    let index = 0;
    if(e.target.className === "back") {
        if (index !== 0) {
            console.log('hi')
            modalCard(index--)
        }
    } else if(e.target.className === "forward") {
        if (index !== 12){
            modalCard(index++)
        }
    }
})