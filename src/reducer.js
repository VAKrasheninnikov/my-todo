
export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_GROUP_NAME':

            const newGroup = state ? [
                ...state.items,
                {
                    name: action.payload,
                    color: action.colorPayload,
                    tasks: [{
                        title: null,
                        completed: false,
                    }]
                }] : [
                {
                    name: action.payload,
                    color: action.colorPayload,
                    tasks: [{
                        title: null,
                        completed: false,
                    }]
                }]

            return {
                ...state,
                items: newGroup
            }
        
            
        default: return state
    }
}