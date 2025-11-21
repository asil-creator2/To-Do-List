let make = {
    taskElement : document.getElementById("tasks-container"),
    tasks :JSON.parse( localStorage.getItem('tasks')) || [],
    check: function () {
        let checkboxes = document.querySelectorAll(".task-check");

        checkboxes.forEach((box, index) => {
            box.addEventListener("change", () => {
                if (box.checked) {

                    // remove from HTML
                    setTimeout(() => {
                    // remove from HTML
                    box.closest(".task").remove();

                    // remove from array
                    this.tasks.splice(index, 1);

                    // save update
                    localStorage.setItem("tasks", JSON.stringify(this.tasks));
                }, 300)
            }   });
        });
    },
    loadTasks : function () {
        if (this.tasks){
            this.tasks.forEach(task => {
                this.taskElement.innerHTML += `
                    <div class="task">
                        <div class="task-left">
                            <input type="checkbox" class="task-check">
                            <p class="task-text">${task.title}</p>
                            <p class="task-date">${task.date}</p>
                            <span class="priority ${task.priorty}">${task.priorty}</span>
                            <p class="task-desc">${task.description}</p>
                        </div>

                        <div class="task-right">
                            <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                `;
            this.delete();  
            })

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
        this.title = ''
        this.priorty = 'false'
        this.date = ''
        this.description = ''
    },
    makeTask : function () {
        this.title = document.getElementById("taskName").value;
        this.priorty = document.getElementById('select').value;
        this.date = document.getElementById("taskDate").value;
        this.description = document.getElementById("description").value;
        if (this.title === '') {
            alert('Please Enter Title');
            return;
        }
        if (this.priorty === 'false') {
            alert('Please Choose Priority');
            return;
        }
        if (this.date === '') {
            alert('Please Choose the date');
            return;
        }
        if (this.description === ''){
            alert('Please Type Description');
            return;        
        }
        this.taskElement.innerHTML += `
            <div class="task">
                <div class="task-left">
                    <input type="checkbox" class="task-check" >
                    <p class="task-text">${this.title}</p>
                    <p class="task-date">${this.date}</p>
                    <span class="priority ${this.priorty}">${this.priorty}</span>
                    <p class="task-desc">${this.description}</p>
                </div>

                <div class="task-right">
                    <button class="edit-btn"><i class="fa-solid fa-pen-to-square "></i></button>
                    <button class="delete-btn"><i class="fa-solid fa-trash "></i></button>
                </div>
            </div>
        `;
    this.delete();   
    let task = {
        title : this.title,
        date : this.date,
        priorty : this.priorty,
        description : this.description
    }
    this.tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
    this.clear()
    }

};

let finale = {
    submit : document.getElementById("submit"),
    clickAssign : function() {
        this.submit.addEventListener('click', make.makeTask.bind(make))
    },
}


finale.clickAssign()
window.addEventListener('load', () => {
    make.loadTasks()
    make.check()
})