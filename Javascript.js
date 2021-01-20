// VARIABLES

var todaysDate = $("#todaysDate");
var scheduleContent = $(".scheduelcontent");
var timeRow = $(".hourByHour");
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");
var userContent = [];

function startSchedule() {
    timeRow.each(function() {
        var thisRow = $(this);
        var thisRowHr = parseInt(thisRow.attr("data-time"));

        var todoObj = {
            hour: thisRowHr,
            text: "",
        }
        userContent.push(todoObj);
    });
    localStorage.setItem("userToDos", JSON.stringify(userContent))
};

function saveData() {
    var hourToUpdate = $(this).parent().attr("data-time");
    var itemsToAdd = (($(this).parent()).children("textarea")).val();
    for (var j = 0; j < userContent.length; j++) {
        if (userContent[j].hour == hourToUpdate) {
            userContent[j].text = itemsToAdd;
        }
    }
    localStorage.setItem("userToDos", JSON.stringify(userContent));
    renderSchedule();
}

function colorRows() {
    timeRow.each(function() {
        var thisRow = $(this);
        var thisRowHr = parseInt(thisRow.attr("data-time"));

        if (thisRowHr == currentHour) {
            thisRow.addClass("current").removeClass("past future");
        }
        if (thisRowHr < currentHour) {
            thisRow.addClass("past").removeClass("current future");
        }
        if (thisRowHr > currentHour) {
            thisRow.addClass("future").removeClass("past current");
        }
    });
}

function renderSchedule() {

    userContent = localStorage.getItem("userToDos");
    userContent = JSON.parse(userContent);

    for (var i = 0; i < userContent.length; i++) {
        var itemHour = userContent[i].hour;
        var itemText = userContent[i].text;
        $("[data-time=" + itemHour + "]").children("textarea").val(itemText);
    }
}
$(document).ready(function() {
    colorRows();

    if (!localStorage.getItem("userToDos")) {
        startSchedule();
    }
    todaysDate.text(currentDate);
    renderSchedule();
    scheduleContent.on("click", "button", saveData);
});


console.log("I HATE THESE HOMEWORKS AND JAVASCRIPT!!")