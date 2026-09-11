const savedData = localStorage.getItem("superpowerAnalysis");


// If there is no result, return to the game
if (!savedData) {
    window.location.href = "index.html";
}


const data = JSON.parse(savedData);


// --------------------------------------------------
// BASIC RESULT
// --------------------------------------------------

const score = Number(data.score) || 0;


document.getElementById("score").textContent =
    Math.round(score);


document.getElementById("rank").textContent =
    getRank(score);


document.getElementById("comment").textContent =
    `"${getComment(score)}"`;


document.getElementById("power").textContent =
    getSuperpower(score);


// --------------------------------------------------
// SCORE CIRCLE
// --------------------------------------------------

const scoreDegrees = score * 3.6;


document.getElementById("scoreCircle").style.background = `
    conic-gradient(
        #e62429 ${scoreDegrees}deg,
        #ffd21f ${scoreDegrees}deg,
        #ddd ${scoreDegrees}deg
    )
`;


// --------------------------------------------------
// DUMB ANALYSIS PARAMETERS
// --------------------------------------------------


// AIM CONFIDENCE
const aimConfidence = randomAround(score, 10);


// BRAIN COORDINATION
const brainCoordination = randomAround(score, 15);


// REFLEX STABILITY
const reflexStability = randomAround(score, 20);


// LINE VIBES
const lineVibes = randomAround(score, 8);


// VILLAIN INTIMIDATION
const villainIntimidation = randomAround(score, 25);


// Display everything

setStat(
    aimConfidence,
    "aimConfidence",
    "aimConfidenceBar"
);


setStat(
    brainCoordination,
    "brainCoordination",
    "brainCoordinationBar"
);


setStat(
    reflexStability,
    "reflexStability",
    "reflexStabilityBar"
);


setStat(
    lineVibes,
    "lineVibes",
    "lineVibesBar"
);


setStat(
    villainIntimidation,
    "villainIntimidation",
    "villainIntimidationBar"
);


// --------------------------------------------------
// MEME
// --------------------------------------------------


// Your three memes:
//
// meme_good.jpg
// meme_mid.jpg
// meme_bad.jpg

let memePath;
let memeCaption;


if (score >= 70) {

    memePath = "assets/happy.png";

    memeCaption =
        "The scientists are concerned. You may actually be useful.";

}
else if (score >= 40) {

    memePath = "assets/mid.png";

    memeCaption =
        "There is potential here. Unfortunately, it is mostly potential.";

}
else {

    memePath = "assets/bad.png";

    memeCaption =
        "Further testing is recommended. Preferably by someone else.";

}


document.getElementById("meme").src = memePath;


document.getElementById("memeCaption").textContent =
    memeCaption;


// --------------------------------------------------
// FINAL CONCLUSION
// --------------------------------------------------

document.getElementById("finalConclusion").textContent =
    getConclusion(score);


// --------------------------------------------------
// TRY AGAIN
// --------------------------------------------------

document.getElementById("tryAgain").addEventListener("click", function () {

    localStorage.removeItem("superpowerAnalysis");

    window.location.href = "index.html";

});


// ==================================================
// FUNCTIONS
// ==================================================


function setStat(value, textId, barId) {

    value = Math.max(0, Math.min(100, value));

    document.getElementById(textId).textContent =
        Math.round(value) + "%";


    setTimeout(function () {

        document.getElementById(barId).style.width =
            value + "%";

    }, 300);
}


function randomAround(value, range) {

    const random =
        value + (Math.random() * range * 2 - range);

    return Math.max(0, Math.min(100, random));
}


// --------------------------------------------------
// RANK
// --------------------------------------------------

function getRank(score) {

    if (score >= 90)
        return "LEGENDARY HERO";

    if (score >= 70)
        return "CERTIFIED HERO";

    if (score >= 40)
        return "SIDEKICK MATERIAL";

    return "PROFESSIONAL NPC";
}


// --------------------------------------------------
// SUPERPOWER
// --------------------------------------------------

function getSuperpower(score) {

    if (score >= 90) {

        const powers = [

            "LASER VISION 👁️",

            "SUPERHUMAN REFLEXES ⚡",

            "TELEPATHY 🧠",

            "ABILITY TO ALWAYS FIND THE REMOTE 📺"

        ];

        return randomItem(powers);
    }


    if (score >= 70) {

        const powers = [

            "ENHANCED AIM 🎯",

            "MINOR TELEKINESIS 🌀",

            "DANGER DETECTION 🚨",

            "SUPREME SNACK DETECTION 🍕"

        ];

        return randomItem(powers);
    }


    if (score >= 40) {

        const powers = [

            "AVERAGE HUMAN REFLEXES 🧍",

            "EXTRA LOUD SIGHING 😮‍💨",

            "REMOTE CONTROL DETECTION 📺",

            "ABILITY TO IGNORE ALARMS ⏰"

        ];

        return randomItem(powers);
    }


    return "PROFESSIONAL NPC STATUS 🎮";
}


// --------------------------------------------------
// SARCASTIC COMMENT
// --------------------------------------------------

function getComment(score) {

    if (score >= 90) {

        const comments = [

            "Okay... that's actually suspiciously good.",

            "The Justice League may contact you shortly.",

            "We may have accidentally created a superhero.",

            "Please stop being this accurate. It's making us uncomfortable."

        ];

        return randomItem(comments);
    }


    if (score >= 70) {

        const comments = [

            "Not bad. Your cape is almost ready.",

            "You're getting dangerously close to being useful.",

            "Batman would probably approve.",

            "Honestly... better than expected. We hate that."

        ];

        return randomItem(comments);
    }


    if (score >= 40) {

        const comments = [

            "Technically a human achievement.",

            "Your superpower is probably still buffering.",

            "The superhero application is under review.",

            "There is hope. Somewhere. Probably."

        ];

        return randomItem(comments);
    }


    const comments = [

        "Please return your imaginary cape.",

        "The villain is currently laughing at you.",

        "Congratulations. You have unlocked NPC mode.",

        "Your superpower appears to be missing.",

        "Even the villain gave you a second chance."

    ];

    return randomItem(comments);
}


// --------------------------------------------------
// FINAL CONCLUSION
// --------------------------------------------------

function getConclusion(score) {

    if (score >= 90) {

        return "THE RESULTS ARE... SUSPICIOUSLY IMPRESSIVE.";

    }

    if (score >= 70) {

        return "YOU MAY ACTUALLY HAVE A SUPERPOWER.";

    }

    if (score >= 40) {

        return "THERE IS... SOME KIND OF POTENTIAL.";

    }

    return "SCIENTIFICALLY SPEAKING, PLEASE TRY AGAIN.";
}


// --------------------------------------------------
// RANDOM ITEM
// --------------------------------------------------

function randomItem(array) {

    return array[
        Math.floor(Math.random() * array.length)
    ];

}