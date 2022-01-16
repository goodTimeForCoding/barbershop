          /*Добавили фокус, сохранили значение в localStorage, добавили закрытие с клавиатуры*/
          const link = document.querySelector(".login-link");
          const popup = document.querySelector(".modal-login");
          const close = popup.querySelector(".modal-close");
          const form = popup.querySelector("form");
          const login = popup.querySelector("[name=login]");
          const password = popup.querySelector("[name=password]");
          let isStorageSupport = true;
          let storage = "";
  
          /*Обработчик ошибки, в try действие которое может привести к ошибке (например: нет доступа к localStorage)*/
          try {
              storage = localStorage.getItem("login"); /*получаем значение из localStorage и присваиваем переменной storage */
          } catch (err) {
              isStorageSupport = false;
          }
  
          /*Добавляем класс modal-show в section class="modal modal-login" при клике по кнопке войти (link=”.login-link”)*/
          link.addEventListener("click", function (evt) {
              evt.preventDefault();
              popup.classList.add("modal-show");
              /*Помещаем курсор в поле логин если storage с логином пустой, иначе в поле с паролем*/
              if (storage) {
                  login.value = storage;
                  password.focus();
              } else {
                  login.focus();
              }
          });
          /*Закрываем модальное окно по клику на крестик*/
          close.addEventListener("click", function (evt) {
              evt.preventDefault();
              popup.classList.remove("modal-show");
              popup.classList.remove("modal-error");
          });
          /*При пустом поле логина и пароля выводим сообщение в консоль "Нужно ввести логин и пароль", иначе сохраняем введённый логин в localStorage */
          form.addEventListener("submit", function (evt) {
              if (!login.value || !password.value) {
                  evt.preventDefault();
                  // console.log("Нужно ввести логин и пароль");
                  popup.classList.remove("modal-error");//трясущаяся форма при пустом поле логина и пароля
                  popup.offsetWidth = popup.offsetWidth;
                  popup.classList.add("modal-error");
              } else {
                  if (isStorageSupport) {
                      localStorage.setItem("login", login.value); //создаём новую запись в хранилище
                  }
              }
          });
          /* Закрываем модальное окно по нажатии клавиши ESC */
          window.addEventListener("keydown", function (evt) {
              if (evt.keyCode === 27) {
                  if (popup.classList.contains("modal-show")) {
                      evt.preventDefault();
                      popup.classList.remove("modal-show");
                      popup.classList.remove("modal-error");
                  }
              }
          });