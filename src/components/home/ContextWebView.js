import { useState } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
import LoadingScreen from "../LoadingScreen";

const url = "https://meu.ifmg.edu.br/EducaMobile/Educacional/EduContexto/GetContextoAluno"

export default ({ onEndSession }) => {

    const [loading, setLoading] = useState(true)
    let webView;

    return (
        <View style={{ flex: 1, backgroundColor: '#fdfffd' }}>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 2 }}>
                <WebView
                    ref={(instance) => webView = instance}
                    scalesPageToFit={false}
                    onLoadStart={() => {
                        setLoading(true)
                    }}
                    onLoadEnd={() => {
                        webView.injectJavaScript(`
                        if(!document.querySelector('#cbSalvarContexto').clicked) {
                            document.querySelector('#cbSalvarContexto').clicked = true
                            document.querySelector('#cbSalvarContexto').click()
                        }
                        `)
                        setLoading(false)
                    }}
                    source={
                        {
                            uri: url,
                        }
                    }
                    onShouldStartLoadWithRequest={(response) => {
                        if (response.url != url) {
                            onEndSession && onEndSession()
                        }
                        return true;
                    }}

                />
            </View>

            <View style={{ flex: 1 }}></View>
             {loading && (<LoadingScreen message={"Carregando Opções..."} />)}
            
        </View>

    )
}