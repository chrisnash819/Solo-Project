import React, {useState} from 'react';
import InputBox from './components/InputBox.jsx';
import PieChart from './components/PieChart.jsx';

const App = () => {
    const [data, setData] = useState(null);

    const handleDataUpdate = (newData) => {
        setData(newData);
    };
    
    
    return (
        <div className ='App'>
            <h1>Tax App</h1>
            <InputBox onDataUpdate={handleDataUpdate} />
            {data && <PieChart data={data} />}
        </div>
    );
};


export default App;