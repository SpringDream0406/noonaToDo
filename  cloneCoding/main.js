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
let underLine = document.getElementById("under-line");
let addBtn = document.getElementById("add-btn");
let taskList = [];
let filterList = [];
let mode = "all";
let finalList = [];

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        addTask();
    }
})


for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (e) {
        filter(e)
    })
}

function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    filter();
    taskInput.value = "";
}

function render() {
    let resultHTML = ``;
    for (let task of filterList) {
        if (task.isComplete == true) {
            resultHTML += `<div class="task">
            <div class="task-done">${task.taskContent}</div>
            <div>
                <button onclick="toggleComplete('${task.id}')"><i class="fa-solid fa-rotate-left fa-lg"></i></button>
                <button onclick="deleteTask('${task.id}')"><i class="fa-regular fa-trash-can fa-xl"></i></button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
                    <div>${task.taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${task.id}')"><i class="fa-regular fa-square-check fa-xl"></i></button>
                        <button onclick="deleteTask('${task.id}')"><i class="fa-regular fa-trash-can fa-xl"></i></button>
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
    filter();
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
        }
    }
    filter();
}

function filter(e) {
    if (e) {
        mode = e.target.id;
        underLine.style.width = e.target.offsetWidth + "px";
        underLine.style.left = e.target.offsetLeft + "px";
        underLine.style.top =
            e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
    }
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