export const goBackToLogin = (navigation) => {
    navigation.pop();
    navigation.navigate("Login");
}

export const arrayRand = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}