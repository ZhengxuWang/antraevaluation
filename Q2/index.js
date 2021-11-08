import { TodoAPI } from './api.js';
const View = (() => {
    const domstr = {
        table: '#table',
        regionfilter: '#regionfilter',
        modelfilter: '#modelfilter'
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
    const createTheFilter = arr => {
        let tmp = '';
        arr.forEach(ele => {
            tmp += `<option value=${ele.option}>
                    ${ele.option}
                </option>`
        });
        return tmp;
    }

    return {
        render,
        createTheTmp,
        domstr,
        createTheFilter
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
    class StateRegion {
        #region = [];
        constructor() { }

        get region() {
            return this.#region;
        }
        set region(newarr) {
            this.#region = newarr;
            const tmp = view.createTheFilter(this.#region);
            const element = document.querySelector(view.domstr.regionfilter);
            view.render(element, tmp);
        }
    }
    class StateModel {
        #model = [];
        constructor() { }

        get model() {
            return this.#model;
        }
        set model(newarr) {
            this.#model = newarr;
            const tmp = view.createTheFilter(this.#model);
            const element = document.querySelector(view.domstr.modelfilter);
            view.render(element, tmp);
        }
    }

    const getAllTodos = api.getAllTodos;
    const getAllRegionFilter = api.getAllRegionFilter;
    const getAllModelFilter = api.getAllModelFilter;
    return {
        getAllModelFilter,
        getAllRegionFilter,
        StateRegion,
        StateModel,
        getAllTodos,
        State,
    }
})(TodoAPI, View);

const Controler = ((view, model) => {
    const state = new model.State();
    const stateRegion = new model.StateRegion();
    const stateModel = new model.StateModel();
    const inittodolist = () => {
        stateRegion.region = model.getAllRegionFilter;
        stateModel.model = model.getAllModelFilter;
        state.todolist = model.getAllTodos;
    }
    const changeRegionFilter= () => {
        let input = document.querySelector(view.domstr.regionfilter);
        input.addEventListener('change', event => {
            console.log(input.value);
            if (input.value === 'all') {
                state.todolist = model.getAllTodos;
            } else {
                state.todolist = model.getAllTodos;
                state.todolist = state.todolist.filter(ele => ele.region === input.value);
            }
        })
    }
    const changeModelFilter= () => {
        let input = document.querySelector(view.domstr.modelfilter);
        input.addEventListener('change', event => {
            if (input.value === 'all') {
                state.todolist = model.getAllTodos;
            } else {
                state.todolist = model.getAllTodos;
                state.todolist = state.todolist.filter(ele => ele.model === input.value);
            }
        })

    }
    const init = () => {inittodolist();changeRegionFilter(),changeModelFilter()};
    return {init};
})(View, Model);

Controler.init();
