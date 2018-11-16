import { combineReducers } from 'redux'

const INITIAL_STATE = {
    data_records: [],
    categorical_records: {
        spend: {
            fooddrinks: {
                size: 0,
                cost: 0
            },
            bills: {
                size: 0,
                cost: 0
            },
            transportation: {
                size: 0,
                cost: 0
            },
            grocery: {
                size: 0,
                cost: 0
            },
            shoppingentertainment: {
                size: 0,
                cost: 0
            },
            maintenancerepair: {
                size: 0,
                cost: 0
            },
            healthmedication: {
                size: 0,
                cost: 0
            },
            lost: {
                size: 0,
                cost: 0
            },
            others: {
                size: 0,
                cost: 0
            },
        },
        earn: {
            salary: {
                size: 0,
                cost: 0
            },
            allowance: {
                size: 0,
                cost: 0
            },
            found: {
                size: 0,
                cost: 0,
            },
            others: {
                size: 0,
                cost: 0
            }
        }
    }
}

const recordsReducer = (state = INITIAL_STATE,action) => {
    switch(action.type) {
        case 'ADD_RECORD':
            const {data_records,categorical_records} = state;
            if(data_records.length == 0 || data_records[0].date!=action.date){
                data_records.unshift(
                    {
                        date: action.date,
                        net: 0,
                        total_spent: 0,
                        items: []
                    }
                );
            }
            data_records[0].items.unshift(action.payload);
            if (action.payload.inout=='earn') {
                data_records[0].net += action.payload.cost;
            }
            else{
                data_records[0].net += (action.payload.cost*-1)
                data_records[0].total_spent += action.payload.cost
            }

            switch(action.payload.category){
                case "Food & Drinks" : 
                    categorical_records.spend.fooddrinks.size++;
                    categorical_records.spend.fooddrinks.cost+= action.payload.cost;
                    break;
                case "Bills" : 
                    categorical_records.spend.bills.size++;
                    categorical_records.spend.bills.cost+= action.payload.cost;
                    break;
                case "Transportation" : 
                    categorical_records.spend.transportation.size++;
                    categorical_records.spend.transportation.cost+= action.payload.cost;
                    break;
                case "Grocery" : 
                    categorical_records.spend.grocery.size++;
                    categorical_records.spend.grocery.cost+= action.payload.cost;
                    break;
                case "Shopping/Entertainment" : 
                    categorical_records.spend.shoppingentertainment.size++;
                    categorical_records.spend.fooddrinks.cost+= action.payload.cost;
                    break;
                case "Maintenance/Repair" : 
                    categorical_records.spend.maintenancerepair.size++;
                    categorical_records.spend.maintenancerepair.cost+= action.payload.cost;
                    break;
                case "Health/Medication" : 
                    categorical_records.spend.healthmedication.size++;
                    categorical_records.spend.healthmedication.cost+= action.payload.cost;
                    break;
                case "Lost" : 
                    categorical_records.spend.lost.size++;
                    categorical_records.spend.lost.cost+= action.payload.cost;
                    break;
                case "Others" : 
                    if (action.inout == "Spend"){
                        categorical_records.spend.others.size++;
                        categorical_records.spend.others.cost+= action.payload.cost;
                    }
                    else{
                        categorical_records.earn.others.size++;
                        categorical_records.earn.others.cost+= action.payload.cost;
                    }
                    break;
                case "Salary":
                    categorical_records.earn.salary.size++;
                    categorical_records.earn.salary.cost+= action.payload.cost;
                    break;
                case "Allowance" : 
                    categorical_records.earn.allowance.size++;
                    categorical_records.earn.allowance.cost+= action.payload.cost;
                    break;
                case "Found" : 
                    categorical_records.earn.found.size++;
                    categorical_records.earn.found.cost+= action.payload.cost;
                    break;
                default:
                    if (action.inout == "Spend"){
                        categorical_records.spend.others.size++;
                        categorical_records.spend.others.cost+= action.payload.cost;
                    }
                    else{
                        categorical_records.earn.others.size++;
                        categorical_records.earn.others.cost+= action.payload.cost;
                    }
            }

            const newState = {data_records,categorical_records}
            return newState
        default: 
            return state
    }
}

export default combineReducers({
    records: recordsReducer,
})  

export const addRecord = (inout, details, category, cost) =>(
    {
        type: 'ADD_RECORD',
        date: new Date().toLocaleDateString().replace(/-/g,'/'),
        inout: inout,
        payload: {
            details: details,
            category: category,
            cost: cost,
            time: new Date().toLocaleTimeString()
        }
    }
)

//"Food & Drinks", "Bills", "Transportation", "Grocery", "Shopping/Entertainment", "Maintenance/Repair", "Health/Medication"