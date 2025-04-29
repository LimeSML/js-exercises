try {
    console.log('try block');
    debugger;
    throw new Error();
} catch(e) {
    console.log('catch block');
} finally {
    console.log('finally block');
}

// try block
// catch block
// finally block