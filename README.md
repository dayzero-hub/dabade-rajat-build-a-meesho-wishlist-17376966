# Meesho — wishlist, end to end (Node)

Welcome. This repository is **empty on purpose**. Everything in it is yours to create.

## Where the work is

Open the **Issues** tab. There are four, in order. The starting product list is given in the
first issue — hold it in a plain array in your server file. There is no database and no
product API to call.

One issue at a time:

```bash
git checkout main
git pull
git checkout -b issue-1
# ...make your changes...
git add .
git commit -m "Add the server and the product list"
git push -u origin issue-1
```

Then open a **Pull Request** with `Closes #1` in the description. Raj reviews it.

## Setting up, once

You need Node. Check with `node --version`.

```bash
npm init -y
npm install express
node server.js
```

## Running it

```bash
node server.js
```

Then open `http://localhost:3000` in a browser, and `GET /api/products` returns the product list as JSON.

**The bit that catches everyone:** when the page and the server disagree, the page usually
says nothing at all. A `fetch` that fails does not throw the way you expect — check the
browser's Network tab and the terminal running the server, not just the page.

This is the only project here with a client and a server. That boundary is the thing being
taught, so expect it to take longer than the others.

## Why this repository is nearly empty

Deliberately, and it stays that way.

Some templates in the library hand you a scaffold — the boring setup done, so you can get
straight to the work. This one cannot, because **ticket 1 asks you to add a `.gitignore`
containing `node_modules/` before your first commit, and to run `npm init` and commit
`package.json`.** Those files arriving ready-made would do two of that ticket's steps for you.

Your setup ticket makes the point directly about the second one: open `package.json`, it is
short, it lists what this project depends on, and it *is yours*. That only lands if you made it.

(If you are an engineer auditing the templates: this repo being two files is a decision, not
the thin-template gap. Its ticket 1 creates exactly the files a scaffold would have added.)
