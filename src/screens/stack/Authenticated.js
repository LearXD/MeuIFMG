import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthenticatedProvider } from '../../context/AuthenticatedContext'
import Dev from '../../utils/Dev';
import Historic from './Historic';

import Home from './Home';
import Activities from './Activities';
import { useEffect } from 'react';

import { registerBackPressHandler } from '../../events/EventHandler';
import AcademicSituation from './AcademicSituation';

const {Navigator, Screen} = createNativeStackNavigator();

export default (props) => {

    useEffect(() => {
        registerBackPressHandler();
    }, [])

    return (<AuthenticatedProvider {...props}>
        
        <Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={Dev.env.modes[Dev.env.mode].authInitialScreen}>
            <Screen name="Home" component={Home} options={{animation: 'slide_from_bottom'}}/>
            <Screen name="Historic" component={Historic} options={{animation: 'slide_from_right'}}/>
            <Screen name="Activities" component={Activities} options={{animation: 'slide_from_right'}}/>
            <Screen name="Situation" component={AcademicSituation} options={{animation: 'slide_from_right'}}/>
            {/* <Screen name="Teste" component={Test}/> */}
        </Navigator>
    </AuthenticatedProvider>)
}