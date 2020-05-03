
console.log('app working')
// GET GRID CONTAINER
const gridBox = document.getElementById("employee-main");
const container = document.getElementById("container")
// GENERATE RANDOM EMPLOYEES
const url = 'https://randomuser.me/api/?results=12'

const modalDiv = document.createElement('div');

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


// FUNCTION FOR DISPLAY ALL 12 EMPLOYEES TO THE WEBSITE
function disPlayEmployees(json) {
    // LOOP THROUGH EACH EMPLOYEE FROM JSON DATA
    const data = json.results.map( employee => {
        // all employee to console.log
        // console.log(employee)

        // CREATE EACH SECTION FOR EACH EMPLOYEE
        const section = document.createElement("section");
        section.className = "card"

        // ADD TO GRID CONTAINER
        gridBox.appendChild(section);
        section.innerHTML = `
            <img class="avatar" src="${employee.picture.large}" alt="${employee.name.title} ${employee.name.last} ${employee.name.first}">
            <div class="text-wrapper">
                <h4 class="name">${employee.name.first} ${employee.name.last}</h4>
                <p class="email">${employee.email}</p>
                <p class="city">${employee.location.city}</p>
            </div>
        `
        return {... employee}
    })
    modalDisplay(data)
}

function modalDisplay(employees) {
    const cards = document.getElementsByClassName("card");
    employees.forEach( (element, i) => {
        // console.log(element)
        const birthday = new Date(Date.parse(element.dob.date)).toLocaleDateString()
        // console.log(i)
        cards[i].addEventListener('click', (event) => {
            console.log(event.target);
            console.log(cards[i]);
            const modal = document.createElement('div');
            modal.className = "modal-card"
            modal.innerHTML = `
                <p class="close">&times;</p>
                <img src="${element.picture.large}" >
                <h3>${element.name.first} ${element.name.last}</h3>
                <p>${element.email}</p>
                <p>${element.location.city}</p>
                <hr class="line">
                <p>${element.cell}</p>
                <p>${element.location.street.number} ${element.location.street.name} ${element.nat} ${element.location.postcode}</p>
                <p>Birthday: ${birthday}</p>
            `
            modalDiv.className = 'modalOverlay';
            modalDiv.appendChild(modal);
            container.appendChild(modalDiv);
        } )
    });
}


// DISPLAY ALL 12 EMPLOYEES TO THE WEBSITE
fetcingData('https://randomuser.me/api/?results=12')
.then( disPlayEmployees )

const closeModal = document.querySelector('.close');
        modalDiv.addEventListener('click', event => {
            if(event.target.className === "close") {
                modalDiv.style.display = "none";
            }
        })