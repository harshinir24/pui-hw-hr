//Documentation
//https://api.jquery.com/hide/

//TOGGLING VISIBILITY OF QUIZ QUESTIONS
let oneSelected = false;
//let twoSelected = false;
let threeSelected = false;
let fourSelected = false;

$( document ).ready(function() {
    //$("#questionTwo").hide();
    $("#questionThree").hide();
    $("#questionFour").hide();
    $("#resultsButton").hide();
})

let visibleAssets = [1, 2, 3 ,4]
let preferences = [];

//When options are selected, they are added to the preferences array 
$(".optionText").click(function(){
    if (preferences.includes(this.textContent)) {
        return;
    } else {
        console.log(this);
        preferences.push(this.textContent);
        this.style.border = "#ec8f00";
    } 
    

    console.log(preferences);
    //console.log(preferences);
})

$("#questionOne").click(function(){
    //console.log(preferences);
    oneSelected = true;
})

// $("#questionTwo").click(function(){
//     //console.log(preferences);
//     twoSelected = true;
// })

$("#questionThree").click(function(){
    //console.log(preferences);
    threeSelected = true;
})

$("#questionFour").click(function(){
    //console.log(preferences);
    fourSelected = true;
})


$("#continueButton").click(function(){

    if (oneSelected === true) {
        $("#questionOne").toggle();
    //     $("#questionTwo").toggle();
    //     oneSelected = false;
    // } else if (twoSelected === true) {
    //     $("#questionTwo").toggle();
        $("#questionThree").toggle();
        oneSelected = false;
    } 
    else if (threeSelected === true) {
        $("#questionThree").toggle();
        $("#questionFour").toggle();
        threeSelected = false;
    } 

    if (fourSelected = true) {
        saveToLocalStorage();
        $("#resultsButton").toggle();

    }

})



//Save preferences to local storage
function saveToLocalStorage () {
    const preferencesString = JSON.stringify(preferences);
    localStorage.setItem('readerPreferences', preferencesString);

    console.log(localStorage.getItem('readerPreferences'));
}

