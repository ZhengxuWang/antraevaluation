import { TodoAPI } from './api.js';
const View = (() => {
    const domstr = {
        table: '#table',
    };
    const render = (element, tmp) => {
        element.innerHTML = tmp;
    }
    const createTheTmp = arr => {
        let tmp = `<tr>
                    <th>region</th>
                    <th>model</th>
                    <th>sales</th>
                </tr>`;
        arr.forEach(ele => {
            tmp += `<tr>
                <td>
                    ${ele.region}
                </td>
                <td>
                    ${ele.model}
                </td>
                <td>
                    ${ele.sales}
                </td>
            </tr>`
        });
        return tmp;
    }

    return {
        render,
        createTheTmp,
        domstr
    }
})();


const Model = ((api, view) => {
    class State {
        #todolist = [];
        constructor() { }

        get todolist() {
            return this.#todolist;
        }
        set todolist(newarr) {
            this.#todolist = newarr;
            const tmp = view.createTheTmp(this.#todolist);
            const element = document.querySelector(view.domstr.table);
            view.render(element, tmp);
        }
    }
    const getAllTodos = api.getAllTodos;

    return {
        getAllTodos,
        State,
    }
})(TodoAPI, View);

const Controler = ((view, model) => {
    const state = new model.State();
    const inittodolist = () => {
        let res = [];
        let arr = model.getAllTodos;
        const map = new Map();
        for (let i = 0; i < arr.length; i++) {
            if (map.has(arr[i].region)) {
                map.set(arr[i].region, map.get(arr[i].region) + arr[i].sales);
            } else {
                map.set(arr[i].region, arr[i].sales);
            }
        }
        const set = new Set();
        for (let i = 0; i < arr.length; i++) {
            let reg = arr[i].region;
            if (!set.has(reg)) {
                let sum = map.get(arr[i].region);
                res.push({region: reg, model: 'sum', sales: sum});
                set.add(arr[i].region);
            } 
            res.push(arr[i]);
        }
        state.todolist = res;
    }
    const init = () => {inittodolist()};
    return {init};
})(View, Model);

Controler.init();
