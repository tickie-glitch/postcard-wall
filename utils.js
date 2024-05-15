export function getRandomBetween(min, max) {
    return Math.random() * (max - min) + min;
}


export function getRandomRotation() {
    return getRandomBetween(-6, 6);
}

export function getRandomPosition() {
    const x = getRandomBetween(0, window.innerWidth - 621); // 621 is the width of the image
    const y = getRandomBetween(0, window.innerHeight - 382); // 382 is the height of the image
    return { x, y };
}