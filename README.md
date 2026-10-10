# Jason & Pearl's Cookbook

Personal cookbook built with Markdown, Obsidian, MkDocs, and GitHub Pages.

🌐 **Live website:** https://glerk.github.io/my-cookbook/

---

# 🍳 Adding a New Recipe — Quick Checklist

## 1. Choose a category

- [ ] Pick an existing category inside `docs/`
- [ ] If no category fits, create a new folder
- [ ] If creating a new folder, add an `index.md` inside it
- [ ] Add the new category to the main `docs/index.md` if appropriate
- [ ] Give the category a short description

Example folder structure:

```text
docs/
├── Japanese/
│   ├── index.md
│   └── gyudon.md
├── Random/
│   ├── index.md
│   └── taco-rice.md
└── Italian/
    └── index.md
```

---

## 2. Create the recipe

- [ ] Copy `docs/template.md`
- [ ] Rename the copy using a simple, lowercase filename
- [ ] Put it inside the appropriate category folder

Example:

```text
docs/Italian/chicken-parmesan.md
```

Use hyphens instead of spaces in filenames.

---

## 3. Fill out the recipe

- [ ] Change the `# Recipe Name` heading
- [ ] Enter the original number of servings
- [ ] Add prep, cook, and total times
- [ ] Write a short description
- [ ] Add ingredients and instructions
- [ ] Add notes, variations, or meal-prep information if useful
- [ ] Complete the Quick Reference table

**Don't worry about filling every section.** Delete sections that aren't useful for that recipe.

---

## 4. Optional: Add the serving calculator

The serving calculator lets you change the number of servings and automatically adjust ingredient quantities.

### A. Add the calculator

Place this HTML near the top of your recipe, below the description:

```html
<div class="servings-calculator" data-original-servings="4"></div>
```

Change `4` to the number of servings in your original recipe.

For example, if the recipe normally serves six people:

```html
<div class="servings-calculator" data-original-servings="6"></div>
```

### B. Add adjustable ingredient quantities

Instead of writing an ingredient quantity as ordinary text, wrap the quantity in a special HTML span.

**Without the calculator:**

```markdown
- 2 tbsp olive oil
- 1 tsp garlic powder
- 1 lb chicken breast
```

**With the calculator:**

```html
- <span class="ingredient-amount" data-amount="2" data-unit="tbsp">2 tbsp</span> olive oil
- <span class="ingredient-amount" data-amount="1" data-unit="tsp">1 tsp</span> garlic powder
- <span class="ingredient-amount" data-amount="1" data-unit="lb">1 lb</span> chicken breast
```

The important parts are:

- `data-amount="2"` is the original numeric quantity.
- `data-unit="tbsp"` identifies the measurement unit.
- The text between the opening and closing tags is what readers see before the calculator updates it.
- The ingredient name goes after the closing `</span>`.

**Always enter the original quantity in `data-amount`.** The calculator uses that original value whenever you change servings.

### C. Use fractions

You can use decimal numbers in `data-amount` even when the displayed recipe uses fractions.

For example:

```html
<span class="ingredient-amount" data-amount="1.5" data-unit="tsp">1½ tsp</span>
```

The calculator will format the adjusted quantity into practical cooking measurements.

### D. Use ingredient ranges

For an ingredient with a range, such as 1–2 cups of spinach:

```html
<span class="ingredient-amount" data-min="1" data-max="2" data-unit="cup" data-unit-one="cup" data-unit-many="cups">1–2 cups</span> spinach
```

The calculator scales both ends of the range.

### E. Which ingredients should use the calculator?

You can use it for most measured ingredients, including:

- Cups, tablespoons, and teaspoons
- Meat and fish weights
- Pasta, rice, and other dry ingredients
- Countable ingredients such as lemons and shallots

For ingredients that don't need scaling, such as salt to taste or optional garnishes, ordinary Markdown is fine.

**Tip:** You don't have to add the calculator to every recipe. Only use it when adjustable servings would be helpful.

---

## 5. Update the category index

Open the appropriate category's `index.md`.

- [ ] Add the recipe to the recipe list
- [ ] Link to the recipe using `./recipe-name.md`
- [ ] Add a short description if desired

Example:

```markdown
- [Chicken Parmesan](./chicken-parmesan.md)
  Crispy chicken with marinara and melted cheese.
```

If you create a new category, also add a link to it in the main `docs/index.md` so readers can browse it.

---

## 6. Test the recipe locally

Before publishing:

- [ ] Save all files
- [ ] Run `mkdocs serve` from the project directory
- [ ] Open the local website in your browser
- [ ] Navigate to the category and open the recipe
- [ ] Check that the recipe appears in the sidebar
- [ ] Check that the recipe link works
- [ ] Check headings, ingredients, and instructions
- [ ] Test Cook Mode
- [ ] If using the serving calculator, change the servings and check the quantities
- [ ] Check the page on your phone if you made significant changes

**Don't push to GitHub until the local website looks right.**

---

## 7. Publish to GitHub

Once everything works locally:

- [ ] Save all files
- [ ] Use **Commit and Sync** in Obsidian
- [ ] Wait for the GitHub Actions deployment to finish
- [ ] Open the live website and confirm the changes

🌐 https://glerk.github.io/my-cookbook/

---

# ⚡ Super-Short Checklist

For a normal recipe:

1. Choose a category.
2. Copy `docs/template.md`.
3. Rename and fill out the recipe.
4. Add it to the category's `index.md`.
5. Test locally with `mkdocs serve`.
6. Test Cook Mode.
7. Commit and Sync.
8. Check the live website.

For a recipe with adjustable servings, also:

- Add the `.servings-calculator` HTML element.
- Wrap each adjustable ingredient quantity in an `.ingredient-amount` span.
- Test several serving sizes locally.

---

## Remember

- Recipe files belong inside `docs/`.
- Recipe titles come from the `# H1` heading inside the Markdown file.
- Recipe links should use `./recipe-name.md`.
- New categories need an `index.md`.
- New categories should also be added to the main `docs/index.md`.
- You normally do **not** need to edit `mkdocs.yaml` when adding recipes or categories.
- The serving calculator is optional.
- Always test locally before publishing.