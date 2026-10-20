# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Starter project for a Claude Code course: a small React 19 + Vite expense tracker ("Finance Tracker"). Per the README, it intentionally contains a bug, poor UI, and messy code that are meant to be fixed during the course. Don't assume existing patterns are good practice.

## Commands

- `npm run dev` — Vite dev server at http://localhost:5173
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint (flat config, `eslint.config.js`)
- `npm run preview` — serve the production build

There is no test runner configured.

## Architecture

Plain JavaScript (JSX, no TypeScript), mounted from `src/main.jsx`. All state is local `useState` (no router, store, backend, or persistence — data resets on reload). Styling is in `src/App.css` and `src/index.css` (global class names, no CSS modules).

`src/App.jsx` is the root component. It owns the shared data and composes three child components, all in `src/`:
- `App` — holds the `transactions` state (seeded inline), the `categories` list, and `addTransaction`. Renders the heading plus the three components below.
- `Summary.jsx` — takes `transactions`; computes total income, total expenses, and balance itself and renders the summary cards.
- `TransactionForm.jsx` — takes `categories` and `onAdd`; owns the form field state, builds the new transaction (amount converted with `Number`) and calls `onAdd`.
- `TransactionList.jsx` — takes `transactions` and `categories`; owns the type/category filter state and renders the filters and the table.

Data flows down via props; the only upward flow is `onAdd` from the form to `App`. Keep shared state in `App` and view-local state (form fields, filters) in the component that uses it.

Known quirks in the current code:
- Seed transactions still store `amount` as a **string** (new ones from the form are numbers). `Summary` coerces with `Number(t.amount)`, so keep that coercion when summing; the list displays `t.amount` as-is.
- The `categories` list is defined inside `App` and passed as a prop to both the form and the list.

## Lint notes

`no-unused-vars` is an error, but names starting with an uppercase letter or `_` are ignored.
