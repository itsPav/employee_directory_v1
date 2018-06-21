// variable to hold response data
var userData;

// FETCH Function for 12 users that are from US or GB
fetch('https://randomuser.me/api/?nat=us,gb&results=12')
    .then(response => response.json())
    .then(data => {
        userData = data.results;
        log(userData);
    })
    .catch(error => {
        console.log(error);
});

const grid = document.querySelector('.grid');

function log(userData) {
    var elementNum = 0;
    // for each user in userData, create a div and append all the data to it
    // also add event listener to this div and show a modal window on pop up
    userData.forEach(element => {
        appendInfo(element, elementNum);
        elementNum++;
    })

    var cells = document.querySelectorAll('.cell');
    cells.forEach(element => {
        element.addEventListener('click', showWindow);
    });
}

function appendInfo(data, elementNum) {
    let userCell = document.createElement("div");
    userCell.className = "cell";
    userCell.setAttribute('data-id', elementNum)

    let userImg = document.createElement("img");
    userImg.src = data.picture.medium;

    // append name with capitalized letters in first and last name
    let fullName = document.createElement("h2");
    fullName.innerHTML = data.name.first[0].toUpperCase() + data.name.first.substring(1) 
        + " " + 
        data.name.last[0].toUpperCase() + data.name.last.substring(1);
    fullName.setAttribute('class', 'fullName');

    let email = document.createElement("p");
    email.innerHTML = data.email;
    email.setAttribute('class', 'cardText');

    let cityName = document.createElement("p");
    cityName.innerHTML = data.location.city[0].toUpperCase() + data.location.city.substring(1);
    cityName.setAttribute('class', 'cardText');

    grid.appendChild(userCell).appendChild(userImg);
    grid.appendChild(userCell).appendChild(fullName);
    grid.appendChild(userCell).appendChild(email);
    grid.appendChild(userCell).appendChild(cityName);;

    var cells = document.querySelectorAll('.cell');
    cells.forEach(element => {
        element.addEventListener('click', showWindow);
    });
}

// Modal Window
var close = document.getElementById('close');
var modal = document.getElementById('myModal');
var modalContent = document.getElementsByClassName('modal-content')[0];
var blocks = document.getElementsByClassName('cell');
var currentUser;

const profilePic = document.getElementById('profilePic');
const name = document.getElementById('name');
const city = document.getElementById('city');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const fullLocation = document.getElementById('location');
const dob = document.getElementById('dob');
const user = document.getElementById('username');

close.addEventListener('click', () => {
    modal.style.display = "none";
});

function showWindow(e) {

    modal.style.display = "block";

    // get block index
    console.log(this.dataset.id);
    currentUser = parseInt(this.dataset.id);

    profilePic.src = userData[currentUser].picture.medium;

    // append name with capitalized letters in first and last name
    name.innerHTML = userData[currentUser].name.first[0].toUpperCase() + userData[currentUser].name.first.substring(1) 
    + " " + 
    userData[currentUser].name.last[0].toUpperCase() + userData[currentUser].name.last.substring(1);

    email.innerHTML = userData[currentUser].email;

    var locationData = userData[currentUser].location;
    city.innerHTML = locationData.city;

    phone.innerHTML = userData[currentUser].phone;
    user.innerHTML = userData[currentUser].login.username;

    fullLocation.innerHTML = locationData.street + locationData.city + locationData.state + locationData.postcode;

    dob.innerHTML = "Birthday: " + userData[currentUser].dob.date;
}

// check index of clicked div
function nodeIndex(node) {
    let index = 0;
    for (index; index < blocks.length; index++) {
        if(node == blocks[index])
            break;
    }
    return index;
}

// hide modal window when click is anywhere in modal dim window
window.onclick = function(e) {
        if(e.target == modal)
        {
            modal.style.display = 'none';
        }
}

// employee filter
const nameSearch = document.getElementById('nameSearch');
const usernameSearch = document.getElementById('usernameSearch');

nameSearch.addEventListener('input', e => {
    searchByName(e.target.value.toLowerCase());
});

usernameSearch.addEventListener('input', e => {
    searchByUser(e.target.value.toLowerCase());
});

function searchByName(person) {
    grid.innerHTML = "";

    if(person == "")
    {
        grid.innerHTML = "";
        log(userData);
    }
    else if (person != "") {
        userData.forEach(element => {

            let firstName = element.name.first;

            if(firstName.includes(person)) {
                appendInfo(element);
            }
        })
    }
}

function searchByUser(user) {
    grid.innerHTML = "";

    if(user == "")
    {
        grid.innerHTML = "";
        log(userData);
    }
    else if (user != "") {
        userData.forEach(element => {

            let userName = element.login.username;

            if(userName.includes(user)) {
                appendInfo(element);
            }
        })
    }
}

// previous and next employee
const left = document.getElementById('left');
const right = document.getElementById('right');

left.addEventListener('click', () => {
    showUser(-1);
});
right.addEventListener('click', () => {
    showUser(1);
});

function showUser(num) {
    // clear content

    currentUser = parseInt(currentUser);

    if(currentUser == 0 && num == -1)
    {
        currentUser = blocks.length - 1;
    } 
    else if (currentUser == (blocks.length - 1) && num == 1) 
    {
        currentUser = 0;
    } else {
        currentUser = currentUser + num;
    }

    console.log(currentUser);

    // get the previous user info
    profilePic.src = userData[currentUser].picture.medium;

    // append name with capitalized letters in first and last name
    name.innerHTML = userData[currentUser].name.first[0].toUpperCase() + userData[currentUser].name.first.substring(1) 
    + " " + 
    userData[currentUser].name.last[0].toUpperCase() + userData[currentUser].name.last.substring(1);

    email.innerHTML = userData[currentUser].email;

    var locationData = userData[currentUser].location;
    city.innerHTML = locationData.city;

    phone.innerHTML = userData[currentUser].phone;
    user.innerHTML = userData[currentUser].username;

    fullLocation.innerHTML = locationData.street + locationData.city + locationData.state + locationData.postcode;

    dob.innerHTML = userData[currentUser].dob.date;
}