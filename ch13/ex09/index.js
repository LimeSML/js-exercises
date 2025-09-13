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

async function i1() {
    // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
    //
    // 解答:
    // 1秒後に 42 が出力され、その2秒後に 100 が出力される。
    // wait1() の解決後に 42 が v に代入され、await Promise.any(...) の解決後 (1秒後に 42 出力) に log(v) が実行される。
    // その後 await wait2() の解決後 (2秒後に 100 出力) に log(v) が実行されるため。
    //
    // 図解:
    //  wait1
    // |-----|
    //       v = 42
    //       |-|
    // wait2
    // |----------|
    //            v = 100
    //            |-|
    //         log 42
    //         |-|
    //           wait2
    //           |----------|
    //                      log 100
    //                      |-|

    let v = 0;

    v = await Promise.any([
        wait1().then(() => 42),
        wait2()
            .then(() => (v = 100))
            .then(() => 0),
    ]);

    log(v);
    await wait2();
    log(v);
}

async function i2() {
    // 解答:
    // 1秒後に C が出力され、その1秒後に B が出力され、その1秒後に A が出力される。
    // その後すぐに [ 'A', 'B', 'C' ] が出力される。
    // Promise.all の引数の配列内で wait1() → logC、wait2() → logB、wait3() → logA の順に実行される。
    // Promise.all の全ての Promise が解決された後に log(v) が実行される。
    //
    // 図解:
    //  wait3
    // |---------------|
    //                 logA
    //                 |-|
    // wait2
    // |----------|
    //            logB
    //            |-|
    // wait2
    // |-----|
    //       logC
    //       |-|
    //                 log v
    //                 |-|

    const v = await Promise.all([
        wait3().then(() => {
            logA();
            return "A";
        }),
        wait2().then(() => {
            logB();
            return "B";
        }),
        wait1().then(() => {
            logC();
            return "C";
        }),
    ]);
    log(v);
}

async function i3() {
    // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
    // 解答:
    // 1秒後に Y が出力され、その後に 42 が出力され、その1秒後に B が出力され、その2秒後に 0 が出力される。
    // Promise.all の引数の配列内で wait1() → errY()、wait2() → logB、wait3() → errX() の順に実行される。
    // errY() の例外は Promise の reject として扱われ、catch でキャッチされるため、1秒後に Y が出力される。
    // その後 v の値は変更されていないので 42 が出力される。
    // wait2() の解決後 (1秒後に B 出力) に logB が実行され、その後 await wait3() の解決後 (2秒後に 0 出力) に log(v) が実行されるため。
    //
    // 図解:
    //  wait3
    // |---------------|
    //                  v = 0
    //                  errX
    //                  |-|
    // wait2
    // |----------|
    //            logB
    //            |-|
    // wait1
    // |-----|
    //       errY
    //       |-|
    //         catch
    //         |-|
    //           wait3
    //           |---------------|
    //                           log v
    //                           |-|
    let v = 42;
    try {
        await Promise.all([
            wait3().then(() => {
                v = 0;
                errX();
            }),
            wait2().then(() => {
                logB();
                return "B";
            }),
            wait1().then(() => {
                errY();
            }),
        ]);
    } catch (e) {
        log(e.message);
        log(v);
        await wait3();
        log(v);
    }
}

async function i4() {
    // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
    // 解答:
    // 10 が出力される。
    // p1 と p2 が同時に開始され、p1 の await wait1() の解決後に for 文のループが始まる。
    // その後 p1 と p2 が交互に await wait2() の解決後に v++ を実行するため、最終的に v の値は 10 になる。
    //
    // 図解:
    //  p1         p2
    //  |           |
    // wait1       |
    // |-----|
    //       wait2
    //       |----------|
    //                  v++
    //                  |-|
    //                    wait2
    //                    |----------|
    //                               v++
    //                               |-|
    // ・・・
    //
    // wait2
    // |----------|
    //            v++
    //            |-|
    //              wait2
    //              |----------|
    //                         v++
    //                         |-|
    // ・・・

    let v = 0;

    const p1 = async () => {
        await wait1();
        for (let i = 0; i < 5; i++) {
            await wait2();
            v++;
        }
    };

    const p2 = async () => {
        for (let i = 0; i < 5; i++) {
            await wait2();
            v++;
        }
    };

    await Promise.all([p1(), p2()]);
    log(v);
}
