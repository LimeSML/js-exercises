
/**
 * 指定された時間後に解決される Promise を返す
 * @param  {number}   msec    - 返り値の Promise を解決するまで待つ時間 (ミリ秒)
 * @return {Promise}  Promise - 指定時間後に解決される Promise
 */
function wait(msec) {
    return new Promise((resolve) => setTimeout(resolve, msec));
}

// 0, 1, 2, 3 秒待つ
const wait0 = () => wait(0);
const wait1 = () => wait(1000);
const wait2 = () => wait(2000);
const wait3 = () => wait(3000);

// ログ出力
const log = (v) => console.log(v);
const logA = (v) => console.log("A");
const logB = (v) => console.log("B");
const logC = (v) => console.log("C");

// 例外
const errX = () => {
    throw new Error("X");
};
const errY = () => {
    throw new Error("Y");
};

async function h1() {
    // 解答:
    // 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
    // wait3() の解決後に logA が実行され、await wait2() の解決後 (2秒後に B 出力) に logB が実行され、
    // await wait1() の解決後 (1秒後に C 出力) に logC が実行されるため。
    //
    // 図解:
    //  wait3
    // |---------------|
    //                  logA
    //                 |-|
    //                    wait2
    //                   |----------|
    //                               logB
    //                              |-|
    //                                wait1
    //                                |-----|
    //                                      logC
    //                                      |-|

    try {
        await wait3();
        logA();
        await wait2();
        logB();
        await wait1();
        logC();
    } catch (e) {
        log(e.message);
    }
}

function h2() {
    // NOTE: h3 との比較用
    // 解答:
    // すぐに X が出力される。
    // new Promise のコールバック関数内で errX() が実行される。この例外は Promise の reject として扱われ、キャッチされる。
    //
    // 図解:
    // errX
    // |-|
    //   catch
    //   |-|

    new Promise(() => {
        errX();
    }).catch((e) => log(e.message));
}

function h3() {
    // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
    // 解答:
    // すぐに Error: X が出力される。
    // new Promise に渡した async 関数の中で例外が発生しても、
    // Promise の reject として扱われず、キャッチされない。
    //
    // 図解:
    // errX
    // |-|


    new Promise(async () => {
        errX();
    }).catch((e) => log(e.message));
}
// h3();

async function h4() {
    // NOTE: 2つの例外は両方 catch できるか？
    // 解答:
    // すぐに Error: Y が出力される。
    // p1 と p2 は同期的に処理が始まる。await p1 で wait2() の解決を待つ間に、p2 の wait1() が解決され、errY() が実行される。
    // この例外はキャッチされない。
    //
    // 図解:
    // wait2
    // |----------|
    // wait1
    // |-----|
    //       errY
    //       |-|

    try {
        const p1 = wait2().then(() => {
            errX();
        });
        const p2 = wait1().then(() => {
            errY();
        });
        await p1;
        await p2;
    } catch (e) {
        log(e.message);
    }
}
h4();