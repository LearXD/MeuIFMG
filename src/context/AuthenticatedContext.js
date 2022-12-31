
import { createContext, useReducer } from "react";

const context = createContext({})

export const AuthenticatedProvider = (props) => {
    const data = props.route.params;

    const reducer = (state) => {
        return state;
    }

    const [state, dispatch] = useReducer(reducer, {
        token: data?.token || undefined,
        navigation: props.navigation,
        profile: {
            image: undefined,
            registration: data?.registration || undefined,
            name: undefined
        },
        historic: {},
        subjects: []
    })

    return (
        <context.Provider value={{state, dispatch}}>
            { props.children }
        </context.Provider>
    )
}

export default context;