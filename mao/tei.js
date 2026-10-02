// 提出済みに追加
function addSubmitted(name, taskId) {

  // 提出物を取得
  const task = document.getElementById(taskId);

  // 提出物から削除
  task.remove();

  // 提出済みの場所を取得
  const submittedList =
    document.getElementById("submittedList");

  // 新しい提出済みを作る
  const item = document.createElement("div");

  item.className = "submitted-item";

  item.innerHTML = `
    <div>
      <p>${name}</p>
      <span>提出済み</span>
    </div>

    <button onclick="returnTask(this, '${name}')">
      提出物に戻す
    </button>
  `;

  // 提出済みに追加
  submittedList.appendChild(item);
}


// 提出物に戻す
function returnTask(button, name) {

  // 提出済みから削除
  const item = button.parentElement;

  item.remove();

  // 提出物の場所
  const taskList =
    document.getElementById("taskList");

  // 新しい提出物を作る
  const task = document.createElement("div");

  task.className = "task";

  task.innerHTML = `
    <div>
      <p>${name}</p>
    </div>

    <button onclick="addSubmittedFromReturn(this, '${name}')">
      提出済みに追加
    </button>
  `;

  // 提出物に追加
  taskList.appendChild(task);
}


// 戻した提出物を再び提出する
function addSubmittedFromReturn(button, name) {

  const task = button.parentElement;

  task.remove();

  const submittedList =
    document.getElementById("submittedList");

  const item = document.createElement("div");

  item.className = "submitted-item";

  item.innerHTML = `
    <div>
      <p>${name}</p>
      <span>提出済み</span>
    </div>

    <button onclick="returnTask(this, '${name}')">
      提出物に戻す
    </button>
  `;

  submittedList.appendChild(item);
}
