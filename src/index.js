import "./styles.css";

const onClickAdd = () => {
  //テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value; //add-textの値を変数に代入
  document.getElementById("add-text").value = ""; //add-textの値を空にする

  createIncompleteList(inputText);
};
//未完了リストから要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target); //子要素から指定のタグを削除
};

//未完了リストに追加する関数
const createIncompleteList = (text) => {
  //div生成
  const div = document.createElement("div"); //divタグを生成し変数divに代入
  div.className = "list-row"; //divタグにクラス名を命名

  //liタグ生成
  const li = document.createElement("li"); //liタグを生成し変数liに代入
  li.innerText = text; //liタグの値をinputTextの値にする

  //button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //押された完了ボタンの親タグ(div)を未完了リストから削除
    deleteFromIncompleteList(completeButton.parentNode); //completeButtonの親要素を取得

    const addTarget = completeButton.parentNode; //完了ボタンの親要素(list-row)取得
    const text = addTarget.firstElementChild.innerText; //list-rowの最初の要素のテキストを取得

    //div以下を初期化
    addTarget.textContent = null;

    //liタグ生成
    const li = document.createElement("li");
    li.innerText = text;

    //ボタンタグ(戻す)生成
    const returnButton = document.createElement("button");
    returnButton.innerText = "戻す";
    returnButton.addEventListener("click", () => {
      //押された戻すボタンの親タグ(div)を完了したリストから削除
      const deleteTarget = returnButton.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      //テキストを取得
      const text = returnButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });

    //divタグの子要素に各要素を設定
    addTarget.appendChild(li);
    addTarget.appendChild(returnButton);

    //完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  //button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //押された削除ボタンの親タグ(div)を未完了リストから削除
    deleteFromIncompleteList(deleteButton.parentNode); //deleteButtonの親要素を取得
  });

  //divタグの子要素に各要素を設定
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  //未完了リストに追加
  document.getElementById("incomplete-list").appendChild(div);
};

//追加ボタン押下時に実行される
document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
