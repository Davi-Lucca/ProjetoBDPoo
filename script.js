const dataFile = 'pessoas.json';

// Função para buscar funcionários
function searchEmployees() {
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    if (!query) {
        alert('Por favor, insira um critério de busca.');
        return;
    }
    fetch(dataFile)
        .then(response => response.json())
        .then(data => {
            const results = data.pessoas.filter(person =>
                person.nome.toLowerCase().includes(query) ||
                person.cidade.toLowerCase().includes(query)
            );
            displayResults(results);
        })
        .catch(error => console.error('Erro ao buscar funcionários:', error));
}

// Função para exibir resultados
function displayResults(results) {
    const resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = '';
    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    } else {
        results.forEach(person => {
            const personDiv = document.createElement('div');
            personDiv.textContent = `Nome: ${person.nome}, Idade: ${person.idade}, Cidade: ${person.cidade}, Ocupação: ${person.ocupacao}`;
            resultsDiv.appendChild(personDiv);
        });
    }
}

// Função para adicionar funcionário
function addEmployee() {
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const city = document.getElementById('city').value.trim();
    const occupation = document.getElementById('occupation').value.trim();
    
    if (!name || !age || !city || !occupation) {
        alert('Todos os campos são obrigatórios.');
        return;
    }

    const newEmployee = { nome: name, idade: parseInt(age), cidade: city, ocupacao: occupation };

    fetch(dataFile)
        .then(response => response.json())
        .then(data => {
            data.pessoas.push(newEmployee);
            return fetch(dataFile, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        })
        .then(response => {
            if (response.ok) {
                alert('Funcionário adicionado com sucesso!');
                document.getElementById('add-form').reset();
            } else {
                throw new Error('Erro ao adicionar funcionário');
            }
        })
        .catch(error => console.error('Erro ao adicionar funcionário:', error));
}

// Função para atualizar funcionário
function updateEmployee() {
    const name = document.getElementById('update-name').value.trim();
    const age = document.getElementById('update-age').value.trim();
    const city = document.getElementById('update-city').value.trim();
    const occupation = document.getElementById('update-occupation').value.trim();
    
    if (!name) {
        alert('Nome do funcionário é obrigatório.');
        return;
    }

    const updatedData = {};
    if (age) updatedData.idade = parseInt(age);
    if (city) updatedData.cidade = city;
    if (occupation) updatedData.ocupacao = occupation;

    fetch(dataFile)
        .then(response => response.json())
        .then(data => {
            const index = data.pessoas.findIndex(person => person.nome.toLowerCase() === name.toLowerCase());
            if (index !== -1) {
                data.pessoas[index] = { ...data.pessoas[index], ...updatedData };
                return fetch(dataFile, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            } else {
                throw new Error('Funcionário não encontrado');
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Funcionário atualizado com sucesso!');
                document.getElementById('update-form').reset();
            } else {
                throw new Error('Erro ao atualizar funcionário');
            }
        })
        .catch(error => console.error('Erro ao atualizar funcionário:', error));
}

// Função para excluir funcionário
function deleteEmployee() {
    const name = document.getElementById('delete-name').value.trim();
    
    if (!name) {
        alert('Nome do funcionário é obrigatório.');
        return;
    }

    fetch(dataFile)
        .then(response => response.json())
        .then(data => {
            const index = data.pessoas.findIndex(person => person.nome.toLowerCase() === name.toLowerCase());
            if (index !== -1) {
                data.pessoas.splice(index, 1);
                return fetch(dataFile, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            } else {
                throw new Error('Funcionário não encontrado');
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Funcionário excluído com sucesso!');
                document.getElementById('delete-form').reset();
            } else {
                throw new Error('Erro ao excluir funcionário');
            }
        })
        .catch(error => console.error('Erro ao excluir funcionário:', error));
}
