import React, {useState} from 'react';
import InputBox from './components/InputBox.jsx';
import PieChart from './components/PieChart.jsx';
import BarGraph from './components/BarGraph.jsx';
import './styles.css'; 

const App = () => {
    const [data, setData] = useState(null);

    const handleDataUpdate = (newData) => {
        setData(newData);
    };
    
    
    return (
        <div className ='App'>
            <h1>What am I paying for?</h1>
            <InputBox onDataUpdate={handleDataUpdate} />
            {data && <PieChart data={data} />}
            {data && <BarGraph data={data} />}
        </div>
    );
};


export default App;