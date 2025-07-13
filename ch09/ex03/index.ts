export function PositiveNumber(x: number) {
    if (x <= 0) {
        throw new Error("require : x > 0");
    }

    return {
        getX: () => {
            return x;
        },
        setX: (newX: number) => {
            if (newX <= 0) {
                throw new Error("require : x > 0");
            }
            x = newX;
        }
    }
}

const pn = PositiveNumber(10);
console.log(pn.getX()); // 10
pn.setX(20);
console.log(pn.getX()); // 20