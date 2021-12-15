
export const reducer = (state, action) => {


    switch (action.type) {

        case 'ADD_GROUP':

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

        const newItem = {
            name: action.text,
            completed:false
        }

        return {
            ...state,
            items: state.items.map((obj, index)=>{
                return (
                    {
                        ...obj,
                        tasks: action.payload === index ? [...obj.tasks, newItem] : obj.tasks
                    }
                )
            })
        }

        case 'DELETE_TASK':
            return {
                ...state,
                items: state.items.map((obj, index)=>{
                    return (
                        {
                            ...obj,
                            tasks: obj.tasks.filter((el,index)=>`${el.name}_${index}_${obj.name}`!==action.payload)
                        }
                    )
                })
            }
        
        case 'COMPLETE_TASK': 
        return {
            ...state,
            items: state.items.map((obj, index)=>{
                return (
                    {
                        ...obj,
                        tasks: obj.tasks.map((el, index)=>{
                            return ({
                                ...el,
                                completed: `${el.name}_${index}_${obj.name}` === action.payload ? !el.completed:el.completed
                            })
                        })
                    }
                )
            })
        }

        default: return state
    }
}