# Contact Keeper (Vanilla JS)

A small practice project that lets you add contacts, store them in `localStorage`, and search them in real time. It is intentionally simple so you can focus on core JavaScript concepts.

## Features
- Add contacts with name, phone, and email.
- Persist contacts in `localStorage` so they survive refresh.
- Instant search across name, phone, and email.
- Sorted view by name (A-Z).
- Simple, mobile-friendly UI.

## Project Files
- `index.html` - Structure and layout.
- `styles.css` - Visual styling and responsive layout.
- `app.js` - Logic: state, storage, rendering, search.

## How It Works (Data Flow)
1. **Startup**
   - `loadContacts()` reads from `localStorage`.
   - The `contacts` array is set in memory.
   - `applyCurrentView()` renders the list.

2. **Add Contact**
   - Submit the form.
   - Validate input values.
   - Create a new contact object.
   - Update the array with the spread operator:
     - `contacts = [...contacts, newContact]`
   - Save to `localStorage`.
   - Re-render the list.

3. **Search**
   - When the search input changes, `applyCurrentView()` runs.
   - It filters `contacts` by checking a combined string of name, phone, email.

4. **Sort**
   - The view is copied with spread (`let view = [...contacts]`).
   - `view.sort(...)` sorts only the copy.
   - The original `contacts` stays unchanged.

## Why Use the Spread Operator Here
The spread operator (`...`) helps you avoid mutating the original array.

- **Immutable update** helps prevent bugs where multiple parts of the code depend on the same array reference.
- **Predictable state** makes it easier to reason about updates and re-renders.

Examples from this project:
- Add: `contacts = [...contacts, newContact]`
- Sort: `const view = [...contacts].sort(...)`

## Local Storage Notes
- Data is stored under the key: `contacts`.
- Stored as JSON string.
- `loadContacts()` uses `try/catch` to avoid errors if JSON is corrupted.

## How to Run
1. Open `index.html` in a browser.
2. Add contacts using the form.
3. Refresh the page to confirm data persistence.

## Practice Ideas
- Add delete buttons and remove a contact by `id`.
- Add edit functionality.
- Add sort dropdown (A-Z, Z-A).
- Replace list items with custom cards.
- Validate phone/email format more strictly.

## Interview Talking Points
- DOM selection and event handling.
- Immutable updates using spread operator.
- `localStorage` and JSON serialization.
- Filtering, sorting, and rendering flows.
- Separation of concerns (state, storage, render).
