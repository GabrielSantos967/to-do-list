let tasks = [];
let taskId = 1; 

function displayTask() {
    const tableBody = document.getElementById("taskTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = "";

    tasks.forEach(task => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${task.cost}</td>
            <td>${task.deadLine}</td>
            <td>${task.order}</td>
        `;
        tableBody.appendChild(row);
    });
}

function openModal() {
    document.getElementById("taskModal").style.display = "block";
}

function closeModal() {
    document.getElementById("taskModal").style.display = "none";
}

async function addTask() {
    const name = document.getElementById("taskName").value;
    const cost = document.getElementById("taskCost").value;
    const deadLine = document.getElementById("taskDeadLine").value;

    if (name && cost && deadLine) {
        const newTask = {
            id: taskId++, 
            name: name,
            cost: parseFloat(cost).toFixed(2),
            deadLine: deadLine,
            order: tasks.length + 1 
        };

        tasks.push(newTask);

        await saveTask(newTask);
        displayTask();
        closeModal();
        clearInputs();
    } else {
        alert("Por favor, preencha todos os campos");
    }
}

function clearInputs() {
    document.getElementById("taskName").value = "";
    document.getElementById("taskCost").value = "";
    document.getElementById("taskDeadLine").value = "";
}

async function saveTask(task) {
    try {
        const response = await fetch('save_task.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        
        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error('Erro ao salvar a tarefa:', error);
    }
}

window.onclick = function(event) {
    const modal = document.getElementById("taskModal");
    if (event.target === modal) {
        closeModal();
    }
};

displayTask(); 
