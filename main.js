// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 true => false
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면,  언더바가 이동한다
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let tabs = document.querySelectorAll(".task-tabs div")
let addBtn = document.getElementById("add-btn");
let taskList = [];
let filterList = [];
let mode = "all";
let finalList = [];

addBtn.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
        filter(event)
    })
}

function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    render();
    taskInput.value = "";
    console.log(taskList);
}

function render() {
    let resultHTML = ``;
    finalList = [];
    mode == "all" ? finalList = taskList : finalList = filterList;
    for (let task of finalList) {
        if (task.isComplete == true) {
            resultHTML += `<div class="task">
            <div class="task-done">${task.taskContent}</div>
            <div>
                <button onclick="toggleComplete('${task.id}')"><i class="fa-solid fa-rotate-left"></i></button>
                <button onclick="deleteTask('${task.id}')"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
                    <div>${task.taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${task.id}')"><i class="fa-regular fa-square-check"></i></button>
                        <button onclick="deleteTask('${task.id}')"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for (let task of taskList) {
        if (task.id == id) {
            task.isComplete = !task.isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function deleteTask(id) {
    for (let i = 0; i < finalList.length; i++) {
        if (finalList[i].id == id) {
            finalList.splice(i, 1);
        }
    }
    render();
}

function filter(event) {
    mode = event.target.id;
    filterList = [];
    if (mode === "all") {
        // 전체리스트
        filterList = taskList;
    } else if (mode === "ing") {
        // 진행중인 아이템을 보여준다
        // task.isComplete==false
        for (let task of taskList) {
            if (task.isComplete == false) {
                filterList.push(task);
            }
        }
    } else if (mode === "done") {
        // task.isComplete==true
        for (let task of taskList) {
            if (task.isComplete == true) {
                filterList.push(task);
            }
        }
    }
    render()
}


function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}