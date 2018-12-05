import TodoMultiFiles from "./TodoComponent/Todo";
import TodoSingleFile from "./TodoComponentTwo/Todo";
import TodoComponentValidated from "./TodoComponentValidated/Todo";


const routes = [
    {
        path: '/',
        exact: true,
        component: TodoMultiFiles,
    },
    {
        path: '/todo-list',
        exact: false,
        component: TodoMultiFiles,
    },
    {
        path: '/todo-list-2',
        exact: false,
        component: TodoSingleFile,
    },
    {
        path: '/todo-validated',
        exact: false,
        component: TodoComponentValidated,
    }
];

export default routes;