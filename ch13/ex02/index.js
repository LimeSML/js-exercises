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

function f1() {
  // NOTE: f2 との比較用 (注: () => wait(...) は () => { return wait(...); } と同じことに注意
  //
  // 回答:
  // 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
  //
  // 説明:
  // wait3 の解決後に logA が実行され、wait2().then(logB) の解決後 (2秒後に B 出力) に wait1().then(logC) が実行されるため。
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
  //                                 wait1
  //                                |-----|
  //                                       logC
  //                                      |-|
  wait3()
    .then(logA)
    .then(() => wait2().then(logB))
    .then(() => wait1().then(logC));
}

function f2() {
  // NOTE: 2つ目の then の中で return が無くなっていることに注意 (典型的なミス)
  //
  // 解答例:
  // 3秒後に A が出力され、その1秒後に C が出力され、その1秒後に B が出力される。
  // 2つ目の .then のコールバック関数が値を return していないため、この .then が返す Promise は即解決される。
  // このため logA() の実行すぐ後に wait1().then(...) が実行され C が先に出力される。
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
  //                  wait1
  //                 |-----|
  //                        logC
  //                       |-|
  wait3()
    .then(logA)
    .then(() => {
      wait2().then(logB);
    })
    .then(() => wait1().then(logC));
}

function f3() {
  // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
  //
  // 解答:
  // まず C が出力され、そのまたすぐに A が出力され、最後に例外が発生する。
  // 同期の finally で logC() が実行さる。その後、wait(0) が即解決され、logA() が実行される。
  // その後、errX() が実行されるが、この例外は try/catch でキャッチされない。
  //
  // 図解:
  // logC
  // |-|
  //    logA
  //    |-|
  //       errX (例外発生)
  //       (catch されない)
  try {
    wait(0).then(logA).then(errX);
  } catch (e) {
    logB();
  } finally {
    logC();
  }
}

function f4() {
  // NOTE: f5 との比較用
  //
  // 解答:
  // 2秒後に A が出力され、その1秒後に B が出力され、100 が出力される。
  // wait2() の解決後に logA() が実行され、wait(1000).then(logB()) の解決後 (1秒後に B 出力) に 100 が出力されるため。
  //
  // 図解:
  //  wait2
  // |----------|
  //            logA
  //            |-|
  //              wait1
  //              |-----|
  //                    logB
  //                    |-|
  //                      logv
  //                      |-----|
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then((value) =>
      wait(1000).then(() => {
        logB();
        return 100;
      }),
    )
    .then((v) => log(v));
}

function f5() {
  // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
  //
  // 解答:
  // 1秒後に B が出力され、その1秒後に A が出力され、40 が出力される。
  // 2つ目の then に関数ではなく Promise が渡されているため、wait2() の解決とは独立して wait1() が開始され、解決後に logB() が実行される。
  // wait2() の解決後に logA() が実行され、最後に 40 が出力される。
  //
  // 図解:
  // wait2
  // |----------|
  //            logA
  //            |-|
  //              logv
  //              |-|
  // wait1
  // |-----|
  //       logB
  //       |-|

  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then(
      wait1().then(() => {
        logB();
        return 100;
      }),
    )
    .then((v) => log(v));
}

function f6() {
  // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか
  //
  // 解答:
  // 1秒後に A が出力され、その1秒後に B が出力され、その1秒後に C が出力される。
  // wait1() の解決後に logA() が実行され、wait1() と wait2() が並行して開始される。1秒後に logB() が実行され、その1秒後に logC() が実行されるため。
  //
  // 図解:
  // wait1
  // |-----|
  //       logA
  //       |-|
  //       wait1
  //       |-----|
  //             logB
  //             |-|
  //       wait2
  //       |----------|
  //                  logC
  //                  |-|

  const p = wait1().then(logA);
  p.then(() => wait1()).then(logB);
  p.then(() => wait2()).then(logC);
}

function f7() {
  // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
  // (= 解決済みの Promise の then を呼び出すとどうなるか)
  //
  // 解答:
  // 1秒後に A が出力され、その1秒後に B が出力され、その後に C が出力される。
  // wait1() の解決後に logA() が実行される。
  // wait2() は wait1() の解決とは独立して開始されるが、p はすでに解決済みなので、wait2() の解決後に logB() が実行され、その後に logC() が実行される。
  //
  // 図解:
  // wait1
  // |-----|
  //       logA
  //       |-|
  // wait2
  // |----------|
  //             logB
  //             |-|
  //               logC
  //               |-|

  const p = wait1().then(logA);
  wait2()
    .then(() => {
      return p.then(logB);
    })
    .then(logC);
}

function f8() {
  // NOTE: f9, f10 との比較用
  //
  // 解答:
  // 1秒後に X が出力され、その後に A が出力される。
  // wait1() の解決後に errX() が実行される。 この例外は catch でキャッチされ、エラーメッセージが出力される。
  // その後、finally で logA() が実行される。
  //
  // 図解:
  // wait1
  // |-----|
  //       errX
  //       |-|
  //          catch
  //          |-|
  //             finally
  //             |-|

  wait1()
    .then(errX)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f9() {
  // NOTE: f10 との比較用
  //
  // 解答:
  // 1秒後に Y が出力され、その後に A が出力される。
  // wait1() の解決後に () => 42 が即解決される。
  // そして、errY() が実行される。 この例外は catch でキャッチされ、エラーメッセージが出力される。
  // その後、finally で logA() が実行される。
  //
  // 図解:
  // wait1
  // |-----|
  //       errY
  //       |-|
  //          catch
  //          |-|
  //             finally
  //             |-|

  wait1()
    .then(() => 42)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f10() {
  // NOTE: then(r, c) と then(r).catch(c) は等しいか？
  //
  // 解答:
  // 1秒後に Y が出力され、その後に Error: Y が出力される。
  // wait1() の解決後に () => 42 が即解決される。
  // そして、errY() が実行される。 この例外は catch でキャッチされず、finally で logA() が実行される。
  //
  // 図解:
  // wait1
  // |-----|
  //       errY
  //       |-|
  //          logA
  //          |-|

  wait1()
    .then(() => 42)
    .then(errY, (e) => log(e.message))
    .finally(logA);
}

function f11() {
  // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
  //
  // 解答:
  // すぐに X が出力される。
  // new Promise のコールバック関数内で errX() が実行される。この例外は Promise の reject として扱われ、キャッチされる。
  //
  // 図解:
  // errX
  // |-|
  //   catch
  //   |-|

  new Promise((resolve, reject) => {
    errX();
  }).catch((e) => log(e.message));
}

function f12() {
  // new Promise 内だがコールバック関数で throw した場合は？
  //
  // 解答:
  // すぐに Error: X が出力される。
  // new Promise のコールバック関数内で setTimeout のコールバック関数内で errX() が実行される。
  // この例外は Promise の reject として扱われず、キャッチされない。
  //
  // 図解:
  // errX
  // |-|

  new Promise((resolve, reject) => {
    setTimeout(() => errX(), 0);
  }).catch((e) => log(e.message));
}

f12();
