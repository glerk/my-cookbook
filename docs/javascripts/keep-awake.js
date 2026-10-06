let wakeLock = null;

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request("screen");

        wakeLock.addEventListener("release", () => {
            wakeLock = null;
            updateWakeLockButton(false);
        });

        return true;
    } catch (err) {
        console.error(`Wake Lock failed: ${err.name}, ${err.message}`);
        return false;
    }
}

async function toggleWakeLock() {
    if (wakeLock) {
        await wakeLock.release();
        wakeLock = null;
        updateWakeLockButton(false);
    } else {
        const success = await requestWakeLock();

        if (success) {
            updateWakeLockButton(true);
        } else {
            alert("Sorry! Your browser does not allow the screen to be kept awake.");
        }
    }
}

function updateWakeLockButton(active) {
    const button = document.getElementById("wake-lock-button");

    if (!button) return;

    if (active) {
        button.textContent = "🔆 Screen Will Stay On ✓";
        button.classList.add("wake-lock-active");
    } else {
        button.textContent = "🔆 Keep Screen On";
        button.classList.remove("wake-lock-active");
    }
}

function createWakeLockButton() {
    // Don't create duplicate buttons
    if (document.getElementById("wake-lock-button")) return;

    const button = document.createElement("button");

    button.id = "wake-lock-button";
    button.textContent = "🔆 Keep Screen On";
    button.type = "button";

    button.addEventListener("click", toggleWakeLock);

    // Put the button near the top of the recipe content
    const article = document.querySelector("article.md-content__inner");

    if (article) {
        article.insertBefore(button, article.firstChild);
    } else {
        document.body.insertBefore(button, document.body.firstChild);
    }
}

document.addEventListener("DOMContentLoaded", createWakeLockButton);

document$.subscribe(function () {
    createWakeLockButton();
});