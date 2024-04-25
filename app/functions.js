// GENERATING A MEMO TRACKING NUMBER
export const generateMemoTN = () => {
    let memoTN = "";
    for (let i = 0; i < 15; i++) {
        const randomInteger = Math.floor(Math.random() * 10);

        memoTN += randomInteger.toString();
    }

    return memoTN;
}