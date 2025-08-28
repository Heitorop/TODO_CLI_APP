import url from 'url';
import path from 'path';
import { access, writeFile, readFile } from "fs/promises";
import { constants } from "fs";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const todoListDir = path.join(__dirname, 'todoList.json');


const fileExists = async () => {
    try {
        await access(todoListDir, constants.F_OK);
        return true;
    } catch {
        return false;
    }
};

const TODO_LIST = process.env.TODO_LIST || 'todoList.json';
const isFileExists = await fileExists();



export const showList = async() => {
    if (isFileExists) {
        const data = await readFile(TODO_LIST, 'utf-8');
        const todoList = JSON.parse(data);
        console.log("To-Do List:");
        todoList.forEach(task => {
            console.log(`- [${task.done ? 'x' : ' '}] ${task.task}`);
        });
    }else {
        console.log("No file found.");
        return;
    }
}

export const addTask = async (taskName) => {
    if (isFileExists) {
        const data = await readFile(TODO_LIST, 'utf-8');
        const todoList = JSON.parse(data);
        todoList.push({ task: taskName, done: false, id: Date.now() });
        await writeFile(TODO_LIST, JSON.stringify(todoList, null, 2));
    } else {
        await writeFile(TODO_LIST, JSON.stringify([{ task: taskName, done: false, id: Date.now() }], null, 2));
    }
    console.log(`Task "${taskName}" added.`);
}


export const doneTask = async (taskName) => {
    if (isFileExists) {
        const data = await readFile(TODO_LIST, 'utf-8');
        const todoList = JSON.parse(data);
        todoList.forEach(task => {
            if (task.task === taskName) {
                task.done = true;
            }
        });
        await writeFile(TODO_LIST, JSON.stringify(todoList, null, 2));
        console.log(`Task "${taskName}" marked as done.`);

    } else {
        console.log("No file found.");
        return;
    }
}

export const removeTask = async (taskName) => {
    if (isFileExists) {
        const data = await readFile(TODO_LIST, 'utf-8');
        const todoList = JSON.parse(data);
        const updatedList = todoList.filter(task => task.task !== taskName);
        await writeFile(TODO_LIST, JSON.stringify(updatedList, null, 2));
        console.log(`Task "${taskName}" removed.`);

    } else {
        console.log("No file found.");
        return;
    }
}