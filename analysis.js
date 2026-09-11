// ======================================================
// GET SAVED RESULT
// ======================================================

const savedData =
    localStorage.getItem("superpowerAnalysis");


if (!savedData) {

    // If someone opens analysis.html directly
    // without completing the test

    window.location.href = "index.html";

}


const data =
    JSON.parse(savedData);


// ======================================================
// ELEMENTS
// ======================================================

const scoreElement =
    document.getElementById("score");

const scoreCircle =
    document.getElementById("scoreCircle");

const rankElement =
    document.getElementById("rank");

const commentElement =
    document.getElementById("comment");

const powerElement =
    document.getElementById("power");

const memeElement =
    document.getElementById("meme");


// ======================================================
// MAIN SCORE
// ======================================================

scoreElement.textContent =
    data.score.toFixed(2);


rankElement.textContent =
    data.rank;


commentElement.textContent =
    `"${data.comment}"`;


powerElement.textContent =
    data.power;


// ======================================================
// SCORE CIRCLE
// ======================================================

const scoreDegrees =
    data.score * 3.6;


scoreCircle.style.background = `
    conic-gradient(
        #e62429 ${scoreDegrees}deg,
        #ffd21f ${scoreDegrees}deg,
        #ddd ${scoreDegrees}deg
    )
`;


// ======================================================
// STATISTICS
// ======================================================

function setStat(
    value,
    textId,
    barId
) {

    const text =
        document.getElementById(textId);

    const bar =
        document.getElementById(barId);


    text.textContent =
        value.toFixed(1) + "%";


    setTimeout(() => {

        bar.style.width =
            value + "%";

    }, 200);

}


setStat(
    data.straightness,
    "straightness",
    "straightnessBar"
);


setStat(
    data.endpoint,
    "endpoint",
    "endpointBar"
);


setStat(
    data.start,
    "start",
    "startBar"
);


setStat(
    data.end,
    "end",
    "endBar"
);


// ======================================================
// REACTION TIME
// ======================================================

document.getElementById(
    "reactionTime"
).textContent =
    data.reactionTime.toFixed(2) + " sec";


// ======================================================
// MEME
// ======================================================

memeElement.src =
    data.meme;


// ======================================================
// TRY AGAIN
// ======================================================

document.getElementById(
    "tryAgain"
).addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "superpowerAnalysis"
        );

        window.location.href =
            "index.html";

    }
);