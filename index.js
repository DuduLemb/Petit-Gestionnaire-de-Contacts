// Charger les contacts depuis le LocalStorage
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Sélecteurs
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("search");
const contactList = document.getElementById("contactList");

// Affichage initial
displayContacts();

// Ajouter un contact
addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (name === "" || phone === "") {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    contacts.push({ name, phone });
    saveAndRender();

    nameInput.value = "";
    phoneInput.value = "";
});

// Recherche
searchInput.addEventListener("input", () => {
    displayContacts(searchInput.value.toLowerCase());
});

// Afficher les contacts
function displayContacts(filter = "") {
    contactList.innerHTML = "";

    contacts
        .filter(c => c.name.toLowerCase().includes(filter))
        .forEach((c, index) => {
            const li = document.createElement("li");
            li.className = "contact-item";
            li.innerHTML = `
                <span>${c.name} - ${c.phone}</span>
                <div>
                    <button onclick="editContact(${index})">Modifier</button>
                    <button onclick="deleteContact(${index})">Supprimer</button>
                </div>
            `;
            contactList.appendChild(li);
        });
}

// Modifier un contact
function editContact(i) {
    const newName = prompt("Nouveau nom :", contacts[i].name);
    const newPhone = prompt("Nouveau numéro :", contacts[i].phone);

    if (!newName || !newPhone) return;

    contacts[i] = { name: newName, phone: newPhone };
    saveAndRender();
}

// Supprimer un contact
function deleteContact(i) {
    if (confirm("Supprimer ce contact ?")) {
        contacts.splice(i, 1);
        saveAndRender();
    }
}

// Sauvegarder + afficher
function saveAndRender() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts();
}
