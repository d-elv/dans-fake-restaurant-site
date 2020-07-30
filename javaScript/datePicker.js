const DATE_PICKER_ELEMENT = document.querySelector(".date-picker");
const SELECTED_DATE_ELEMENT = document.querySelector(
    ".date-picker .selected-date"
);
const DATES_ELEMENT = document.querySelector(".date-picker .dates");
const MTH_ELEMENT = document.querySelector(".date-picker .dates .month .mth");
const NEXT_MTH_ELEMENT = document.querySelector(
    ".date-picker .dates .month .next-mth"
);
const PREV_MTH_ELEMENT = document.querySelector(
    ".date-picker .dates .month .prev-mth"
);
const DAYS_ELEMENT = document.querySelector(".date-picker .dates .days");
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const thirtyDayMonths = ["April", "June", "September", "November"];
const thirtyDayMonthsIndexes = [3, 5, 8, 10];
const twentyEightDayIndex = [1];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

let amountOfDays = 31;

SELECTED_DATE_ELEMENT.textContent = formatDate(date);
SELECTED_DATE_ELEMENT.dataset.value = selectedDate;

currentMonthRender();
populateDates();
// EVENT LISTENERS
DATE_PICKER_ELEMENT.addEventListener("click", toggleDatePicker);
NEXT_MTH_ELEMENT.addEventListener("click", goToNextMonth);
PREV_MTH_ELEMENT.addEventListener("click", goToPrevMonth);

// FUNCTIONS

function toggleDatePicker(e) {
    if (!checkEventPathForClass(e.path, "dates")) {
        DATES_ELEMENT.classList.toggle("active");
    }
}

function goToNextMonth(e) {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    currentMonthRender();
    populateDates();
}
function goToPrevMonth(e) {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    currentMonthRender();
    populateDates();
}

function populateDates(e) {
    DAYS_ELEMENT.innerHTML = "";

    if (thirtyDayMonthsIndexes.includes(month)) {
        amountOfDays = 30;
    } else if (twentyEightDayIndex.includes(month)) {
        amountOfDays = 28;
    } else {
        amountOfDays = 31;
    }

    for (let i = 0; i < amountOfDays; i++) {
        const DAY_ELEMENT = document.createElement("div");
        DAY_ELEMENT.classList.add("day");
        DAY_ELEMENT.textContent = i + 1;

        if (
            selectedDay == i + 1 &&
            selectedYear == year &&
            selectedMonth == month
        ) {
            DAY_ELEMENT.classList.add("selected");
        }
        DAY_ELEMENT.addEventListener("click", function () {
            selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1));
            selectedDay = i + 1;
            selectedMonth = month;
            selectedYear = year;
            SELECTED_DATE_ELEMENT.textContent = formatDate(selectedDate);
            SELECTED_DATE_ELEMENT.dataset.value = selectedDate;

            populateDates();
        });

        DAYS_ELEMENT.appendChild(DAY_ELEMENT);
    }
}

// HELPER FUNCTIONS
function checkEventPathForClass(path, selector) {
    for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }
    return false;
}

function currentMonthRender() {
    MTH_ELEMENT.textContent = months[month] + " " + year;
}

function formatDate(d) {
    let day = d.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    let month = d.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    let year = d.getFullYear();
    return day + " / " + month + " / " + year;
}
