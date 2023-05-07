
import { createContext, useReducer } from "react";
import { Modal, StatusBar } from "react-native";
import LoadingScreen from "../components/LoadingScreen";
import Colors from "../utils/Colors";

const context = createContext({})

export const AuthenticatedProvider = (props) => {
    const data = props.route.params;

    const reducer = (oldState, newState) => {
        return newState || oldState;
    }

    const [state, dispatch] = useReducer(reducer, {
        token: data?.token || undefined,
        navigation: props.navigation,
        profile: {
            image: undefined,
            registration: data?.registration || undefined,
            name: undefined
        },
        loading: false,
        loadingMessage: "Carregando..."
    })

    const setLoading = (message) => {
        dispatch({
            ...state,
            loading: true,
            loadingMessage: message
        })
        // GET STATUS BAR COLOR
        StatusBar.setBackgroundColor("#113e18");

        return () => {
            StatusBar.setBackgroundColor(Colors.primary);
            dispatch({
                ...state,
                loading: false
            })
        }
    }

    return (
        <context.Provider value={{state, dispatch, setLoading}}>

            <Modal transparent={true} visible={state.loading}>
                <LoadingScreen message={state.loadingMessage} />
            </Modal>

            { props.children }
            
        </context.Provider>
    )
}

export default context;