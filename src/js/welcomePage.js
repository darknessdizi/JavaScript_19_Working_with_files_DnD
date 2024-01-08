import WindowEditor from './system-trello/WindowEditor';
import EditController from './system-trello/EditController';

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

export function createButton(mainBlock) {
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
}

function runTask2() {
  // Запуск задачи 2
  body.innerHTML = '';
  createButton(body);
}
