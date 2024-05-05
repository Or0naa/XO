import X_index from '../XO/X_index'
import O_index from '../XO/O_index'
import styles from './style.module.scss';
import { useState } from 'react';

export default function Square({ }) {
    const [value, setValue] = useState("");

    const handleValue = () => {
        setValue("X")
        console.log("nhjcgh")
    }

    return (
        <button onClick={handleValue} className={styles.square_frame}>
            {value == 'X' ? <X_index /> : value == 'O' ? <O_index /> : ""}
        </button>
    )
}
