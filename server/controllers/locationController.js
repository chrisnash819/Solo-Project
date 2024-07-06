const stateTaxBurden = require('../taxRates/stateTaxBurden.json');
const fedIncomeTaxBracket = require('../taxRates/fedIncomeTaxBrackets.json');
const stateAllocation = require('../taxRates/stateAllocation.json');
const averageState = require('../taxRates/averageState.json')
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
        const education = parseFloat(selectedStateAllocation['Education']);
        const publicWelfare = parseFloat(selectedStateAllocation['Public Welfare']);
        const hospitals = parseFloat(selectedStateAllocation['Hospitals']);
        const health = parseFloat(selectedStateAllocation['Health']);
        const highways = parseFloat(selectedStateAllocation['Highways']);
        const police = parseFloat(selectedStateAllocation['Police']);
        const corrections = parseFloat(selectedStateAllocation['Corrections']);
        const naturalResources = parseFloat(selectedStateAllocation['Natural Resources']);
        const parksAndRec = parseFloat(selectedStateAllocation['Parks and Rec']);
        const governmentalAdministration = parseFloat(selectedStateAllocation['Governmental Administration']);


        const allocationData = {
            stateNumbers: [
                education,publicWelfare,hospitals,health,highways,police,corrections,naturalResources,governmentalAdministration
            ],

            federal: [
                { name: 'Social Security', value: fedTaxesPaid * (21/100) },
                { name: 'Medicare', value: fedTaxesPaid * (14/100)  },
                { name: 'Net Interest', value: fedTaxesPaid * (13/100)  },
                { name: 'Health', value: fedTaxesPaid * (13/100)  },
                { name: 'National Defense', value: 13 },
                { name: 'Income Security', value: fedTaxesPaid * (11/100)  },
                { name: 'Veterans Benefits and Services', value: fedTaxesPaid * (5/100)  },
                { name: 'Education, Training, Employment, and Social Services', value: fedTaxesPaid * (3/100)  },
                { name: 'Transportation', value: fedTaxesPaid * (2/100)  },
                { name: 'Community and Regional Development', value:fedTaxesPaid * (2/100)  },
                { name: 'Other', value: fedTaxesPaid * (4/100)  },
            ],
            stateAndLocal: [
                
                { name: 'Education', value: (parseFloat(education)/100) * stateTaxesPaid },
                { name: 'Public Welfare', value: (parseFloat(publicWelfare)/100) * stateTaxesPaid },
                { name: 'Hospitals', value: (parseFloat(hospitals)/100) * stateTaxesPaid },
                { name: 'Health', value: (parseFloat(health)/100) * stateTaxesPaid },
                { name: 'Highways', value: (parseFloat(highways)/100) * stateTaxesPaid },
                { name: 'Police', value: (parseFloat(police)/100) * stateTaxesPaid },
                { name: 'Corrections', value: (parseFloat(corrections)/100) * stateTaxesPaid },
                { name: 'Natural Resources', value: (parseFloat(naturalResources)/100) * stateTaxesPaid },
                { name: 'Governmental Administration', value: (parseFloat(governmentalAdministration)/100) * stateTaxesPaid },
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
    try{

    
        
    //TODO:Actual Data Fetching Logic
    
        const stateNumbers = res.locals.taxData.allocationData.stateNumbers;
        const stateRanking = [
            { 
                name: 'Education', 
                percentRevenue: stateNumbers[0], 
                natAvgPercentRevenue: averageState.find(obj => obj.field === 'Education')?.avg 
            },
            { 
                name: 'Public Welfare', 
                percentRevenue: stateNumbers[1], 
                natAvgPercentRevenue: averageState.find(obj => obj.field === 'Public Welfare')?.avg 
            },
            { 
                name: 'Hospitals', 
                percentRevenue: stateNumbers[2], 
                natAvgPercentRevenue: averageState.find(obj => obj.field === 'Hospitals')?.avg 
            },
            { 
                name: 'Health', percentRevenue: stateNumbers[3], natAvgPercentRevenue: averageState.find(obj => obj.field === 'Health')?.avg },
            { 
                name: 'Highways', 
                percentRevenue: stateNumbers[4], 
                natAvgPercentRevenue: averageState.find(obj => obj.field === 'Highways')?.avg 
            },
            { 
                name: 'Police', 
                percentRevenue: stateNumbers[5], 
                natAvgPercentRevenue: averageState.find(obj => obj.field === 'Police')?.avg
            },
            { 
                name: 'Corrections', 
                percentRevenue: stateNumbers[6], 
                natAvgPercentRevenue: averageState.find(obj => obj.field === 'Corrections')?.avg 
            },
            { 
                name: 'Natural Resources', 
                percentRevenue: stateNumbers[7], 
                natAvgPercentRevenue: averageState.find(obj => obj.field === 'Natural Resources')?.avg 
            },
            { 
                name: 'Governmental Administration', 
                percentRevenue: stateNumbers[8], 
                natAvgPercentRevenue: averageState.find(obj => obj.field === 'Governmental Administration')?.avg 
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