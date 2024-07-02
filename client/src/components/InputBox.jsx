import React, {useState} from 'react';
import stateTaxBurden from '../../../server/taxRates/stateTaxBurden.json';

function InputBox({onDataUpdate}) {
    const [selectedState, setSelectedState] = useState('');
    const [income, setIncome] = useState('');

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        const response = await fetch('http://localhost:3000/calculate-taxes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedState, income: parseFloat(income) }),
        });
        const taxData = await response.json();
        onDataUpdate(taxData);
        
       
        


        
    };

    // const calculateTaxData = (selectedState, income) => {
    //     const selectedStateTaxBurden = parseFloat(stateTaxBurden.find(obj => obj.abbreviation === selectedState)?.rate)/100;
    //     console.log(selectedStateTaxBurden);
    //     const userIncomeBracket = parseFloat(fedIncomeTaxBracket.find(obj => income >= obj.income[0] && income < obj.income[1])?.bracket)/100;
    //     console.log(userIncomeBracket);
    //     //const totalTaxRate = selectedStateTaxBurden + userIncomeBracket;
    //     const stateTaxesPaid = income * selectedStateTaxBurden;
    //     const fedTaxesPaid = income * userIncomeBracket;
    //     const incomeAfterTax = income - stateTaxesPaid - fedTaxesPaid;
    //     return {
    //         inner:[
    //                     { name: 'Federal', value: 66 },
    //                     { name: 'State', value: 34},
    //                     ],
    //         outer: [
    //                     { name: 'Social Security', value: 40 },
    //                     { name: 'Medicare', value: 26 },
    //                     { name: 'Education', value: 0 },
    //                     { name: 'Healthcare', value: 34 }
    //                 ],
    //         percentTaxed: [
    //                     {name: 'Income After Tax', value: incomeAfterTax},
    //                     {name: 'State Taxes Paid', value: stateTaxesPaid},
    //                     {name: 'Federal Taxes Paid', value: fedTaxesPaid}
    //                 ]

    //     }
    // }



    return (
        <form onSubmit={handleSubmit}>
            <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                required
            >
                <option value="">Select your state</option>
                {stateTaxBurden.map((state) => (
                    <option key={state.abbreviation} value={state.abbreviation}>
                        {state.name} {state.abbreviation}
                    </option>
                ))}
            </select>
            <input
              type="number"
              placeholder="Income (Ex: 50,000)"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              required
            />
            <button type ="submit">Submit</button>
        </form>
    );
}


export default InputBox;