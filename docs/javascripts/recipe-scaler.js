function formatQuantity(value, unit = "") {
    if (!Number.isFinite(value) || value <= 0) return "0";

    const normalizedUnit = unit.toLowerCase();

    // Keep weights reasonably precise for expensive ingredients.
    // Ounces are rounded to the nearest whole ounce.
    if (["oz", "ounce", "ounces"].includes(normalizedUnit)) {
        return String(Math.round(value));
    }

    // Pounds are rounded to practical quarter-pound increments.
    if (["lb", "lbs", "pound", "pounds"].includes(normalizedUnit)) {
        value = Math.round(value * 4) / 4;
    } else {
        // For everyday cooking measurements, use practical fractions.
        const fractions = [
            { value: 0, text: "" },
            { value: 1 / 8, text: "⅛" },
            { value: 1 / 4, text: "¼" },
            { value: 1 / 3, text: "⅓" },
            { value: 3 / 8, text: "⅜" },
            { value: 1 / 2, text: "½" },
            { value: 5 / 8, text: "⅝" },
            { value: 2 / 3, text: "⅔" },
            { value: 3 / 4, text: "¾" },
            { value: 7 / 8, text: "⅞" },
            { value: 1, text: "" }
        ];

        // Round to the nearest practical fraction.
        const whole = Math.floor(value);
        const fraction = value - whole;

        let closest = fractions[0];
        let difference = Math.abs(fraction);

        for (const option of fractions) {
            const diff = Math.abs(fraction - option.value);

            if (diff < difference) {
                difference = diff;
                closest = option;
            }
        }

        // Avoid awkward decimals by rounding to a useful fraction.
        if (closest.value === 1) {
            value = whole + 1;
        } else {
            value = whole + closest.value;
        }

        // Display whole numbers and fractions in readable form.
        const finalWhole = Math.floor(value);
        const finalFraction = value - finalWhole;

        const displayFraction = fractions.find(
            option => Math.abs(option.value - finalFraction) < 0.001
        );

        if (finalFraction < 0.001) {
            return String(finalWhole);
        }

        if (displayFraction) {
            return finalWhole > 0
                ? `${finalWhole} ${displayFraction.text}`
                : displayFraction.text;
        }

        return String(Math.round(value));
    }

    // Format pounds as whole numbers or quarter-pound fractions.
    const whole = Math.floor(value);
    const fraction = value - whole;

    const poundFractions = [
        { value: 0, text: "" },
        { value: 0.25, text: "¼" },
        { value: 0.5, text: "½" },
        { value: 0.75, text: "¾" },
        { value: 1, text: "" }
    ];

    const closest = poundFractions.reduce((best, option) =>
        Math.abs(fraction - option.value) <
        Math.abs(fraction - best.value) ? option : best
    );

    if (closest.value === 1) return String(whole + 1);
    if (closest.value === 0) return String(whole);
    if (whole === 0) return closest.text;

    return `${whole} ${closest.text}`;
}


function formatIngredientAmount(element, servings, originalServings) {
    const scale = servings / originalServings;

    const unitOne = element.dataset.unitOne || element.dataset.unit || "";
    const unitMany = element.dataset.unitMany || element.dataset.unit || "";

    let minAmount;
    let maxAmount;
    let quantity;

    if (
        element.dataset.min !== undefined &&
        element.dataset.max !== undefined
    ) {
        minAmount = Number(element.dataset.min) * scale;
        maxAmount = Number(element.dataset.max) * scale;

        quantity =
            `${formatQuantity(minAmount, element.dataset.unit)}–` +
            `${formatQuantity(maxAmount, element.dataset.unit)}`;
    } else {
        minAmount = Number(element.dataset.amount) * scale;
        quantity = formatQuantity(minAmount, element.dataset.unit);
    }

    // Choose singular/plural based on the displayed quantity.
    const displayedNumber = Number(quantity.replace(/[^\d.]/g, "")) || 0;
    const unit = Math.abs(displayedNumber - 1) < 0.001
        ? unitOne
        : unitMany;

    element.textContent = `${quantity}${unit ? " " + unit : ""}`;
}


function createServingCalculators() {
    document.querySelectorAll(".servings-calculator").forEach(calculator => {
        if (calculator.dataset.initialized === "true") return;

        const originalServings = Number(
            calculator.dataset.originalServings
        );

        if (!originalServings || originalServings < 1) return;

        calculator.dataset.initialized = "true";

        const label = document.createElement("label");
        label.className = "servings-calculator-label";
        label.textContent = "Servings";

        const input = document.createElement("input");
        input.type = "number";
        input.min = "1";
        input.max = "24";
        input.step = "1";
        input.value = originalServings;
        input.className = "servings-calculator-input";
        input.setAttribute("aria-label", "Number of servings");

        label.appendChild(input);

        const note = document.createElement("span");
        note.className = "servings-calculator-note";
        note.textContent = `Original recipe: ${originalServings} servings`;

        calculator.appendChild(label);
        calculator.appendChild(note);

        function updateIngredients() {
            let servings = Number(input.value);

            if (!Number.isFinite(servings)) return;

            servings = Math.max(1, Math.min(24, Math.round(servings)));
            input.value = servings;

            document.querySelectorAll(".ingredient-amount").forEach(element => {
                formatIngredientAmount(element, servings, originalServings);
            });
        }

        input.addEventListener("change", updateIngredients);
        input.addEventListener("input", updateIngredients);

        updateIngredients();
    });
}

document.addEventListener("DOMContentLoaded", createServingCalculators);

// Support page navigation in Material for MkDocs.
if (typeof document$ !== "undefined") {
    document$.subscribe(createServingCalculators);
}