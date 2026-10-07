# my-cookbook
My cookbook

Instructions for making new recipe: 

# 🍳 Adding a New Recipe — Quick Checklist

## 1. Decide where the recipe belongs

* [x] Pick an existing category/folder in `docs/`
* [ ] If no category fits, create a new folder
* [ ] If creating a new folder, create an `index.md` inside it
* [ ] Add the new category to the main `docs/index.md` if appropriate
* [ ] Give the category a short description

Example:

```text
docs/
├── Japanese/
├── Random/
└── Italian/
    └── index.md
```

---

## 2. Create the recipe

* [ ] Copy `docs/template.md`
* [ ] Rename it using a simple lowercase filename

Example:

```text
chicken-parmesan.md
```

* [ ] Put it in the appropriate category folder

Example:

```text
docs/Italian/chicken-parmesan.md
```

---

## 3. Fill out the recipe

* [ ] Change the `# Recipe Name` title
* [ ] Add servings and cooking times
* [ ] Write a short description
* [ ] Fill in ingredients
* [ ] Write the cooking instructions
* [ ] Add notes/variations if useful
* [ ] Add meal-prep information if useful
* [ ] Fill out the Quick Reference table

**Don't worry about filling every section.** Delete sections that aren't useful for that recipe.

---

## 4. Update the category index

Open the category's `index.md`.

* [ ] Add the recipe to the recipe list
* [ ] Use `./recipe-name.md` for the link
* [ ] Add a short description if desired

Example:

```markdown
- [Chicken Parmesan](./chicken-parmesan.md)  
  Crispy chicken with marinara and melted cheese.
```

---

## 5. Check the recipe

* [ ] Preview the site with `mkdocs serve`
* [ ] Click the recipe from the category page
* [ ] Check that the recipe appears in the sidebar
* [ ] Check the recipe link works
* [ ] Check headings, ingredients, and instructions
* [ ] Test **Cook Mode**
* [ ] Check the recipe on your phone if there are major changes

---

## 6. Save it to GitHub

When everything looks good:

* [ ] Save all files
* [ ] Use **Commit and Sync** in Obsidian
* [ ] Wait for GitHub Actions to finish
* [ ] Check the live website

🌐 `https://glerk.github.io/my-cookbook/`

---

## ⚡ Super-Short Version

**New recipe:**

1. 📁 Choose/create category
2. 📄 Copy `template.md`
3. ✏️ Rename and fill out recipe
4. 🔗 Add recipe to category `index.md`
5. 👀 Preview with `mkdocs serve`
6. 🍳 Test Cook Mode
7. ☁️ Commit & Sync
8. ✅ Check GitHub Pages

### Remember

* Recipe files go inside `docs/`
* Recipe titles come from the `# H1` inside the Markdown file
* Recipe links should use `./recipe-name.md`
* New categories need an `index.md`
* New categories should also be added to the main `docs/index.md`
* You **do not normally need to edit `mkdocs.yaml`** when adding recipes or categories
