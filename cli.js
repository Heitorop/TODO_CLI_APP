import { showList, addTask, doneTask, removeTask } from './todoService.js';

const taskName = process.argv[3];

switch (process.argv[2]) {
    case 'show':
        await showList();
        break;
    case 'add':
        await addTask(taskName);
        break;
    case 'done':
        await doneTask(taskName);
        break;
    case 'remove':
        await removeTask(taskName);
        break;
    default:
        console.log("Unknown command. Available commands: add <taskName>, done <taskName>");
        process.exit(1);
}               