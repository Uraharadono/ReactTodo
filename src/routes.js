import TodoMultiFiles from "./page-components/TodoComponentMultiFiles/Todo";
import TodoSingleFile from "./page-components/TodoComponentSingleFile/Todo";
import TodoComponentValidated from "./page-components/TodoComponentValidated/Todo";
import DomShowreelComponent from "./page-components/DomShowreelComponent/DomShowreelComponent";


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
    },
    {
        path: '/dom-showreel',
        exact: false,
        component: DomShowreelComponent,
    }
];

export default routes;