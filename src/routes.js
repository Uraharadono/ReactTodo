import Todo from "./TodoComponent/Todo";
import Todo2 from "./TodoComponentTwo/Todo";


const routes = [
    {
        path: '/',
        exact: true,
        component: Todo,
    },
    {
        path: '/todo-list',
        exact: false,
        component: Todo,
    },
    {
        path: '/todo-list-2',
        exact: false,
        component: Todo2,
    }
];

export default routes;