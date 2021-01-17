// VARIABLES

var currentDate = $("#todaysDate");
var scheduleContent = $("scheduelcontent");
var timeRow = $("hourByHour");
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");
var userContent = [];

// save function

function saveData (){
    var hourToUpdate = $(this).parent().attr("data-time");
    var itemsToAdd = (($(this).parent()).children("textarea")).val();
    for (var j = 0,; j < userContent.length; j++) {
       if (userContent[j].hour == hourToUpdate) {
           userContent[j].text = itemsToAdd;
       }
    }
    localStorage.setItem("userToDos", JSON.stringify(userContent));
    renderSchedule();
}







// declare new function
function startSchedule() {
    // loops DOM iterates over, selects data and adds to element
    timeRow.each(function(){
        var thisRow= $(this);
        var thisRowHr = parseInt(thisRow.attr("data-time"));

        var todoObj = {
            hour: thisRowHr,
            text: "",
        }
        userContent.push(todoObj);
    });
    // save to storage afer loops 
    localStorage.setItem("userToDos", JSON.stringify(userContent))
};

