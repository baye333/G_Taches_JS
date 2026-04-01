
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];  // Récupérer les tâches enregistrées dans le localStorage, sinon les initialiser à un tableau vide

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAll");


// Modal
const editModal = document.getElementById("editModal");
const closeModal = document.getElementById("closeModal");
const editForm = document.getElementById("editForm");
const editInput = document.getElementById("editInput");

let currentEditIndex = null; // Index de la tâche en cours d'édition

// Fonction pour sauvegarder les tâches dans le localStorage à chaque modification
function saveTasks() {
     localStorage.setItem("tasks", JSON.stringify(tasks)); // Sauvegarder les tâches dans le localStorage
}

// Fonction pour afficher les tâches dans la liste avec leur état de complétion et les boutons de modification et suppression.
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        // Case à cocher
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTask(index));

        // Texte de la tâche
        const span = document.createElement("span");
        span.textContent = task.text;

        // Bouton modifier
       const editBtn = document.createElement("button");
        editBtn.textContent = "Modifier";
        editBtn.addEventListener("click", () => openEditModal(index));

         // Bouton supprimer
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Supprimer";
        deleteBtn.addEventListener("click", () => deleteTask(index));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Fonction pour ajouter une tâche à la liste
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = { text: taskInput.value, completed: false };
    console.log(newTask);
    
    tasks.push(newTask);
     taskInput.value = ""; // Effacer le champ de saisie
    renderTasks();
    saveTasks();
});

// Ouvrir modal pour modifier une tâche (prompt)
function openEditModal(index) {
    currentEditIndex = index;
    editInput.value = tasks[index].text;
    editModal.style.display = "block";
}

// Fermer modal
closeModal.addEventListener("click", () => {
    editModal.style.display = "none";
});

document.body.addEventListener("click", (e) => {
    if (e.target == editModal) {
        editModal.style.display = "none";
    }
});

// Soumettre modification dans le modal (prompt)
editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    tasks[currentEditIndex].text = editInput.value.trim();
    saveTasks();
    renderTasks();
    editModal.style.display = "none";
});

// Modifier une tâche dans la liste (prompt)
function editTask(index) {
    const newText = prompt("Modifier la tâche :", tasks[index].text);
    //console.log(newText);
    if (newText !== null && newText.trim() !== "") { // Si la valeur est différente de null et non vide
        tasks[index].text = newText.trim();
        renderTasks();
        saveTasks();
    }
}

// Marquer comme terminé une tâche dans la liste
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed; // Inversion de la valeur booléenne de complétion
    renderTasks();
    saveTasks();
}

// Supprimer une tâche dans la liste (prompt)
function deleteTask(index) {
    tasks.splice(index, 1); // Supprimer la tâche à l'index spécifié 
    renderTasks();
    saveTasks();
}

// Tout effacer les tâches (prompt)
clearAllBtn.addEventListener("click", () => {
    if (confirm("Voulez-vous vraiment supprimer toutes les tâches ?")) {
        tasks = [];
        localStorage.removeItem("tasks");
        renderTasks();
    }
});

function showMessage() {
    this.innerHTML = "Vous pouvez cliquer sur le bouton pour effacer toutes les tâches.";
}

renderTasks(); // Afficher les tâches dans la liste au chargement de la page