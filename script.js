const tasks = [];
let taskId = 1;

function displayTask() {
    const tableBody = document.getElementById("taskTable");
    tableBody.innerHTML = "";

    tasks.forEach(task => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td class="tdcolor">${task.cost}</td>
            <td>${task.deadLine}</td>
        `;
        tableBody.appendChild(row);
    });

    color();
}

function color() {
    const cells = document.getElementsByClassName("tdcolor");

    for (let cell of cells) {
        const cost = parseFloat(cell.innerText.replace("R$", "").replace(",", "").trim());

        if (cost >= 1000) {
            cell.style.background = "rgb(231, 170, 0)";
        } else {
            cell.style.background = "";
        }
    }
}

function formatCurrency(value) {
    return `R$ ${parseFloat(value).toFixed(2).replace(".", ",")}`;
}

function openModal() {
    document.getElementById("taskModal").style.display = "block";
}

function closeModal() {
    document.getElementById("taskModal").style.display = "none";
}

function addTask() {
    const name = document.getElementById("taskName").value;
    const cost = document.getElementById("taskCost").value;
    const deadLine = document.getElementById("taskDeadLine").value;

    if (name && cost && deadLine) {
        const formatted = formatCurrency(cost);
        const newTask = { id: taskId++, name: name, cost: formatted, deadLine: deadLine };
        tasks.push(newTask);

        document.getElementById("taskName").value = "";
        document.getElementById("taskCost").value = "";
        document.getElementById("taskDeadLine").value = "";

        closeModal();
        displayTask();
    } else {
        alert("Por favor, preencha todos os campos");
    }
}

window.onclick = function(event) {
    const modal = document.getElementById("taskModal");
    if (event.target === modal) {
        closeModal();
    }
}

displayTask();
