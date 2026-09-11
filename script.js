const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

const checkButton = document.getElementById("checkButton");
const resetButton = document.getElementById("resetButton");


// ======================================================
// VARIABLES
// ======================================================

let drawing = false;

let points = [];

let startPoint = null;
let endPoint = null;

let startTime = 0;
let endTime = 0;


// ======================================================
// GET CANVAS COORDINATES
// ======================================================

function getCanvasPoint(event) {

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {

        x: (event.clientX - rect.left) * scaleX,

        y: (event.clientY - rect.top) * scaleY

    };
}


// ======================================================
// START DRAWING
// The FIRST point becomes Superman's eye/start point
// ======================================================

canvas.addEventListener("mousedown", function(event) {

    drawing = true;

    points = [];

    startTime = performance.now();

    const point = getCanvasPoint(event);

    // First coordinate
    startPoint = {
        x: point.x,
        y: point.y
    };

    points.push(point);

    ctx.beginPath();

    ctx.moveTo(
        point.x,
        point.y
    );

});


// ======================================================
// DRAW
// ======================================================

canvas.addEventListener("mousemove", function(event) {

    if (!drawing) return;

    const point = getCanvasPoint(event);

    points.push(point);

    ctx.lineTo(
        point.x,
        point.y
    );

    ctx.strokeStyle = "#e62429";

    ctx.lineWidth = 5;

    ctx.lineCap = "round";

    ctx.lineJoin = "round";

    ctx.stroke();

});


// ======================================================
// STOP DRAWING
// The LAST coordinate becomes villain/end point
// ======================================================

canvas.addEventListener("mouseup", function(event) {

    if (!drawing) return;

    drawing = false;

    endTime = performance.now();

    const point = getCanvasPoint(event);

    endPoint = {
        x: point.x,
        y: point.y
    };

    points.push(point);

});


// ======================================================
// IF MOUSE LEAVES CANVAS
// ======================================================

canvas.addEventListener("mouseleave", function(event) {

    if (!drawing) return;

    drawing = false;

    endTime = performance.now();

    const point = getCanvasPoint(event);

    endPoint = {
        x: point.x,
        y: point.y
    };

    points.push(point);

});


// ======================================================
// DISTANCE BETWEEN TWO POINTS
// ======================================================

function distance(a, b) {

    const dx = a.x - b.x;

    const dy = a.y - b.y;

    return Math.sqrt(
        dx * dx + dy * dy
    );

}


// ======================================================
// DISTANCE FROM POINT TO LINE SEGMENT
// ======================================================

function pointToSegmentDistance(
    point,
    start,
    end
) {

    const dx = end.x - start.x;

    const dy = end.y - start.y;

    const lengthSquared =
        dx * dx + dy * dy;


    if (lengthSquared === 0) {

        return distance(
            point,
            start
        );

    }


    let t =

        (
            (point.x - start.x) * dx +
            (point.y - start.y) * dy
        )
        /
        lengthSquared;


    t = Math.max(
        0,
        Math.min(1, t)
    );


    const closestPoint = {

        x: start.x + t * dx,

        y: start.y + t * dy

    };


    return distance(
        point,
        closestPoint
    );

}


// ======================================================
// CALCULATE RESULT
// ======================================================

function calculateResult() {

    if (
        points.length < 5 ||
        !startPoint ||
        !endPoint
    ) {

        alert(
            "Draw a line from Superman's eye to the villain first! 🦸"
        );

        return null;
    }


    // ==================================================
    // STRAIGHTNESS
    // ==================================================

    let totalDeviation = 0;


    for (const point of points) {

        totalDeviation +=

            pointToSegmentDistance(
                point,
                startPoint,
                endPoint
            );

    }


    const averageDeviation =

        totalDeviation /
        points.length;


    // Maximum deviation that still
    // receives a reasonable score

    const MAX_DEVIATION = 80;


    let straightnessAccuracy =

        100 -
        (
            averageDeviation /
            MAX_DEVIATION
        ) * 100;


    straightnessAccuracy =

        Math.max(
            0,
            Math.min(
                100,
                straightnessAccuracy
            )
        );


    // ==================================================
    // FINAL SCORE
    // ==================================================

    // Since the actual start and end points
    // are automatically taken from the user's
    // drawing, we don't need separate endpoint
    // accuracy anymore.

    let finalAccuracy =
        straightnessAccuracy;


    finalAccuracy =

        Math.max(
            0,
            Math.min(
                100,
                finalAccuracy
            )
        );


    // ==================================================
    // DRAWING TIME
    // ==================================================

    let reactionTime = 0;


    if (
        startTime &&
        endTime
    ) {

        reactionTime =

            (
                endTime -
                startTime
            ) / 1000;

    }


    return {

        finalAccuracy,

        straightnessAccuracy,

        reactionTime

    };

}


// ======================================================
// SUPERPOWER
// ======================================================

function getSuperpower(score) {

    if (score >= 90) {

        const powers = [

            "LASER VISION 👁️",

            "SUPERHUMAN REFLEXES ⚡",

            "TELEPATHY 🧠"

        ];

        return powers[
            Math.floor(
                Math.random() * powers.length
            )
        ];

    }


    if (score >= 70) {

        const powers = [

            "ENHANCED AIM 🎯",

            "MINOR TELEKINESIS 🌀",

            "SUPER REFLEXES ⚡"

        ];

        return powers[
            Math.floor(
                Math.random() * powers.length
            )
        ];

    }


    if (score >= 40) {

        const powers = [

            "REMOTE CONTROL DETECTION 📺",

            "SNACK DETECTION 🍕",

            "AVERAGE HUMAN REFLEXES 🧍"

        ];

        return powers[
            Math.floor(
                Math.random() * powers.length
            )
        ];

    }


    return "PROFESSIONAL NPC STATUS 🎮";

}


// ======================================================
// RANK
// ======================================================

function getRank(score) {

    if (score >= 90)
        return "LEGENDARY HERO";

    if (score >= 70)
        return "CERTIFIED HERO";

    if (score >= 40)
        return "SIDEKICK MATERIAL";

    return "NPC";

}


// ======================================================
// SARCASTIC COMMENT
// ======================================================

function getComment(score) {

    if (score >= 90) {

        return [
            "Okay... that's actually suspiciously good.",
            "The Justice League may contact you shortly.",
            "We may have accidentally created a superhero."
        ][
            Math.floor(
                Math.random() * 3
            )
        ];

    }


    if (score >= 70) {

        return [
            "Not bad. Your cape is almost ready.",
            "You're getting dangerously close to being useful.",
            "Batman would probably approve."
        ][
            Math.floor(
                Math.random() * 3
            )
        ];

    }


    if (score >= 40) {

        return [
            "Technically a human achievement.",
            "Your superpower is probably still buffering.",
            "The superhero application is under review."
        ][
            Math.floor(
                Math.random() * 3
            )
        ];

    }


    return [
        "Please return your imaginary cape.",
        "The villain is currently laughing at you.",
        "Congratulations. You have unlocked NPC mode."
    ][
        Math.floor(
            Math.random() * 3
        )
    ];

}


// ======================================================
// MEME
// ======================================================

function getMeme(score) {

    if (score >= 90)
        return "assets/meme_good.jpg";

    if (score >= 40)
        return "assets/meme_mid.jpg";

    return "assets/meme_bad.jpg";

}


// ======================================================
// CHECK BUTTON
// ======================================================

checkButton.addEventListener(
    "click",
    function() {

        // Finish drawing if still active

        if (drawing) {

            drawing = false;

            endTime = performance.now();

            if (points.length > 0) {

                const lastPoint =
                    points[points.length - 1];

                endPoint = {
                    x: lastPoint.x,
                    y: lastPoint.y
                };

            }

        }


        const result =
            calculateResult();


        if (!result) return;


        const score =

            Math.round(
                result.finalAccuracy * 100
            ) / 100;


        const analysisData = {

            score: score,

            straightness:

                Math.round(
                    result.straightnessAccuracy * 100
                ) / 100,

            // These are kept because
            // analysis.html expects them.

            endpoint: score,

            start: score,

            end: score,

            reactionTime:

                Math.round(
                    result.reactionTime * 100
                ) / 100,

            rank:
                getRank(score),

            power:
                getSuperpower(score),

            comment:
                getComment(score),

            meme:
                getMeme(score)

        };


        // Save result

        localStorage.setItem(
            "superpowerAnalysis",
            JSON.stringify(
                analysisData
            )
        );


        // Open analysis page

        window.location.href =
            "analysis.html";

    }
);


// ======================================================
// RESET
// ======================================================

resetButton.addEventListener(
    "click",
    function() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        points = [];

        drawing = false;

        startPoint = null;

        endPoint = null;

        startTime = 0;

        endTime = 0;

    }
);