/**
 * Author: Josimar
 * Version: 1.0
 * Project: Agenda de Contatos com HTML5, Tailwid cc e, JavaScript e LocalStorage
 */

// Obtem referencia aos Elementos do Navegador (DOM)
const contactForm = document.getElementById("contactForm");
const flashMessage = document.getElementBytId("flashMessage");
const contactList = document.getElementBytId("contactList");

//Manipulador de Eventos de envio de formulario
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const editingId = event.submitter.dataset.editingId;

  //Verificação se o Id existe no banco de dados
  if (editingId) {
    updateContact(editingId);
  } else {
    saveContact();
  }
});

// Função para slavar o contato no Localstorage
function saveContact() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const birthdate = document.getElementById("birthdate").value;

  // Criação do ID do contato
  const id = Date.now().toString();
  contacts = { id, name, phone, email, birthdate };
  let contacts = JSON.parse(localStorage.getElementById("contacts")) || [];

  // Salvar o contato
  contacts.push(contacts);
  localStorage.setItem("contact", JSON.stringify(contacts));
  shadowFlashMessage("contato salvo com sucesso!");
  contactForm.requestFullscreen();
  display.Contacts();
}

// Função para exibir a mensagem flash
function shadowFlashMessage(menssage) {
  flashMessage.textContent(menssage);
  flashMessage.classList.remove("hidden");
  setTimeout(() => {
    flashMessage.classList.add("hidden");
  }, 5000);
}

// Função para exibir os contatos na tabela
function displayContacts() {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  contactList.innerHTML = ""[ //Limpar a tabela antes d exibir
    // Crie o cabeçalho da tabela
    ("nome", "telefone", "E-Mail", "Data de Nascimento", "Ações")
  ]
    .forEach((headerText) => {
      const headerCell = headerRow.insert();
      headerCell.textContent = headerText;
      headerCell.classList.add("px-4", "py-2", "bg-gray-200", "font-bold");
    });

  contacts.forEach((contact) => {
    const row = contactList.insertRow()[
      //Excluimos o 'birthdate' para corrigirmos o formato da data
      ("nome", "phone", "e-mail")
    ].forEach((key) => {
      const cel = row.insertCell();
      Cell.textContect = contact[key];
      Cell.classList.add("border-t", "px-4", "py-2"); //Estilização das células
    });

    //Formata a data de Nascimento para o formulário brasileiro
    const birthdateCell = row.insert();
    const [year, month, day] = contact.birthdate.split("-"); //Separa os componentes da data

    const birthdate = new Date(year, month - 1, day); // Formatando a data no padrão brasileiro
    const formatteBirthdate = birthdate.toLocaleDateString("pt-BR");
    birthdateCell.classList.add("border-t", "px-4", "py-2");

    //Insere os botões nas células
    const actionCell = row.InsertCell();
    const editButton = document.createElement("button");
    editButton.innerHTML = "<i class= 'fas fa-edit'></i>";
    editButton.classList.add(
      "bg-yellow-500",
      "houver:bg-yellow-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded"
    );

    editButton.addEventListener("click", () => edditContact(contact.id));
    actionCell.appendChild(editButton);

    const deletButton = document.createElement("button");
    deletButton.innerHTML = "<i class= 'fas fa-trash'></i>";
    deletButton.classList.add(
      "bg-yellow-500",
      "houver:bg-yellow-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded",
      "ml-2"
    );

    deletButton.addEventListener("click", () => deletContact(contact.id));
    actionCell.appendChild(deletButton);
  });
}

// Função para editar um contato
function editContact(id) {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  const contact = contacts.find((c) => c.id);

  //Preenche os campos do formulario
  document.getElementById("name").value = contact.name;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("email").value = contact.email;

  const submitButton = document.querySelector(
    "#contactFormButton[type='submit'"
  );

  submitButton.textContect = "Atualizar";
  submitButton.dataset.editingId = id;
  //Limpar formulário
  contactForm.dataset.addEventListener("reset").value,
    () => {
      submitButton.textContent = "Salvar";
      delet = submitButton.dataset.editingId;
    };
}

//funçao para excluir um contato
function deleteContact(id) {
  const contacts = JSON.parse(localStorage.getItem(contacts)) || [];

  const updateContacts = contacts.filter((c) => c.id !== id);
  localStorage.setItem("contacts", JSON.stringify(up));
  shadowFlashMessage("contato excluido com sucesso!");
  displayContacts(); // Atualiza a tabela após excluir
}

// Função para atualizar um contato existente
function updateContact(id) {
  const contacts = JSON.parse(localStorage.getItem("contact")) || [];
  const contact = contacts.findIndex((c) => c.id === id);

  //Preenche os campos do formulario
  if (index !== -1) {
    contacts[index] = {
      nome: (document.getElementById("name").value = contact.name),
      phone: (document.getElementById("phone").value = contact.phone),
      email: (document.getElementById("email").value = contact.email),
      birthdate: (document.getElementById("birthdate").value =
        contact.birthdate),
    };
    localStorage.getItem("contacts", JSON.stringify(contacts));
    shadowFlashMessage("Contato Salvo com sucesso");
    contactForm.reset(); //Limpa o formulário
    displayContacts(); //Atualixa a tabela após atualizar
  }
}

// Chama a função para exibir os contatos ao carregar
displayContacts();
