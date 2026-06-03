// Key name used to store/retrieve data from localStorage.
const STORAGE_KEY = "contacts";

// Cache DOM nodes once so we do not query the DOM repeatedly.
const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const searchInput = document.getElementById("search");
const contactList = document.getElementById("contact-list");

// In-memory source of truth for all contacts.
let contacts = loadContacts();

// Initial render using saved data so the UI matches localStorage at startup.
applyCurrentView();

// Handle form submit: validate, add to state, persist, and re-render.
form.addEventListener("submit", (event) => {
	event.preventDefault();

	const name = nameInput.value.trim();
	const phone = phoneInput.value.trim();
	const email = emailInput.value.trim();

	// Basic validation: prevents blank entries from being saved.
	if (!name || !phone || !email) {
		alert("Please fill in name, phone, and email.");
		return;
	}

	// Build a new contact record (id allows future edit/delete features).
	const newContact = {
		id: Date.now().toString(),
		name,
		phone,
		email,
	};

	// Spread operator creates a new array instead of mutating the old one.
	// This reduces side effects and makes state updates predictable.
	contacts = [...contacts, newContact];

	// Persist updated list so it survives page refresh.
	saveContacts(contacts);

	// Rebuild the UI using current search filter and sort order.
	applyCurrentView();

	// Reset fields and return focus for faster data entry.
	form.reset();
	nameInput.focus();
});

// Live search: any input change rebuilds the list with a filter.
searchInput.addEventListener("input", () => {
	applyCurrentView();
});

// Load contacts from localStorage; returns [] if empty or invalid.
function loadContacts() {
	const raw = localStorage.getItem(STORAGE_KEY);
	if (!raw) {
		return [];
	}

	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		// If stored JSON is corrupted, ignore it and start fresh.
		return [];
	}
}

// Save the entire contact list as JSON.
function saveContacts(list) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// Builds the list the user should see, based on search and sorting.
function applyCurrentView() {
	const query = normalize(searchInput.value);

	// Create a copy so we can filter/sort without changing the source array.
	let view = [...contacts];

	// Filter only when the user typed a query.
	if (query) {
		view = view.filter((contact) => {
			// Combine fields into one string so search matches any field.
			const haystack = `${contact.name} ${contact.phone} ${contact.email}`;
			return normalize(haystack).includes(query);
		});
	}

	// Sort the view by name; the original contacts array stays unchanged.
	view.sort((a, b) => a.name.localeCompare(b.name));
	renderContacts(view);
}

// Render the list items based on the current view array.
function renderContacts(list) {
	// Clear old items before inserting new ones.
	contactList.innerHTML = "";

	if (list.length === 0) {
		// Keep UI informative when there are no matches.
		const emptyItem = document.createElement("li");
		emptyItem.textContent = "No contacts found.";
		contactList.appendChild(emptyItem);
		return;
	}

	list.forEach((contact) => {
		// Each item is plain text for now; could be cards later.
		const item = document.createElement("li");
		item.textContent = `Name: ${contact.name}, Phone: ${contact.phone}, Email: ${contact.email}`;
		contactList.appendChild(item);
	});
}

// Normalize strings for consistent, case-insensitive comparison.
function normalize(value) {
	return value.trim().toLowerCase();
}
