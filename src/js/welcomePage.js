import WindowEditor from './system-trello/WindowEditor';
import EditController from './system-trello/EditController';
import ManagerController from './imageManager/ManagerController';
import ManagerEdit from './imageManager/ManagerEdit';
import WebInterfaceController from './web-interface/WebInterfaceController';
import WebInterfaceEdit from './web-interface/WebInterfaceEdit';

function createLinks() {
  // Создаем ссылки на наши задачи
  const main = document.createElement('main');
  main.classList.add('content');
  const listTask = [runTask1, runTask2, runTask3];

  for (let i = 0; i < listTask.length; i += 1) {
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

function runTask3() {
  // Запуск задачи 3
  body.innerHTML = '';
  body.classList.add('task-3');
  const webEdit = new WebInterfaceEdit(body);
  const controller = new WebInterfaceController(webEdit);
  controller.init();
  createButton(body);
}
