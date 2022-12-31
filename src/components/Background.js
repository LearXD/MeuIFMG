import { ImageBackground } from "react-native"

export default ({style, children}) => {
    return (
        <ImageBackground 
        imageStyle={{ opacity: 0.08 }}
        source={require('../../assets/images/bck2.png')} 
        style={[style]}>
            {children}
        </ImageBackground>
    )
}
