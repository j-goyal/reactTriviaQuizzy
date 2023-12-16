export const CalculatePercentage = (remainingTime, totalTime) => {
    return (remainingTime / totalTime) * 100;
};


export const GenerateUniqueRandomNumber = (min, max, previousRandomNumber, recursionLimit = 10) => {
    if (recursionLimit === 0) {
        console.error("Recursion limit reached in generateRandomNumber");
        return min;
    }

    const newRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return newRandomNumber !== previousRandomNumber ? newRandomNumber : generateRandomNumber(min, max, previousRandomNumber, recursionLimit - 1);
};
