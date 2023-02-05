import React, { useState, useRef, useEffect } from 'react';
import styles from './select.module.css';

export type SelectOption = {
    label: string,
    value: any
};

type MultipleSelectProps = {
    value: SelectOption[]
    onChange: (value: SelectOption[]) => void,
    multiple: true
};

type SingleSelectProps = {
    value?: SelectOption, // ? means that is optional field same as : value: SelectOption | undefined
    onChange: (value: SelectOption | undefined) => void,
    multiple?: false
};

type SelectProps = {
    options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps);

export function Select({ multiple, value, onChange, options }: SelectProps) {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ hightlightedIndex, setHightlightedIndex ] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleSelect = () => { 
        setIsOpen(previousValue => !previousValue);
        setHightlightedIndex(0);
    };

    const closeSelect = () => {
        setIsOpen(false);
        setHightlightedIndex(0);
    };

    const clearOptions = (e: any) => {
        e.stopPropagation(); // robi tak ze nie zostaje wywolywana akcja w parencie, czyli toggleSelect - po wykonaniu clearOptions jest koniec
        multiple ? onChange([]) : onChange(undefined);
    };

    const selectOption = (option: SelectOption) => {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter(item => item !== option))
            } else {
                onChange([...value, option]);
            }
        } else {
            onChange(option);
        }

        closeSelect();
    };

    const isOptionSelected = (option: SelectOption) => {
        return multiple ? value.includes(option) : option === value;
    };

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target != containerRef.current) return;

            switch (e.code) {
                case 'Enter':
                case 'Space':
                    setIsOpen(previousValue => !previousValue);
                    if (isOpen) selectOption(options[hightlightedIndex]);
                    break;
                case 'ArrowUp':
                case 'ArrowDown': {
                    if (!isOpen) {
                        setIsOpen(true);
                        break;
                    }

                    const newValue = hightlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
                    if (newValue >=0 && newValue < options.length) {
                        setHightlightedIndex(newValue);
                    }
                    break;
                }
                case 'Escape':
                    setIsOpen(false);
                    break;
            }
        };
        containerRef.current?.addEventListener('keydown', handler);

        return () => {
            containerRef.current?.removeEventListener('keydown', handler);
        }
    }, [isOpen, hightlightedIndex, options]);

    return (
        <div ref={containerRef} tabIndex={0} className={styles.container} onClick={toggleSelect} onBlur={closeSelect}>
            <span className={styles.value}>
                {multiple ?
                    value.map(item => 
                        <button 
                            key={item.value}
                            className={styles['option-badge']}
                            onClick={e => {
                                e.stopPropagation();
                                selectOption(item);
                            }}
                        >
                            {item.label}
                            <span className={styles['remove-btn']}>&times;</span>
                        </button>
                    )
                :
                    value?.label
                }
            </span>
            <button className={styles['clear-btn']} onClick={clearOptions}>&times;</button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>
            <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
                {options.map((option, index) => (
                    <li 
                        key={index} 
                        className={
                            `
                                ${styles.option} 
                                ${isOptionSelected(option) ? styles.selected : ''} 
                                ${index === hightlightedIndex ? styles.highlighted : ''}
                            `
                        }
                        onClick={e => {
                            e.stopPropagation();
                            selectOption(option);
                        }}
                        onMouseEnter={() => setHightlightedIndex(index)}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}
