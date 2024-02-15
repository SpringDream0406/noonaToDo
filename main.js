let taskInput = document.getElementById("task-input");
let taskBoard = document.getElementById("task-board")
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let addBtn = document.getElementById("add-btn");

let backgroundImg = ['url("img/1.gif")', 'url("img/2.gif")', 'url("img/3.gif")'];
let taskList = [];
let nowBackGround = backgroundImg[0];
let filterList = [];
let mode = "ing";



for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", (e) => {
        filter(e)
    })
}

taskInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        addTask();
    }
})
addBtn.addEventListener("click", () => {
    addBtn.disabled = true;
    addTask();
    setTimeout(() => {
        addBtn.disabled = false;
    }, 300);
});

function filter(e) {
    if (e) {
        mode = e.target.id;
        underLine.style.width = e.target.offsetWidth + "px";
        underLine.style.left = e.target.offsetLeft + "px";
        underLine.style.top = e.target.offsetTop + (e.target.offsetHeight - 8) + "px";
    }
    filterList = [];
    if (mode == "ing") {
        for (let task of taskList) {
            if (task.isComplete == false) {
                filterList.push(task);
            }
        }
    } else if (mode == "done") {
        for (let task of taskList) {
            if (task.isComplete == true) {
                filterList.push(task);
            }
        }
    } else {
        filterList = taskList;
    }
    render();


}

function render() {
    let resultHTML = ``;
    for (let i = filterList.length - 1; i >= 0; i--) {
        if (filterList[i].isComplete == false) {
            resultHTML +=
                `<div class="task">
                    <div>${i + 1}</div>
                    <div>
                        ${filterList[i].taskContent}
                    </div>
                    <div>
                        <button onclick="taskComplete('${filterList[i].id}')"><i class="fa-regular fa-square-check fa-xl" style="color: #ffffff;"></i></button>
                        <button onclick="taskDelete('${filterList[i].id}')"><i class="fa-regular fa-trash-can fa-xl" style="color: #ffffff;"></i></button>
                    </div>
            
                </div>`
        } else {
            resultHTML +=
                `<div class="task">
                <div>${i + 1}</div>
                <div class="task-done">
                    ${filterList[i].taskContent}
                </div>
                <div>
                    <button onclick="taskComplete('${filterList[i].id}')"><i class="fa-solid fa-rotate-left fa-lg" style="color: #ffffff;"></i></button>
                    <button onclick="taskDelete('${filterList[i].id}')"><i class="fa-regular fa-trash-can fa-xl" style="color: #ffffff;"></i></button>
                </div>
        
            </div>`

        }
    }
    taskBoard.innerHTML = resultHTML;
}

function taskDelete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    filter();
}

function taskComplete(id) {
    for (let task of taskList) {
        if (task.id == id) {
            task.isComplete = !task.isComplete;
            break;
        }
    }
    filter();
}

function addTask() {
    if (taskInput.value == "") {
        return;
    }
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    }
    taskList.push(task);
    taskInput.value = "";

    if (nowBackGround == backgroundImg[0]) {
        changeBackGroundImage(2);
        setTimeout(function () {
            filter();
            changeBackGroundImage(0);
        }, 300);

    }
}

function changeBackGroundImage(index) {
    nowBackGround = backgroundImg[index];
    document.body.style.backgroundImage = nowBackGround;
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}


// 클론코딩이랑 내가 한거랑 페이지 나누기