//Documentation
//https://api.jquery.com/hide/

//TOGGLING VISIBILITY OF QUIZ QUESTIONS
let oneSelected = false;
let twoSelected = false;
let threeSelected = false;

let divContent = [];

$( document ).ready(function() {
    $("#questionOne").hide();
    $("#questionOne").fadeIn("slow");
    $("#questionTwo").hide();
    $("#questionThree").hide();
})


let preferences = [];

//When options are selected, they are added to the preferences array 
$(".option").click(function(){
    if (preferences.includes(this.textContent)) {
        this.style.border = "solid medium #292929"
        preferences.pop(this.textContent);
    } else {
        console.log(this);
        preferences.push(this.textContent);
        this.style.border = "solid medium #ec8f00 ";
    } 
    
    console.log(preferences);
    
})

$("#questionOne").click(function(){
    oneSelected = true;
})

$("#questionTwo").click(function(){
     twoSelected = true;
 })

$("#questionThree").click(function(){
    threeSelected = true;
    $(".cont-link").attr("href", "results.html")
})



$("#continue-button").on("click", function(){

    if (oneSelected === true) {
        $("#questionOne").toggle();
        $("#questionTwo").fadeIn("slow");
        oneSelected = false;
        twoSelected = true;
     } else if (twoSelected === true) {
        $("#questionTwo").toggle();
        $("#questionThree").fadeIn("slow");
        oneSelected = false;
        twoSelected = false;
        threeSelected = true;
    } 
    else if (threeSelected === true) {
        saveToLocalStorage();
        $("#questionThree").hide();
        threeSelected = false;
        $("#continue-button").hide();
    } 

})





//Save preferences to local storage
function saveToLocalStorage () {
    const preferencesString = JSON.stringify(preferences);
    localStorage.setItem('readerPreferences', preferencesString);

    console.log(localStorage.getItem('readerPreferences'));
}

