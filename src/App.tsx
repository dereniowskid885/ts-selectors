import React, { useState } from 'react';
import { Select } from './Select';

const options = [
    { label: 'Banan', value: 1 },
    { label: 'Jabłko', value: 2 },
    { label: 'Cytryna', value: 3 },
    { label: 'Kiwi', value: 4 },
    { label: 'Mango', value: 5 },
    { label: 'Arbuz', value: 6 }
];

function App() {
    const [ value, setValue ] = useState(options[0]);

    return (
        <main>
            <Select options={options} value={value} />
        </main>
    );
}

export default App
