import React, { useState } from 'react';
import { Select, SelectOption } from './Select';

const options = [
    { label: 'Banan', value: 1 },
    { label: 'Jabłko', value: 2 },
    { label: 'Cytryna', value: 3 },
    { label: 'Kiwi', value: 4 },
    { label: 'Mango', value: 5 },
    { label: 'Arbuz', value: 6 }
];

function App() {
    const [ value1, setValue1 ] = useState<SelectOption | undefined>();
    const [ value2, setValue2 ] = useState<SelectOption[]>([]);

    return (
        <main>
            <Select options={options} value={value1} onChange={option => setValue1(option)} />
            <Select multiple options={options} value={value2} onChange={option => setValue2(option)} />
        </main>
    );
}

export default App
