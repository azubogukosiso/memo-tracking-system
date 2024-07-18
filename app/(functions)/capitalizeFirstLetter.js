export const capitalizeFirstLetter = (str) => {
    console.log("this is the str: ", str);
    if (!str || str.length === 0 || !str.charAt(0).match(/^[a-zA-Z]+$/)) {
        console.log("test failed");
        return str
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}