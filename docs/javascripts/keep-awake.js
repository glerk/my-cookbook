let wakeLock = null;

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request("screen");

        wakeLock.addEventListener("release", () => {
            wakeLock = null;
            updateCookMode(false);
        });

        return true;
    } catch (err) {
        console.error(`Wake Lock failed: ${err.name}, ${err.message}`);
        return false;
    }
}

async function toggleCookMode(enabled) {
    if (enabled) {
        const success = await requestWakeLock();

        if (!success) {
            const checkbox = document.getElementById("cook-mode-checkbox");

            if (checkbox) {
                checkbox.checked = false;
            }

            alert("Sorry! Your browser does not allow the screen to be kept awake.");
            return;
        }

        updateCookMode(true);
    } else {
        if (wakeLock) {
            await wakeLock.release();
            wakeLock = null;
        }

        updateCookMode(false);
    }
}

function updateCookMode(active) {
    const checkbox = document.getElementById("cook-mode-checkbox");

    if (!checkbox) return;

    checkbox.checked = active;
}

function createCookMode() {
    // Don't create duplicates
    if (document.getElementById("cook-mode")) return;

    const cookMode = document.createElement("div");

    cookMode.id = "cook-mode";
    cookMode.className = "cook-mode";

    cookMode.innerHTML = `
        <span class="cook-mode-label">Cook Mode</span>

        <label class="cook-mode-switch">
            <input type="checkbox" id="cook-mode-checkbox">
            <span class="cook-mode-slider"></span>
        </label>

        <span class="cook-mode-description">
            Prevent your screen from going dark
        </span>
    `;

    const article = document.querySelector("article.md-content__inner");

    if (article) {
        article.insertBefore(cookMode, article.firstChild);
    } else {
        document.body.insertBefore(cookMode, document.body.firstChild);
    }

    const checkbox = document.getElementById("cook-mode-checkbox");

    checkbox.addEventListener("change", () => {
        toggleCookMode(checkbox.checked);
    });
}

document.addEventListener("DOMContentLoaded", createCookMode);

document$.subscribe(function () {
    createCookMode();
});