//storing elements as variables to refer to later
let highScore = document.querySelector("#highScore");
let clear = document.querySelector("#clear");
let goBack = document.querySelector("#return");

//clear button will clear scores
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
//get scores from the local storage to add to list
let scoreList = localStorage.getItem("scoreList");
scoreList = JSON.parse(scoreList);

if (scoreList !== null) {

    for (var i = 0; i < scoreList.length; i++) {
        //create list items for each
        let createLi = document.createElement("li");
        createLi.textContent = scoreList[i].initials + " " + scoreList[i].score;
        highScore.appendChild(createLi);

    }
}
// listens for click to return to home screen
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});