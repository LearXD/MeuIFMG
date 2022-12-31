export default {
    env: {
        mode: 'production',
        modes: {
            dev: {
                initialScreen: 'Teste',
                authInitialScreen: 'Home'
            },
            production: {
                initialScreen: 'Loading',
                authInitialScreen: 'Home'
            }
        }
    }
}