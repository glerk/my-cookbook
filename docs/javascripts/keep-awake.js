let wakeLock = null;

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("Screen wake lock activated.");

        wakeLock.addEventListener("release", () => {
            console.log("Screen wake lock released.");
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