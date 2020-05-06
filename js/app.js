// GET GRID CONTAINER
const gridBox = document.getElementById("employee-main");
const container = document.getElementById("container");

// GENERATE RANDOM EMPLOYEES
const url = 'https://randomuser.me/api/?results=12';

// SEARCH INPUT
const searchInput = document.getElementById('search');

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
    const data = json.results.map( employee => {

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

    // SEARCH BY NAME
    searchEmployee();
}


// CREATE FUNCTION FOR A MODAL INFOMATION
function modalCard(employees) {
    console.log(employees)
    const birthday = new Date(Date.parse(employees.dob.date)).toLocaleDateString()  

    modalCardDiv.className = "modal-card";
    modalCardDiv.innerHTML = `
        <p class="close">&times;</p>
        <img class="back" src="img/icons8-back-50.png" alt="back-arrow"/>
        <img class="forward" src="img/icons8-forward-50.png" alt="forward-arrow"/>
        <div class ="info">
            <img class="avatar" src="${employees.picture.large}" >
            <h3>${employees.name.first} ${employees.name.last}</h3>
            <p>${employees.email}</p>
            <p>${employees.location.city}</p>
            <hr class="line">
            <p>${employees.cell}</p>
            <p>${employees.location.street.number} 
                ${employees.location.street.name} 
                ${employees.nat} 
                ${employees.location.postcode}</p>
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
            modalCard(data[i])
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


// Working on Exceeds Expectations
function nextOrBackModal(i) {
    modalCardDiv.addEventListener('click', (e) => {
        console.log(e.target)

        if(e.target.className === "back") {
            console.log('back clicked')
            modalCard(data)
        } else if(e.target.className === "forward") {
            console.log('forward clicked')
            modalCard(data)
        }
    })
}

// SEARCH EMPLOYEES BY NAME
function searchEmployee() {
    searchInput.addEventListener("input", e=> {

        // LOWERCASE THE INPUT VALUE
        let inputValue = e.target.value.toLowerCase();

        // GET ALL THE EMPLOYEE INFOMATION CARDS
        const cards = gridBox.querySelectorAll('.card');

        // GET ALL THE EMPLOYEE NAME IN THE CARDS
        const names = gridBox.querySelectorAll('.card .name');

        // LOOP THROUGH NAMES THAT INCLUDES SEARCH INPUT VALUE
        names.forEach(( name, i ) => {

            // CAPITALIZE NAME TO LOWER CASE
            const nameLowerCase = name.textContent.toLowerCase();

            // IF NAME AND INPUT VALUE IS NOT MATCHED DISPLAY NONE
            if(!nameLowerCase.includes(inputValue)) {
                cards[i].style.display = "none"
            } else { // ELSE DISPLAY ON THE APP
                cards[i].style.display = "grid"
            }
        })
    })
}