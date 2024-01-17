import WindowEditor from './system-trello/WindowEditor';
import EditController from './system-trello/EditController';
import ManagerController from './imageManager/ManagerController';
import ManagerEdit from './imageManager/ManagerEdit';

function createLinks() {
  // Создаем ссылки на наши задачи
  const main = document.createElement('main');
  main.classList.add('content');
  const listTask = [runTask1, runTask2];

  for (let i = 0; i < 2; i += 1) {
    const link = document.createElement('a');
    link.classList.add('link__task');
    link.textContent = `Задача ${i + 1}`;
    main.append(link);
    link.addEventListener('click', listTask[i]);
  }
  return main;
}

const body = document.querySelector('body');
const mainDiv = createLinks();
body.append(mainDiv);

function onReturnClick() {
  // Обработчик события нажатия кнопки Return
  body.className = '';
  body.innerHTML = '';
  body.append(mainDiv);
}

function createButton(mainBlock) {
  // Создаем кнопку возврата на главную страницу
  const btn = document.createElement('button');
  btn.textContent = 'Return';
  btn.classList.add('btn-return');
  mainBlock.append(btn);
  btn.addEventListener('click', (event) => onReturnClick(event));
}

function runTask1() {
  // Запуск задачи 1
  body.innerHTML = '';
  body.classList.add('task-1');
  const edit = new WindowEditor(body);
  const controller = new EditController(edit);
  controller.init();
  createButton(controller.edit.conteiner);
}

function runTask2() {
  // Запуск задачи 2
  body.innerHTML = '';
  body.classList.add('task-2');
  const manager = new ManagerEdit(body);
  const controller = new ManagerController(manager);
  controller.init();
  createButton(body);
}

// https://mykaleidoscope.ru/uploads/posts/2021-11/1636634307_32-mykaleidoscope-ru-p-top-krasivikh-devushek-devushka-krasivo-fo-34.jpg
// https://img.goodfon.ru/original/2400x1504/5/76/devushka-vzgliad-krasivaia-volosy-ulitsa-boke.jpg
// https://mykaleidoscope.ru/x/uploads/posts/2022-10/1666416087_46-mykaleidoscope-ru-p-vika-kazakova-oboi-51.jpg

// https://i.pinimg.com/originals/e4/d4/36/e4d4365d18c914a5d9ce9d2f955263bf.jpg
// https://i.pinimg.com/originals/a6/10/d4/a610d49d735fd595c46af5c135f08724.jpg
// https://fikiwiki.com/uploads/posts/2022-02/1645015385_4-fikiwiki-com-p-kartinki-krasivikh-devushek-skachat-bespla-5.jpg