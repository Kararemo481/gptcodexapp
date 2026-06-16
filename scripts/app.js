const loadedNode = document.querySelector('[data-runtime="loaded"]');
const viewportNode = document.querySelector('[data-runtime="viewport"]');
const activityListNode = document.querySelector('#activity-list');
const taskListNode = document.querySelector('#task-list');
const todoFormNode = document.querySelector('#todo-form');
const todoInputNode = document.querySelector('#todo-input');
const todoListNode = document.querySelector('#todo-list');
const todoEmptyNode = document.querySelector('#todo-empty');
const todoSummaryNode = document.querySelector('[data-todo-summary]');
const clearCompletedButton = document.querySelector('#clear-completed');
const filterButtons = Array.from(document.querySelectorAll('[data-todo-filter]'));

const TODO_STORAGE_KEY = 'gptcodexapp.todoItems.v1';

const activityItems = [
  {
    id: 'PR #12',
    title: 'TODOメモツールを追加',
    meta: '公開ページに、ブラウザ保存のTODOメモ、完了チェック、削除、件数表示を追加。',
    href: 'https://github.com/Kararemo481/gptcodexapp/pull/12'
  },
  {
    id: 'PR #10',
    title: '日本語ダッシュボードに変更',
    meta: 'ページ本文、表示データ、READMEを日本語化。',
    href: 'https://github.com/Kararemo481/gptcodexapp/pull/10'
  },
  {
    id: 'PR #8',
    title: '作業ログダッシュボードを作成',
    meta: '公開ページを、作業履歴・次タスク・主要リンクを見られる画面に変更。',
    href: 'https://github.com/Kararemo481/gptcodexapp/pull/8'
  },
  {
    id: 'PR #6',
    title: 'GitHub Pages 公開準備',
    meta: 'Pages公開に必要な設定メモと検証項目を追加。',
    href: 'https://github.com/Kararemo481/gptcodexapp/pull/6'
  },
  {
    id: 'PR #4',
    title: '最初の静的アプリを追加',
    meta: 'HTML、CSS、JavaScriptで最初の公開画面を作成。',
    href: 'https://github.com/Kararemo481/gptcodexapp/pull/4'
  },
  {
    id: 'PR #2',
    title: 'リポジトリ初期設定',
    meta: 'README、gitignore、検証ワークフローを追加。',
    href: 'https://github.com/Kararemo481/gptcodexapp/pull/2'
  }
];

const nextTasks = [
  'TODOを共有できる形にしたいなら、次はデータ置き場を決める。',
  'issueテンプレートとPRテンプレートを追加して、次回以降の作業を楽にする。',
  '作業履歴を手書きではなく自動生成できる形に育てる。'
];

const defaultTodoItems = [
  {
    id: 'starter-1',
    text: '次にやる作業を1つ書く',
    done: false,
    createdAt: '2026-06-16T00:00:00.000Z'
  },
  {
    id: 'starter-2',
    text: '終わったらチェックを入れる',
    done: false,
    createdAt: '2026-06-16T00:00:00.000Z'
  }
];

let todoFilter = 'all';
let storageAvailable = true;
let todoItems = loadTodoItems();

function formatViewport() {
  return `${window.innerWidth} x ${window.innerHeight}`;
}

function updateRuntimeDetails() {
  if (loadedNode) {
    loadedNode.textContent = new Date().toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  if (viewportNode) {
    viewportNode.textContent = formatViewport();
  }
}

function setMetric(name, value, detail) {
  const valueNode = document.querySelector(`[data-metric-value="${name}"]`);
  const detailNode = document.querySelector(`[data-metric-detail="${name}"]`);

  if (valueNode) {
    valueNode.textContent = value;
  }

  if (detailNode) {
    detailNode.textContent = detail;
  }
}

function updateMetrics() {
  const doneCount = todoItems.filter((item) => item.done).length;

  setMetric('merged-prs', String(activityItems.length), '#2, #4, #6, #8, #10, #12');
  setMetric('closed-issues', '6', '#1, #3, #5, #7, #9, #11');
  setMetric('memo-mode', storageAvailable ? '保存中' : '一時保存', storageAvailable ? 'ブラウザ内' : 'この画面だけ');
  setMetric('todo-count', String(todoItems.length), `${doneCount}件完了`);

  if (todoSummaryNode) {
    todoSummaryNode.textContent = `${todoItems.length}件`;
  }
}

function makeTodoId() {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }

  return `todo-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeTodoItem(item, index) {
  if (!item || typeof item.text !== 'string') {
    return null;
  }

  const text = item.text.trim().slice(0, 80);

  if (!text) {
    return null;
  }

  return {
    id: typeof item.id === 'string' ? item.id : `todo-${index}`,
    text,
    done: Boolean(item.done),
    createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString()
  };
}

function loadTodoItems() {
  try {
    const savedItems = window.localStorage.getItem(TODO_STORAGE_KEY);

    if (!savedItems) {
      return [...defaultTodoItems];
    }

    const parsedItems = JSON.parse(savedItems);

    if (!Array.isArray(parsedItems)) {
      return [...defaultTodoItems];
    }

    const normalizedItems = parsedItems
      .map(normalizeTodoItem)
      .filter(Boolean);

    return normalizedItems.length ? normalizedItems : [...defaultTodoItems];
  } catch (error) {
    storageAvailable = false;
    return [...defaultTodoItems];
  }
}

function saveTodoItems() {
  try {
    window.localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todoItems));
    storageAvailable = true;
  } catch (error) {
    storageAvailable = false;
  }
}

function createTodoItem(text) {
  return {
    id: makeTodoId(),
    text,
    done: false,
    createdAt: new Date().toISOString()
  };
}

function formatTodoDate(createdAt) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return '追加日不明';
  }

  return date.toLocaleDateString('ja-JP', {
    month: 'numeric',
    day: 'numeric'
  });
}

function getVisibleTodoItems() {
  if (todoFilter === 'open') {
    return todoItems.filter((item) => !item.done);
  }

  if (todoFilter === 'done') {
    return todoItems.filter((item) => item.done);
  }

  return todoItems;
}

function renderActivity() {
  if (!activityListNode) {
    return;
  }

  activityListNode.replaceChildren(
    ...activityItems.map((item) => {
      const row = document.createElement('li');
      row.className = 'activity-item';

      const id = document.createElement('span');
      id.className = 'activity-item__id';
      id.textContent = item.id;

      const body = document.createElement('div');
      const title = document.createElement('h3');
      title.className = 'activity-item__title';
      title.textContent = item.title;

      const meta = document.createElement('p');
      meta.className = 'activity-item__meta';
      meta.textContent = item.meta;

      const link = document.createElement('a');
      link.className = 'activity-item__link';
      link.href = item.href;
      link.textContent = '開く';

      body.append(title, meta);
      row.append(id, body, link);
      return row;
    })
  );
}

function renderTasks() {
  if (!taskListNode) {
    return;
  }

  taskListNode.replaceChildren(
    ...nextTasks.map((task, index) => {
      const row = document.createElement('li');
      const marker = document.createElement('span');
      const label = document.createElement('span');

      marker.className = index === 0 ? 'task-dot task-dot--active' : 'task-dot';
      label.textContent = task;

      row.append(marker, label);
      return row;
    })
  );
}

function renderFilterButtons() {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.todoFilter === todoFilter;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function renderTodos() {
  if (!todoListNode) {
    updateMetrics();
    return;
  }

  const visibleItems = getVisibleTodoItems();

  todoListNode.replaceChildren(
    ...visibleItems.map((item) => {
      const row = document.createElement('li');
      row.className = item.done ? 'todo-item is-done' : 'todo-item';
      row.dataset.todoId = item.id;

      const checkbox = document.createElement('input');
      checkbox.className = 'todo-check';
      checkbox.type = 'checkbox';
      checkbox.checked = item.done;
      checkbox.setAttribute('aria-label', `${item.text}を完了にする`);

      const body = document.createElement('div');
      body.className = 'todo-body';

      const text = document.createElement('span');
      text.className = 'todo-text';
      text.textContent = item.text;

      const meta = document.createElement('span');
      meta.className = 'todo-meta';
      meta.textContent = `${formatTodoDate(item.createdAt)} 追加`;

      const deleteButton = document.createElement('button');
      deleteButton.className = 'todo-delete';
      deleteButton.type = 'button';
      deleteButton.dataset.todoDelete = item.id;
      deleteButton.textContent = '削除';

      body.append(text, meta);
      row.append(checkbox, body, deleteButton);
      return row;
    })
  );

  if (todoEmptyNode) {
    todoEmptyNode.hidden = visibleItems.length > 0;
  }

  renderFilterButtons();
  updateMetrics();
}

if (todoFormNode && todoInputNode) {
  todoFormNode.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = todoInputNode.value.trim();

    if (!text) {
      todoInputNode.focus();
      return;
    }

    todoItems = [createTodoItem(text.slice(0, 80)), ...todoItems];
    todoInputNode.value = '';
    saveTodoItems();
    renderTodos();
    todoInputNode.focus();
  });
}

if (todoListNode) {
  todoListNode.addEventListener('change', (event) => {
    if (!event.target.matches('.todo-check')) {
      return;
    }

    const row = event.target.closest('[data-todo-id]');

    if (!row) {
      return;
    }

    todoItems = todoItems.map((item) => (
      item.id === row.dataset.todoId
        ? { ...item, done: event.target.checked }
        : item
    ));

    saveTodoItems();
    renderTodos();
  });

  todoListNode.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('[data-todo-delete]');

    if (!deleteButton) {
      return;
    }

    todoItems = todoItems.filter((item) => item.id !== deleteButton.dataset.todoDelete);
    saveTodoItems();
    renderTodos();
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    todoFilter = button.dataset.todoFilter || 'all';
    renderTodos();
  });
});

if (clearCompletedButton) {
  clearCompletedButton.addEventListener('click', () => {
    todoItems = todoItems.filter((item) => !item.done);
    saveTodoItems();
    renderTodos();
  });
}

renderActivity();
renderTasks();
renderTodos();
updateRuntimeDetails();
window.addEventListener('resize', updateRuntimeDetails);
