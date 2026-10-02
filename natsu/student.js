// 現在登録しようとしている種類
let currentType = "";


// =========================
// フォームを開く
// =========================

function openForm(type) {

    currentType = type;

    // ホーム画面を隠す
    document.getElementById("homeScreen").classList.add("hidden");

    // フォーム画面を表示
    document.getElementById("formScreen").classList.remove("hidden");


    // タイトルを変更
    const title = document.getElementById("formTitle");

    if (type === "submission") {
        title.textContent = "提出物登録";
    }

    if (type === "test") {
        title.textContent = "近日のテスト登録";
    }

    if (type === "belongings") {
        title.textContent = "持ち物登録";
    }
}



// =========================
// 登録
// =========================

function register() {

    const subject =
        document.getElementById("subject").value;

    const content =
        document.getElementById("content").value;

    const date =
        document.getElementById("date").value;


    // 入力されているか確認
    if (subject === "" || content === "" || date === "") {

        alert("すべて入力してください");

        return;
    }


    // 日付を見やすくする
    const dateText = date.replaceAll("-", "/");


    // 表示する文章
    const text =
        dateText + "　" + subject + "　" + content;


    // 登録する場所
    if (currentType === "submission") {

        document.getElementById("submissionList").innerHTML =
            text;
    }


    if (currentType === "test") {

        document.getElementById("testList").innerHTML =
            text;
    }


    if (currentType === "belongings") {

        document.getElementById("belongingsList").innerHTML =
            text;
    }


    // 入力欄を空にする
    document.getElementById("subject").value = "";
    document.getElementById("content").value = "";
    document.getElementById("date").value = "";


    // ホームに戻る
    backHome();
}



// =========================
// ホーム画面に戻る
// =========================

function backHome() {

    document.getElementById("formScreen").classList.add("hidden");

    document.getElementById("homeScreen").classList.remove("hidden");
}



// =========================
// ログイン画面へ戻る
// =========================

function goLogin() {

    // 仮
    alert("ログイン画面へ戻ります");

    // ログイン画面を作ったら
    // location.href = "login.html";
}
