
export const reducer = (state, action) => {


    switch (action.type) {

        
        case 'ADD_GROUP_NAME':

            const newGroup = state ? [
                ...state.items,
                {
                    name: action.payload,
                    color: action.colorPayload,
                    tasks: [],
                }] : [
                {
                    name: action.payload,
                    color: action.colorPayload,
                    tasks: [],
                }]

            return {
                ...state,
                items: newGroup
            }

        case 'DELETE_GROUP':

            return {
                ...state,
                items: state.items.filter((obj, index) => index !== action.payload)
            }

        case 'ADD_TASK': 

        
        return {
            ...state,
            items: [...state.items,state.items[action.payload].tasks.push({
                name: action.text,
                completed:false
            })]

        }

        default: return state
    }
}