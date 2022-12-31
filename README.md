# Gua útil para compilar/formatar o APP

## Mudar o package do app

<br>

Para mudar o package do seu app, siga os seguintes passos:

1. Abra o Visual Studio Code e pressione `CTRL + SHIFT + F` na pasta do projeto.
2. Pesquise por `package com.(nomeapp)` e substitua por `package com.(seunome).(appname)`.
3. Vá até a pasta `android/app/src` e mude as pastas dentro de `debug` e `main` para o novo package, respectivamente.

<br>

## Exemplo:

> Se o seu novo package for `me.learxd.app`, as pastas em `debug` e `main` devem ser mudadas para `me/learxd/app/(outros arquivos/pastas)`.

<br>

## Gerar APK ou AAB

Para gerar um APK ou AAB (Android App Bundle) do seu app, siga os seguintes passos:

| Para gerar um AAB:

1. Abra o terminal e vá até a pasta raiz do seu app com o comando `cd`.
2. Digite o comando `cd android && ./gradlew bundleRelease`.
3. O arquivo gerado estará na pasta `android/app/build/outputs/bundle/release`.

| Para gerar um APK:

1. Abra o terminal e vá até a pasta raiz do seu app com o comando `cd`.
2. Digite o comando `cd android && ./gradlew assembleRelease`.
3. O arquivo gerado estará na pasta `android/app/build/outputs/apk/release`.
