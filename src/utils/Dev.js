export default {
    env: {
        mode: 'production',
        modes: {
            dev: {
                initialScreen: 'Authenticated',
                authInitialScreen: 'Situation'
            },
            production: {
                initialScreen: 'Loading',
                authInitialScreen: 'Home'
            }
        }
    }
}