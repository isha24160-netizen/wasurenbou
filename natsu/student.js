// 現在登録しようとしている種類
let currentType = "";

function openForm(type) {

    currentType = type;

    document.getElementById("homeScreen").classList.add("hidden");
    document.getElementById("formScreen").classList.remove("hidden");

    if (type === "submission") {
        document.getElementById("formTitle").textContent = "提出物登録";
    }

    if (type === "test") {
        document.getElementById("formTitle").textContent = "近日のテスト登録";
    }

    if (type === "belongings") {
        document.getElementById("formTitle").textContent = "持ち物登録";
    }
}


function backHome() {

    document.getElementById("formScreen").classList.add("hidden");
    document.getElementById("homeScreen").classList.remove("hidden");

}


function register() {

    const subject = document.getElementById("subject").value;
    const content = document.getElementById("content").value;
    const date = document.getElementById("date").value;

    if (subject === "" || content === "" || date === "") {
        alert("すべて入力してください");
        return;
    }

    const text = date + "　" + subject + "　" + content;

    if (currentType === "submission") {
        document.getElementById("submissionList").textContent = text;
    }

    if (currentType === "test") {
        document.getElementById("testList").textContent = text;
    }

    if (currentType === "belongings") {
        document.getElementById("belongingsList").textContent = text;
    }

    backHome();
}


function goLogin() {
    alert("ログイン画面へ戻ります");
}
