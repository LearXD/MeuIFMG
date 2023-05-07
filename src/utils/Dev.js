export default {
    env: {
        mode: 'production',
        modes: {
            dev: {
                initialScreen: 'Loading',
                authInitialScreen: 'Situation'
            },
            production: {
                initialScreen: 'Loading',
                authInitialScreen: 'Home'
            }
        }
    }
}