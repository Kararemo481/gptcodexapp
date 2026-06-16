const loadedNode = document.querySelector('[data-runtime="loaded"]');
const viewportNode = document.querySelector('[data-runtime="viewport"]');
const activityListNode = document.querySelector('#activity-list');
const taskListNode = document.querySelector('#task-list');

const activityItems = [
  {
    id: 'PR #6',
    title: 'Prepared GitHub Pages deployment',
    meta: 'Added Pages deployment notes and validation for the publish path.',
    href: 'https://github.com/Kararemo481/gptcodexapp/pull/6'
  },
  {
    id: 'PR #4',
    title: 'Added starter static app',
    meta: 'Created the first public app surface with HTML, CSS, and JavaScript.',
    href: 'https://github.com/Kararemo481/gptcodexapp/pull/4'
  },
  {
    id: 'PR #2',
    title: 'Initial repository setup',
    meta: 'Expanded the README, added gitignore rules, and created validation.',
    href: 'https://github.com/Kararemo481/gptcodexapp/pull/2'
  }
];

const nextTasks = [
  'Choose the first real feature for the published app.',
  'Add issue and pull request templates for repeatable work.',
  'Replace the static activity data with generated repository data later.'
];

function formatViewport() {
  return `${window.innerWidth} x ${window.innerHeight}`;
}

function updateRuntimeDetails() {
  if (loadedNode) {
    loadedNode.textContent = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  if (viewportNode) {
    viewportNode.textContent = formatViewport();
  }
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
      link.textContent = 'Open';

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

renderActivity();
renderTasks();
updateRuntimeDetails();
window.addEventListener('resize', updateRuntimeDetails);
