import React, {useState} from 'react';

function InputBox({onDataUpdate}) {
    const [location,setLocation] = useState('');
    const [income, setIncome] = useState('');

    const handleSubmit = () => {
        const newData = {location, income};//update with fetching logic
        event.preventDefault();
        const exampleData = [
            { name: 'Federal', value: 66, subcategories:[
                { name: 'Social Security', value: 40 },
                { name: 'Medicare', value: 60 }
            ] },
            { name: 'State', value: 34, subcategories:[
                { name: 'Education', value: 50 },
                { name: 'Healthcare', value: 50 }
            ] },
            // { name: 'Local', value: 0, subcategories:[
            //     { name: 'Sales Tax', value: 0 }
            // ] },
            // {name: 'other', value: 1, subcategories:[
            //     { name: 'miscellaneous', value: 1 }
            // ] },
        ]
        onDataUpdate(exampleData);
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
              type= "text"
              placeholder= "Enter city"
              value={location}
              onChange={ (e) => setLocation(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Enter income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              required
            />
            <button type ="submit">Submit</button>
        </form>
    );
}


export default InputBox;