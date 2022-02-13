import _ from 'lodash';

const defaults = {
    items: [{
        id: 1,
        name: "first item",
        description: "lorem ipsum"
    },
    {
        id: 2,
        name: "second item",
        description: "lorem ipsum 2"
    }],
    users: [{
        id: 1,
        username: "admin",
        password: "passwordSegreta"
    }]
};


const collection = (arrayDefault) => {
    let array = _.cloneDeep(arrayDefault);
    return {
        list: () => array,
        insert: (element) => array.push(element),
        delete: (id) => _.remove(array, (i) => i.id.toString() === id),
        update: (id, element) => {
            const index = _.findIndex(array, (i) => i.id.toString() === id);
            if (index != -1) {
                array[index] = _.merge(array[index], _.omit(element, 'id'));
            } else {
                throw "Item not found";
            }
        },
        reset: () => array = _.cloneDeep(defaultItems)
    }
}

export const db = {
    items: collection(defaults.items),
    users: collection(defaults.users),
}