
console.log('app working')
// GET GRID CONTAINER
const gridBox = document.getElementById("employee-main");
// GENERATE RANDOM EMPLOYEES
const url = 'https://randomuser.me/api/?results=12'


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
    json.results.map( employee => {
        console.log(employee)

        // CREATE EACH SECTION FOR EACH EMPLOYEE
        const section = document.createElement("section");
        section.classList.add('card')

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
    })
}


// DISPLAY ALL 12 EMPLOYEES TO THE WEBSITE
fetcingData('https://randomuser.me/api/?results=12')
    .then(disPlayEmployees)