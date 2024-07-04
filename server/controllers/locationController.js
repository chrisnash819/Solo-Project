const stateTaxBurden = require('../taxRates/stateTaxBurden.json');
const fedIncomeTaxBracket = require('../taxRates/fedIncomeTaxBrackets.json');
const stateAllocation = require('../taxRates/stateAllocation.json');
const locationController = {};


locationController.calculateTaxes = (req, res, next) => {
    console.log('Request received at /calculate-taxes');
    try {const { selectedState, income } = req.body;
        console.log(`Selected State: ${selectedState}, Income: ${income}`);

        const selectedStateTaxBurden = parseFloat(stateTaxBurden.find(obj => obj.abbreviation === selectedState)?.rate)/100;
        const stateName = stateTaxBurden.find(obj => obj.abbreviation === selectedState)?.state;   
        const userIncomeBracket = parseFloat(fedIncomeTaxBracket.find(obj => income >= obj.income[0] && income < obj.income[1])?.bracket)/100;
        const stateTaxesPaid = parseFloat((income * selectedStateTaxBurden).toFixed(2));
        const fedTaxesPaid = parseFloat((income * userIncomeBracket).toFixed(2));
        const incomeAfterTax = income - stateTaxesPaid - fedTaxesPaid;

        const selectedStateAllocation = stateAllocation.find(obj=> obj.name === stateName);

        const allocationData = {
            federal: [
                { name: 'Social Security', value: 21 },
                { name: 'Medicare', value: 14 },
                { name: 'Net Interest', value: 13 },
                { name: 'Health', value: 13 },
                { name: 'National Defense', value: 13 },
                { name: 'Income Security', value: 11 },
                { name: 'Veterans Benefits and Services', value: 5 },
                { name: 'Education, Training, Employment, and Social Services', value: 3 },
                { name: 'Transportation', value: 2 },
                { name: 'Community and Regional Development', value: 2 },
                { name: 'Other', value: 4 },
            ],
            stateAndLocal: [
                
                { name: 'Education', value: (parseFloat(selectedStateAllocation['Education'])/100) * stateTaxesPaid },
                { name: 'Public Welfare', value: (parseFloat(selectedStateAllocation['Public Welfare'])/100) * stateTaxesPaid },
                { name: 'Hospitals', value: (parseFloat(selectedStateAllocation['Hospitals'])/100) * stateTaxesPaid },
                { name: 'Health', value: (parseFloat(selectedStateAllocation['Health'])/100) * stateTaxesPaid },
                { name: 'Highways', value: (parseFloat(selectedStateAllocation['Highways'])/100) * stateTaxesPaid },
                { name: 'Police', value: (parseFloat(selectedStateAllocation['Police'])/100) * stateTaxesPaid },
                { name: 'Corrections', value: (parseFloat(selectedStateAllocation['Corrections'])/100) * stateTaxesPaid },
                { name: 'Natural Resources', value: (parseFloat(selectedStateAllocation['Natural Resources'])/100) * stateTaxesPaid },
                { name: 'Parks and Rec', value: (parseFloat(selectedStateAllocation['Parks and Rec'])/100) * stateTaxesPaid },
                { name: 'Governmental Administration', value: (parseFloat(selectedStateAllocation['Governmental Administration'])/100) * stateTaxesPaid },
                { name: 'Interest', value: (parseFloat(selectedStateAllocation['Interest'])/100) * stateTaxesPaid },
                { name: 'Other', value: (parseFloat(selectedStateAllocation['Other'])/100) * stateTaxesPaid },
            ],
            percentTaxed: [
                {name: 'Income After Tax', value: incomeAfterTax},
                {name: 'Federal Taxes Paid', value: fedTaxesPaid},
                {name: 'State and Local Taxes Paid', value: stateTaxesPaid},
            ]
        };

        res.locals.taxData = {
            allocationData: allocationData
        };
        return next();

    }catch(err){
        console.error('Error in calculateTaxes:', err);
        return next({
            log: 'Error in locationController.calculateTaxes',
            status: 500,
            message: { err: 'Unable to retrieve tax data' },
        })
    }
};

locationController.getAllocation = (req, res,next) => {
    

};

locationController.getStateRanking = (req, res, next) => {
    try{const {selectedState} = req.body;
        
    //TODO:Actual Data Fetching Logic
    
    
        const stateRanking = [
            {
                name: 'K-12 Education', 
                percentRevenue: 15,
                natAvgPercentRevenue:23,
                stateRank: 25,
            },
        
            
            {
                name: 'Higher Education', 
                percentRevenue: 15,
                natAvgPercentRevenue:23,
                stateRank: 25,
            },
        
            {
                name: 'Healthcare', 
                percentRevenue: 15,
                natAvgPercentRevenue:23,
                stateRank: 25,
            },

            {
                name: 'Corrections', 
                percentRevenue: 15,
                natAvgPercentRevenue:23,
                stateRank: 25,
            },

            {
                name: 'Social Programs', 
                percentRevenue: 15,
                natAvgPercentRevenue:23,
                stateRank: 25,
            },
        ];

        res.locals.taxData = {
            ...res.locals.taxData,
            stateRanking: stateRanking
        };
        next();

    }catch(err){
        console.error('Error in getAllocation', err);
        return next({
            log: 'Error in locationController.getAllocation',
            status: 500,
            message: { err: 'Unable to retrieve tax allocation data' },
        })
    }
};

module.exports = locationController;