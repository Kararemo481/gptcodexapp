const loadedNode = document.querySelector('[data-runtime="loaded"]');
const viewportNode = document.querySelector('[data-runtime="viewport"]');
const activityListNode = document.querySelector('#activity-list');
const taskListNode = document.querySelector('#task-list');

const activityItems = [
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
  '公開アプリに入れる最初の本機能を決める。',
  'issueテンプレートとPRテンプレートを追加して、次回以降の作業を楽にする。',
  '作業履歴を手書きではなく自動生成できる形に育てる。'
];

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

renderActivity();
renderTasks();
updateRuntimeDetails();
window.addEventListener('resize', updateRuntimeDetails);
