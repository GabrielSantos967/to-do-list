<?php
// Configurações do banco de dados
$servername = "grey-elk-642623.hostingersite.com";
$username = "u182359865_gabriel"; 
$password = "Amendoim2!"; 
$dbname = "u182359865_todolist"; 

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Ler os dados JSON da requisição
$data = json_decode(file_get_contents('php://input'), true);

// Acessar os dados
$nome_da_tarefa = $data['name'];
$custo = $data['cost'];
$data = $data['deadLine'];
$ordem = $data['order']; // Pega a ordem da tarefa

// Preparar a consulta SQL
$sql = "INSERT INTO tarefas (Nome_da_tarefa, Custo, Data, Ordem) VALUES (?, ?, ?, ?)";

// Preparar a declaração
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $nome_da_tarefa, $custo, $data, $ordem);

// Executar a declaração
if ($stmt->execute()) {
    echo json_encode(["message" => "Nova tarefa inserida com sucesso!"]);
} else {
    echo json_encode(["message" => "Erro: " . $stmt->error]);
}

// Fechar a conexão
$stmt->close();
$conn->close();
?>
