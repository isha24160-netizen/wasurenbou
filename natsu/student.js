// 学校から登録された持ち物
const schoolBelongings = [
    {
        name: "数学のプリント",
        date: "8/8"
    },
    {
        name: "エプロン",
        date: "1/23"
    },
    {
        name: "裁縫道具",
        date: "7/15"
    }
];


// 自分で追加した持ち物
let myBelongings = [
    "図書館の本",
    "部活の道具"
];


// 学校からの提出物
const submissions = [
    {
        name: "数学ワーク",
        date: "8/8"
    },
    {
        name: "英語プリント",
        date: "8/10"
    }
];


// =========================
// 画面切り替え
// =========================

// 提出物画面
function showSubmission() {

    document.getElementById("homeScreen").classList.add("hidden");
    document.getElementById("belongingsScreen").classList.add("hidden");

    document.getElementById("submissionScreen").classList.remove("hidden");

    displaySubmissions();
}


// 持ち物画面
function showBelongings() {

    document.getElementById("homeScreen").classList.add("hidden");
    document.getElementById("submissionScreen").classList.add("hidden");

    document.getElementById("belongingsScreen").classList.remove("hidden");

    displaySchoolBelongings();
    displayMyBelongings();
}


// ホームに戻る
function backHome() {

    document.getElementById("submissionScreen").classList.add("hidden");
    document.getElementById("belongingsScreen").classList.add("hidden");

    document.getElementById("homeScreen").classList.remove("hidden");
}


// ログイン画面へ
function goLogin() {

    // 実際のログイン画面を作ったら
    // location.href = "login.html";

    alert("ログイン画面へ戻ります");
}



// =========================
// 提出物
// =========================

function displaySubmissions() {

    const list = document.getElementById("submissionList");

    list.innerHTML = "";

    submissions.forEach(function(item) {

        const div = document.createElement("div");

        div.textContent =
            "☑" + item.name + "　" + item.date;

        list.appendChild(div);
    });
}



// =========================
// 持ち物
// =========================

// 学校からの持ち物
function displaySchoolBelongings() {

    const list = document.getElementById("schoolBelongingsList");

    list.innerHTML = "";

    schoolBelongings.forEach(function(item) {

        const div = document.createElement("div");

        div.className = "belonging-item";

        div.textContent =
            "☑" + item.name + "　　 " + item.date;

        list.appendChild(div);
    });
}


// 自分で追加した持ち物
function displayMyBelongings() {

    const list = document.getElementById("myBelongingsList");

    list.innerHTML = "";

    myBelongings.forEach(function(item, index) {

        const div = document.createElement("div");

        div.className = "belonging-item my-item";

        div.innerHTML =
            "☑" +
            item +
            '<button class="delete-button" onclick="deleteBelonging(' +
            index +
            ')">【削除】</button>';

        list.appendChild(div);
    });
}


// 持ち物を追加
function addBelonging() {

    const item = prompt("追加する持ち物を入力してください");

    if (item === null || item.trim() === "") {
        return;
    }

    myBelongings.push(item.trim());

    displayMyBelongings();
}


// 持ち物を削除
function deleteBelonging(index) {

    myBelongings.splice(index, 1);

    displayMyBelongings();
}
