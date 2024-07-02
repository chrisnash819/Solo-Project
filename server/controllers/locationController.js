const stateTaxBurden = require('../taxRates/stateTaxBurden.json');
const fedIncomeTaxBracket = require('../taxRates/fedIncomeTaxBrackets.json');
const locationController = {};


locationController.calculateTaxes = (req, res, next) => {
    console.log('Request received at /calculate-taxes');
    try {const { selectedState, income } = req.body;
        console.log(`Selected State: ${selectedState}, Income: ${income}`);

        const selectedStateTaxBurden = parseFloat(stateTaxBurden.find(obj => obj.abbreviation === selectedState)?.rate)/100;
            
        const userIncomeBracket = parseFloat(fedIncomeTaxBracket.find(obj => income >= obj.income[0] && income < obj.income[1])?.bracket)/100;
        const stateTaxesPaid = income * selectedStateTaxBurden;
        const fedTaxesPaid = income * userIncomeBracket;
        const incomeAfterTax = income - stateTaxesPaid - fedTaxesPaid;;

        const taxData = {
            federal: [
                { name: 'Social Security', value: 40 },
                { name: 'Medicare', value: 26 },
            ],
            stateAndLocal: [
                
                { name: 'Education', value: 0 },
                { name: 'Healthcare', value: 34 }
            ],
            percentTaxed: [
                {name: 'Income After Tax', value: incomeAfterTax},
                {name: 'State Taxes Paid', value: stateTaxesPaid},
                {name: 'Federal Taxes Paid', value: fedTaxesPaid}
            ]
        };

        res.locals.taxData = taxData;
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

}

locationController.getCivicStats = (req, res, next) => {
    const location = req.params.location;
    res.json({/*this will be a json object of the result of api fetch req*/});
};

module.exports = locationController;