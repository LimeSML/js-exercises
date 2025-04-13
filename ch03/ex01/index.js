const nonFiniteValues = [-Infinity, Infinity, NaN];

for (const outerValue of nonFiniteValues) {
    for (const innerValue of nonFiniteValues) {
        console.log(`${outerValue} + ${innerValue} = ${outerValue + innerValue}`);
    }
}

for (const outerValue of nonFiniteValues) {
    for (const innerValue of nonFiniteValues) {
        console.log(`${outerValue} - ${innerValue} = ${outerValue + innerValue}`);
    }
}

for (const outerValue of nonFiniteValues) {
    for (const innerValue of nonFiniteValues) {
        console.log(`${outerValue} * ${innerValue} = ${outerValue + innerValue}`);
    }
}

for (const outerValue of nonFiniteValues) {
    for (const innerValue of nonFiniteValues) {
        console.log(`${outerValue} / ${innerValue} = ${outerValue + innerValue}`);
    }
}