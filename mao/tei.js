// 提出済みに追加
function addSubmitted(name) {

  const list = document.getElementById("submittedList");

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

  list.appendChild(item);
}


// 提出物に戻す
function returnTask(button, name) {

  // ボタンが入っている提出済みの項目を削除
  const item = button.parentElement;

  item.remove();

  alert(name + "を提出物に戻しました");
}


// 遅れて提出
function lateSubmit(name) {

  const list = document.getElementById("submittedList");

  const item = document.createElement("div");

  item.className = "submitted-item";

  item.innerHTML = `
    <div>
      <p>${name}</p>
      <span>期限後に提出</span>
    </div>

    <button onclick="returnTask(this, '${name}')">
      提出物に戻す
    </button>
  `;

  list.appendChild(item);

  alert(name + "を遅れて提出しました");
}


// 確認
function showConfirm(name) {

  const screen =
    document.getElementById("confirmScreen");

  const text =
    document.getElementById("confirmText");

  text.textContent =
    name + "は提出期限を過ぎています。";

  screen.style.display = "block";
}


// 戻る
function back() {

  document
    .getElementById("confirmScreen")
    .style.display = "none";
}
