//FORMS
// для получения форм в обичном формате

const forms = document.querySelectorAll("form");

const message = {
  loading: "Загрузка",
  success: "Успешно",
  failure: "Ошибка",
};

forms.forEach((item) => {
  postData(item);
});

function postData(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const statusMessage = document.createElement("div");
    statusMessage.classList.add("status");
    statusMessage.textContent = message.loading;
    form.append(statusMessage);

    const request = new XMLHttpRequest();
    request.open("POST", "server.php");

    // request.setRequestHeader('Content-type', 'multipart/form-data');
    const formData = new FormData(form);

    request.send(formData);

    request.addEventListener("load", () => {
      if (request.status === 200) {
        console.log(request.response);
        statusMessage.textContent = message.success;
        form.reset();
        setTimeout(() => {
          statusMessage.remove();
        }, 2000);
      } else {
        statusMessage.textContent = message.failure;
      }
    });
  });
}
