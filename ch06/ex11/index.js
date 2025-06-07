export const p = {
    r: 0,
    theta: 0,

    get x() {
        return this.r * Math.cos(this.theta);
    },
    set x(value) {
        if (isNaN(value)) {
            throw new Error('x must not be NaN');
        }
        const y = this.r * Math.sin(this.theta); // 変更前の y を保存
        this.r = Math.sqrt(value ** 2 + y ** 2);
        this.theta = Math.atan2(y, value);
    },

    get y() {
        return this.r * Math.sin(this.theta);
    },
    set y(value) {
        if (isNaN(value)) {
            throw new Error('y must not be NaN');
        }
        const x = this.r * Math.cos(this.theta); // 変更前の x を保存
        this.r = Math.sqrt(x ** 2 + value ** 2);
        this.theta = Math.atan2(value, x);
    }
}

// p.r = 5;
// p.theta = Math.PI / 4;
// console.log(p.x, p.y);

// p.x = 3;
// console.log(p.r, p.theta);