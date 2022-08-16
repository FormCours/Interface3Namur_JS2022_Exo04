import { useId, useState } from 'react';
import operationEnum from '../../enums/operation-enum';
import style from './calculatrice.module.css';

const numberValidatorRegex = /^([0-9]+(\.[0-9]*)?)?$/;

const Calculatrice = () => {

    // • Bonne pratique pour les id dans JSX => Avoir des id uniques
    // Pour résoudre cela, il existe un hook pour générer l'id
    const idForm = useId();

    // • Le state (du form) de la calculatrice
    const [nb1, setNb1] = useState('');
    const [nb2, setNb2] = useState('');
    const [op, setOp] = useState('');
    const [result, setResult] = useState('');

    // • Fonction qui prend l'event de l'input et le setter du state
    // Si la valeur respect la regex, il utilise le setter
    const handleNumberInput = (e, setValue) => {
        const value = e.target.value.replace(',', '.');

        if (numberValidatorRegex.test(value)) {
            setValue(value);
        }
    };

    // • Fonction pour réaliser le calcule
    const handleSubmit = (e) => {
        e.preventDefault();

        // Convertion des valeurs
        const val1 = parseFloat(nb1);
        const val2 = parseFloat(nb2);

        // Calcul
        if (isNaN(val1) || isNaN(val2)) {
            setResult('Valeur invalide');
        }
        else if (op === operationEnum.plus) {
            setResult(val1 + val2);
        }
        else if (op === operationEnum.moins) {
            setResult(val1 - val2);
        }
        else if (op === operationEnum.multi) {
            setResult(val1 * val2);
        }
        else if (op === operationEnum.div) {
            if (val2 === 0) {
                setResult('Division par zéro! (╯°□°）╯︵ ┻━┻');
            }
            else {
                setResult(val1 / val2);
            }
        }
        else {
            setResult('Operation non suporté :o');
        }
    };

    return (
        <form className={style.calculatrice} onSubmit={handleSubmit}>
            <div>
                <label htmlFor={idForm + 'nb1'}>Nombre 1</label>
                <input id={idForm + 'nb1'} type='text'
                    value={nb1}
                    onChange={e => handleNumberInput(e, setNb1)} />
            </div>
            <div>
                <label htmlFor={idForm + 'op'}>Operation</label>
                <select id={idForm + 'op'}
                    value={op} onChange={e => setOp(e.target.value)}>
                    <option value='' disabled>Faites votre choix !</option>
                    <option value={operationEnum.plus}>+</option>
                    <option value={operationEnum.moins}>-</option>
                    <option value={operationEnum.multi}>x</option>
                    <option value={operationEnum.div}>/</option>
                </select>
            </div>
            <div>
                <label htmlFor={idForm + 'nb2'}>Nombre 2</label>
                <input id={idForm + 'nb2'} type='text'
                    value={nb2}
                    onChange={e => handleNumberInput(e, setNb2)} />
            </div>
            <div>
                <button type='submit'>Calculer</button>
                <input type='text'
                    value={result} readOnly />
            </div>
        </form>
    );
};

export default Calculatrice;