let make = {
    taskElement : document.getElementById("tasks-container"),
    tasks : JSON.parse(localStorage.getItem('tasks')) || [],

    check: function () {
        let checkboxes = document.querySelectorAll(".task-check");

        checkboxes.forEach((box, index) => {
            box.addEventListener("change", () => {
                if (box.checked) {
                    setTimeout(() => {
                        box.closest(".task").remove();
                        this.tasks.splice(index, 1);
                        localStorage.setItem("tasks", JSON.stringify(this.tasks));
                    }, 300)
                }
            });
        });
    },
    loadTasks : function () {
        if (this.tasks){
            this.taskElement.innerHTML = "";
            this.tasks.forEach(task => {
                this.taskElement.innerHTML += `
                    <div class="task ${task.priorty}">
                        <div class="task-left">
                            <input type="checkbox" class="task-check">
                            <p class="task-text">${task.title}</p>
                            <p class="task-date">Due Date : ${task.date}</p>
                            <span class="priority ${task.priorty}">Priority : ${task.priorty}</span>
                            <p class="task-desc">${task.description}</p>
                        </div>

                        <div class="task-right">
                            <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                `;
            });
            this.delete();  
            this.check()
        }
    },

    delete : function (){
        let deleteBtns = document.querySelectorAll(".delete-btn");

        deleteBtns.forEach((icon, index) => {
            icon.addEventListener("click", () => {
                icon.closest(".task").remove();
                this.tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(this.tasks));
            });
        });
    },

    clear: function (){
        this.title.value = '';
        this.priorty.value = 'false';
        this.date.value = '';
        this.description.value = '';
    },
    edit : function (){
        let editButtons = document.querySelectorAll(".edit-btn")
        let btn = document.getElementById("submit")
        // بنمشي في كل button 
        editButtons.forEach((button , index) => {
            button.onclick = () =>{
                this.title.value = this.tasks[index].title
                this.date.value = this.tasks[index].date
                this.priorty.value = this.tasks[index].priorty
                this.description.value = this.tasks[index].description
                btn.value = 'Save'
                btn.onclick = () => {
                    // بنعملهم ابديت
                    this.title = document.getElementById("taskName");
                    this.priorty = document.getElementById("select");
                    this.date = document.getElementById("taskDate");
                    this.description = document.getElementById("description");

                    // الحالات 
                    if (this.title.value === '') return alert('Please Enter Title');
                    if (this.priorty.value === 'false') return alert('Please Choose Priority');
                    if (this.date.value === '') return alert('Please Choose the date');
                    if (this.description.value === '') return alert('Please Type Description');

                    // بنسيفهم
                    this.tasks[index].title = this.title.value
                    this.tasks[index].date = this.date.value
                    this.tasks[index].priorty = this.priorty.value
                    this.tasks[index].description = this.description.value

                    // بنسيفهم في ال local storage
                    localStorage.setItem("tasks", JSON.stringify(this.tasks));

                    // نرجع الموقع زي ما كان
                    this.taskElement.innerHTML = "";
                    this.loadTasks();
                    this.check();
                    this.delete();
                    this.edit();
                    btn.value = "Assign";
                    this.clear();
                    btn.onclick = make.makeTask.bind(make);
                }

            }
        })
    },
    makeTask : function () {
        this.title = document.getElementById("taskName");
        this.priorty = document.getElementById('select');
        this.date = document.getElementById("taskDate");
        this.description = document.getElementById("description");

        if (this.title.value === '') return alert('Please Enter Title');
        if (this.priorty.value === 'false') return alert('Please Choose Priority');
        if (this.date.value === '') return alert('Please Choose the date');
        if (this.description.value === '') return alert('Please Type Description');

        this.taskElement.innerHTML += `
            <div class="task ${this.priorty.value}">
                <div class="task-left">
                    <input type="checkbox" class="task-check" >
                    <p class="task-text">${this.title.value}</p>
                    <p class="task-date">Due Date : ${this.date.value}</p>
                    <span class="priority ${this.priorty.value}">Priority : ${this.priorty.value}</span>
                    <p class="task-desc">${this.description.value}</p>
                </div>

                <div class="task-right">
                    <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
        this.check()

        let task = {
            title : this.title.value,
            date : this.date.value,
            priorty : this.priorty.value,
            description : this.description.value
        };

        this.tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));

        this.delete()
        this.edit()
        this.clear();
    }
};




// theme toggle
const modeToggle = document.getElementById("modeToggle");
const body = document.body;

body.classList.add(localStorage.getItem("theme") || "light");
modeToggle.textContent = localStorage.getItem("icon") || "🌙"
modeToggle.addEventListener('click', () => {
    if (body.classList.contains("light")) {
        body.classList.replace("light", "dark");
        modeToggle.textContent = '🌕'
        localStorage.setItem("theme", "dark");
        localStorage.setItem("icon", "🌕");

    } else {
        body.classList.replace("dark", "light");
        localStorage.setItem("theme", "light");
        modeToggle.textContent = '🌙'
        localStorage.setItem("icon", "🌙");
    }
})

submit = document.getElementById("submit")
submit.onclick =  make.makeTask.bind(make)

// make the web work
window.addEventListener('load', () => {
    make.loadTasks();
    make.delete();
    make.check();
    make.edit(); 
});
