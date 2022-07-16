import {
    saveTask,
    getTask,
    onGetTask,
    deleteTask,
    updateTask
} from "./firebase.js";

const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('task-container')
let editStatus = false;
let id = "";

window.addEventListener('DOMContentLoaded', () => {

    onGetTask((taskList) => {
        let html = ""
        taskList.forEach(el => {
            console.log(el.data());
            const taskInner = el.data();
            html += `
            <div class="card card-body mt-2 border-primary">
                <h2 class="h5">${taskInner.title}</h2>
                <p>${taskInner.description}</p>
                <div>
                <button class="btn btn-primary btn-delete" data-id="${el.id}">Delete</button>
                <button class="btn btn-secondary btn-edit" data-id="${el.id}">Edit</button>
                </div>
            </div>
            `
        });
        taskContainer.innerHTML = html

        const btnDelete = taskContainer.querySelectorAll('.btn-delete');

        btnDelete.forEach(el => {
            el.addEventListener('click', ({
                target: {
                    dataset
                }
            }) => {
                deleteTask(dataset.id)
            })

        })

        const btnEdit = taskContainer.querySelectorAll('.btn-edit');

        btnEdit.forEach(el => {
            el.addEventListener('click', async (e) => {
                const inTask = await getTask(e.target.dataset.id);
                const taskEdit = inTask.data();
                taskForm['task-title'].value = taskEdit.title;
                taskForm['task-description'].value = taskEdit.description;
                editStatus = true;
                id = e.target.dataset.id
                taskForm['btn-task-save'].innerText = 'Update';
            })
        })
    })
});

taskForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const title = taskForm['task-title'];
    const description = taskForm['task-description'];
    if (!editStatus) {
        saveTask(title.value, description.value);
    } else {
        updateTask(id, {title: title.value, description: description.value})
        editStatus = false;
        taskForm['btn-task-save'].innerText = 'Save';

    }
    taskForm.reset();

});