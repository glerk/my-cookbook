
function formatQuantity(value) {
    // Display common cooking fractions instead of long decimals.
    const whole = Math.floor(value + 0.000001);
    const fraction = value - whole;

    const fractions = [
        [1 / 8, "⅛"],
        [1 / 4, "¼"],
        [1 / 3, "⅓"],
        [3 / 8, "⅜"],
        [1 / 2, "½"],
        [5 / 8, "⅝"],
        [2 / 3, "⅔"],
        [3 / 4, "¾"],
        [7 / 8, "⅞"]
    ];

    if (value < 0.001) return "0";

    let closest = null;
    let difference = Infinity;

    for (const [number, symbol] of fractions) {
        const diff = Math.abs(fraction - number);
        if (diff < difference) {
            difference = diff;
            closest = symbol;
        }
    }

    if (difference < 0.025) {
        return whole ? `${whole}${closest}` : closest;
    }

    if (fraction < 0.025) return String(whole);

    return Number(value.toFixed(2)).toString();
}

function formatIngredientAmount(element, servings, originalServings) {
    const scale = servings / originalServings;

    const unitOne = element.dataset.unitOne || element.dataset.unit || "";
    const unitMany = element.dataset.unitMany || element.dataset.unit || "";

    let quantity;

    if (element.dataset.min !== undefined &&
        element.dataset.max !== undefined) {
        const min = Number(element.dataset.min) * scale;
        const max = Number(element.dataset.max) * scale;

        quantity = `${formatQuantity(min)}–${formatQuantity(max)}`;
    } else {
        quantity = formatQuantity(Number(element.dataset.amount) * scale);
    }

    // Choose singular or plural for simple countable ingredients.
    const numericAmount = element.dataset.min !== undefined
        ? Number(element.dataset.min) * scale
        : Number(element.dataset.amount) * scale;

    const unit = Math.abs(numericAmount - 1) < 0.001
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
