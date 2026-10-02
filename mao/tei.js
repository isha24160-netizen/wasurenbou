function addSubmitted(name, taskId) {

  // 元の提出物を取得
  const task = document.getElementById(taskId);

  // 元の提出物を消す
  task.remove();

  // 提出済みの場所を取得
  const submittedList =
    document.getElementById("submittedList");

  // 提出済みの項目を作る
  const item = document.createElement("div");

  item.className = "submitted-item";

  item.innerHTML = `
    <p>${name}</p>

    <span>提出済み</span>

    <button onclick="returnTask(this, '${name}')">
      提出物に戻す
    </button>
  `;

  // 提出済みに追加
  submittedList.appendChild(item);
}


function returnTask(button, name) {

  // 「提出物に戻す」ボタンがある項目を削除
  const item = button.parentElement;

  item.remove();

  // 提出物の場所
  const taskList =
    document.getElementById("taskList");

  // 提出物を作り直す
  const task = document.createElement("div");

  task.className = "task";

  task.innerHTML = `
    <div>
      <p>${name}</p>
      <span>提出物</span>
    </div>

    <button onclick="addSubmittedFromReturn(this, '${name}')">
      提出済みに追加
    </button>
  `;

  // 提出物に戻す
  taskList.appendChild(task);
}


function addSubmittedFromReturn(button, name) {

  // 提出物から削除
  button.parentElement.remove();

  // 提出済みの場所
  const submittedList =
    document.getElementById("submittedList");

  // 提出済みを作る
  const item = document.createElement("div");

  item.className = "submitted-item";

  item.innerHTML = `
    <p>${name}</p>

    <span>提出済み</span>

    <button onclick="returnTask(this, '${name}')">
      提出物に戻す
    </button>
  `;

  submittedList.appendChild(item);
}
