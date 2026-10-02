// ========================================
// 初期データ
// ========================================

const initialTasks = [
  {
    id: 1,
    name: "数学ワーク",
    due: "2026-10-04T23:59:59"
  },

  {
    id: 2,
    name: "英語プリント",
    due: "2026-10-07T23:59:59"
  },

  {
    id: 3,
    name: "理科レポート",
    due: "2026-10-10T23:59:59"
  },

  {
    id: 4,
    name: "国語ワーク",
    due: "2026-10-12T23:59:59"
  }
];


// ========================================
// localStorageから読み込み
// ========================================

let tasks =
  JSON.parse(localStorage.getItem("tasks")) ||
  initialTasks;

let submitted =
  JSON.parse(localStorage.getItem("submitted")) ||
  [];

let lateTasks =
  JSON.parse(localStorage.getItem("lateTasks")) ||
  [];

let history =
  JSON.parse(localStorage.getItem("history")) ||
  [];


// ========================================
// 保存
// ========================================

function saveData() {

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  localStorage.setItem(
    "submitted",
    JSON.stringify(submitted)
  );

  localStorage.setItem(
    "lateTasks",
    JSON.stringify(lateTasks)
  );

  localStorage.setItem(
    "history",
    JSON.stringify(history)
  );
}


// ========================================
// 日付表示
// ========================================

function formatDate(dateString) {

  const date = new Date(dateString);

  return `${date.getMonth() + 1}/${date.getDate()}`;
}


// ========================================
// 残り時間
// ========================================

function getRemaining(due) {

  const now = new Date();

  const target = new Date(due);

  const diff = target - now;


  if (diff <= 0) {
    return "期限切れ";
  }


  const days =
    Math.floor(diff / (1000 * 60 * 60 * 24));


  if (days >= 1) {
    return `あと${days + 1}日`;
  }


  const hours =
    Math.floor(diff / (1000 * 60 * 60));


  if (hours >= 1) {
    return `あと${hours}時間`;
  }


  const minutes =
    Math.floor(diff / (1000 * 60));


  return `あと${Math.max(minutes, 1)}分`;
}


// ========================================
// 履歴追加
// ========================================

function addHistory(text) {

  history.unshift({

    text: text,

    time: new Date().toLocaleString("ja-JP")

  });


  // 最大50件
  history = history.slice(0, 50);
}


// ========================================
// 提出期限チェック
// ========================================

function checkDeadline() {

  const now = new Date();


  const expired = tasks.filter(task => {

    return new Date(task.due) <= now;

  });


  if (expired.length === 0) {
    return;
  }


  expired.forEach(task => {

    lateTasks.push({

      ...task,

      lateAt: new Date().toISOString()

    });


    addHistory(
      `${task.name} が提出期限を過ぎました。`
    );

  });


  // 提出物から削除
  tasks = tasks.filter(task => {

    return new Date(task.due) > now;

  });


  saveData();

  renderAll();
}


// ========================================
// 提出済みに追加
// ========================================

function submitTask(id) {

  const index = tasks.findIndex(
    task => task.id === id
  );


  if (index === -1) {
    return;
  }


  const task = tasks[index];


  // 提出物から削除
  tasks.splice(index, 1);


  // 提出済みに追加
  submitted.unshift({

    ...task,

    submittedAt:
      new Date().toISOString(),

    late: false

  });


  addHistory(
    `${task.name} を提出しました。`
  );


  saveData();

  renderAll();

  showMessage(
    `${task.name} を提出済みに追加しました`
  );
}


// ========================================
// 提出済み → 提出物
// ========================================

function returnTask(id) {

  const index = submitted.findIndex(
    task => task.id === id
  );


  if (index === -1) {
    return;
  }


  const task = submitted[index];


  submitted.splice(index, 1);


  tasks.unshift({

    id: task.id,

    name: task.name,

    due: task.due

  });


  addHistory(
    `${task.name} を提出物に戻しました。`
  );


  saveData();

  renderAll();

  showMessage(
    `${task.name} を提出物に戻しました`
  );
}


// ========================================
// 遅れて提出
// ========================================

function submitLateTask(id) {

  const index = lateTasks.findIndex(
    task => task.id === id
  );


  if (index === -1) {
    return;
  }


  const task = lateTasks[index];


  lateTasks.splice(index, 1);


  submitted.unshift({

    ...task,

    submittedAt:
      new Date().toISOString(),

    late: true

  });


  addHistory(
    `${task.name} を遅れて提出しました。`
  );


  saveData();

  renderAll();

  showMessage(
    `${task.name} を遅れて提出しました`
  );
}


// ========================================
// 提出物表示
// ========================================

function renderTasks() {

  const element =
    document.getElementById("taskList");


  if (tasks.length === 0) {

    element.innerHTML =
      `<div class="empty">
        現在、提出する提出物はありません。
      </div>`;

    return;
  }


  element.innerHTML = tasks.map(task => {

    return `

      <div class="task">

        <div>

          <div class="task-name">
            ${escapeHtml(task.name)}
          </div>

          <div class="deadline">

            ${formatDate(task.due)}まで

            <span class="remaining">
              ${getRemaining(task.due)}
            </span>

          </div>

        </div>


        <button
          onclick="submitTask(${task.id})">

          提出済みに追加

        </button>

      </div>

    `;

  }).join("");
}


// ========================================
// 提出済み表示
// ========================================

function renderSubmitted() {

  const element =
    document.getElementById("submittedList");


  if (submitted.length === 0) {

    element.innerHTML =
      `<div class="empty">
        提出済みの提出物はありません。
      </div>`;

    return;
  }


  element.innerHTML =
    submitted.map(task => {

      return `

        <div class="submitted-item">

          <div>

            <div class="task-name">
              ${escapeHtml(task.name)}
            </div>

            <div class="submitted-status">

              ${
                task.late
                  ? "期限後に提出"
                  : "提出済み"
              }

            </div>

          </div>


          <button
            onclick="returnTask(${task.id})">

            提出物に戻す

          </button>

        </div>

      `;

    }).join("");
}


// ========================================
// 提出遅れ表示
// ========================================

function renderLate() {

  const element =
    document.getElementById("lateList");


  if (lateTasks.length === 0) {

    element.innerHTML =
      `<div class="empty">
        提出遅れはありません。
      </div>`;

    return;
  }


  element.innerHTML =
    lateTasks.map(task => {

      return `

        <div class="late-item">

          <div>

            <div class="task-name">
              ${escapeHtml(task.name)}
            </div>

            <div class="late-label">

              ${formatDate(task.due)}
              期限

            </div>

          </div>


          <div class="late-buttons">

            <button
              onclick="submitLateTask(${task.id})">

              遅れて提出

            </button>


            <button
              onclick="showLateDetail(${task.id})">

              確認

            </button>

          </div>

        </div>

      `;

    }).join("");
}


// ========================================
// 履歴表示
// ========================================

function renderHistory() {

  const element =
    document.getElementById("historyList");


  if (history.length === 0) {

    element.innerHTML =
      `<div class="empty">
        履歴はありません。
      </div>`;

    return;
  }


  element.innerHTML =
    history.map(item => {

      return `

        <div class="history-item">

          ${escapeHtml(item.text)}

          <div class="history-time">
            ${escapeHtml(item.time)}
          </div>

        </div>

      `;

    }).join("");
}


// ========================================
// 全部更新
// ========================================

function renderAll() {

  renderTasks();

  renderSubmitted();

  renderLate();

  renderHistory();
}


// ========================================
// 提出遅れ「確認」
// ========================================

function showLateDetail(id) {

  const task =
    lateTasks.find(
      task => task.id === id
    );


  if (!task) {
    return;
  }


  document.getElementById(
    "modalTitle"
  ).textContent = "提出遅れの確認";


  document.getElementById(
    "modalText"
  ).innerHTML = `

    <p>
      <strong>
        ${escapeHtml(task.name)}
      </strong>
    </p>

    <p>
      提出期限：
      ${formatDate(task.due)} 23:59
    </p>

    <p>
      この提出物は提出期限を過ぎています。
    </p>

    <p>
      「遅れて提出」を押すと、
      提出済みへ移動します。
    </p>

  `;


  document.getElementById(
    "modal"
  ).classList.remove("hidden");
}


// ========================================
// モーダルを閉じる
// ========================================

document
  .getElementById("closeModal")
  .addEventListener("click", () => {

    document
      .getElementById("modal")
      .classList.add("hidden");

  });


// 背景クリックでも閉じる

document
  .getElementById("modal")
  .addEventListener("click", event => {

    if (
      event.target.id === "modal"
    ) {

      event.currentTarget
        .classList.add("hidden");

    }

  });


// ========================================
// メッセージ
// ========================================

function showMessage(text) {

  const element =
    document.getElementById("message");


  element.textContent = text;

  element.classList.add("show");


  setTimeout(() => {

    element.classList.remove("show");

  }, 2200);
}


// ========================================
// XSS対策
// ========================================

function escapeHtml(text) {

  return String(text)

    .replaceAll("&", "&amp;")

    .replaceAll("<", "&lt;")

    .replaceAll(">", "&gt;")

    .replaceAll('"', "&quot;")

    .replaceAll("'", "&#039;");
}


// ========================================
// 初期処理
// ========================================

// ページを開いたときに期限チェック
checkDeadline();

renderAll();


// ========================================
// 1分ごとに期限をチェック
// ========================================

setInterval(() => {

  checkDeadline();

  renderTasks();

}, 60 * 1000);
