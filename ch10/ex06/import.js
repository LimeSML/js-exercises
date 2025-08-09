console.log('--- Start ---');

console.log('Before first import');
import './export.js';

console.log('Between imports');
import './export.js';

console.log('After second import');

console.log('--- End ---');

// imported!
// --- Start ---
// Before first import
// Between imports
// After second import
// --- End ---