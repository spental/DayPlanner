// VARIABLES

var todaysDate = $("#todaysDate");
var scheduleContent = $(".scheduelcontent");
var timeRow = $(".hourByHour");
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");
var userContent = [];

function startSchedule() {
    timeRow.each(function(){
        var thisRow= $(this);
        var thisRowHr = parseInt(thisRow.attr("data-time"));

        var todoObj = {
            hour: thisRowHr,
            text: "",
        }
        userContent.push(todoObj);
    });
    localStorage.setItem("userToDos", JSON.stringify(userContent))
    console.log("schedule runs");
};
function saveData (){
    var hourToUpdate = $(this).parent().attr("data-time");
    var itemsToAdd = (($(this).parent()).children("textarea")).val();
    for (var j = 0; j < userContent.length; j++) {
       if (userContent[j].hour == hourToUpdate) {
           userContent[j].text = itemsToAdd;
       }
    }
    localStorage.setItem("userToDos", JSON.stringify(userContent));
    renderSchedule();
    console.log("save data runs");
}
// function setUpRows() {
//     timeRow.each(function() {
//         var thisRow = $(this);
//         var thisRowHr = parsenInt(thisRow.attr("data-time"));

//         if (thisRowHr == currentHour){
//             thisRow.addClass("present").removeClass("past future");
//         }
//         if (thisRowHr < currentHour){
//             thisRow.addClass("past").removeClass("present future");
//         }
//         if (thisRowHr > currentHour){
//             thisRow.addClass("future").removeClass("past present");
//         }
//     });
// }
// getting arrays or pull from local 
function renderSchedule() {

    userContent = localStorage.getItem("userToDos");
    userContent = JSON.parse(userContent);

    for (var i = 0; i <userContent.length; i++){
        var itemHour = userContent[i].hour;
        var itemText = userContent[i].text;
        $("[data-time=" + itemHour + "]").children("textarea").val(itemText);
    }
    console.log("render schedule works");
}
$(document).ready(function(){
    // setUpRows();
    if (!localStorage.getItem("userToDos")){
        startSchedule();
    }
    todaysDate.text(currentDate);
    renderSchedule();
    scheduleContent.on("click", "button", saveData);
    console.log("it works");
});


