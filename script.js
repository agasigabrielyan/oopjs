// для начала получим все элементы
const form = document.querySelector("[data-form]");
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input]");

// для того, чтобы имплементировать хранение нашего списка в LocalStorage давайте создадим еще один класс Storage
class Storage {
    // метод добавляет массив данных в LocalStorage
    static addToStorage(todoArray) {
        let storage = localStorage.setItem("todo", JSON.stringify(todoArray));
        return storage;
    }

    // метод получает данные из LocalStorage
    static getFromStorage() {
        let storage = localStorage.getItem('todo') === null ? [] : JSON.parse( localStorage.getItem('todo') );
        return storage;
    }
}
// теперь проверим есть ли в LocalStorage данные, при этом мы получим ошибку о том, что не можем забрать данные
// пока не инициализируем, поэтому помещаме наш Storage класс в самый вверх
let  todoArray = Storage.getFromStorage();

// обработка формы, чтобы исключить выполнение действия по умолчанию
form.addEventListener('submit', (e) => {
    e.preventDefault();
    debugger;
    // каждый раз при нажатии на submit мы генерируем новый объект Todo
    let id = parseInt(Math.random() * 100000000);
    const todo = new Todo( id, input.value );
    todoArray = [...todoArray, todo];
    UI.displayData();
    UI.clearInput();
    // remove element from list
    UI.removeTodo();
    // теперь добавим массив в localStorage для этого вызовем статический метод Storage.addToStorage
    Storage.addToStorage(todoArray);
});

// make object instance
class Todo {
    constructor (id, todo) {
        this.id = id;
        this.todo = todo;
    }
}

// после того как мы получили все наши данные создадим еще один класс с именем ui, который будет отображать наши данные
// в нем создадим статический метод displayData
class UI {
    // метод отображает элементы списка
    static displayData() {
        // внутри этого метода мы должны получить переменную, которая будет содержать то что мы хотим показать массив списка
        // этот метод сразу будет выводить верстку нашего todo листа
        // просто копируем html код, созданной нами верстки
        // затем мы должны display метод вызывать в событии addEventListener
        let displayData = todoArray.map((item) => {
            return `
                <div class="todo">
                    <p>${item.todo}</p><span class="remove">Del</span>
                </div>
            `;
        });
        lists.innerHTML = (displayData).join(" ");
    }

    // Метод очищает поле input, вызываем его после добавления элемента списка DOM
    static clearInput() {
        input.value = "";
    }

    static removeTodo() {
        lists.addEventListener("click", (e) => {
            if(e.target.classList.contains("remove")) {
                debugger;
                e.target.parentElement.remove();
                let btnId = e.target.dataset.id;
                // нам так же нужно вызвать метод, который удалит из массив исчезнувший элемент списка
                UI.removeArrayTodo(btnId);
            }
        });
    }
    // Метод создает копию нашего массива без элемента с индексом +id
    // используется метод filter для массива, который позволяет фильтровать данные
    static removeArrayTodo( id ) {
        todoArray = todoArray.filter( (item) => item.id !== +id );
    }
}


window.addEventListener("DOMContentLoaded", () =>  {
    UI.displayData();
    UI.removeTodo();
});



