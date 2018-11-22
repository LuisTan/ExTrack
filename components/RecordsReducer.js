import { combineReducers } from 'redux'

const INITIAL_STATE = {
    statistical_data: {
        current: 0,
        total_earned: 0,
        total_spent: 0,
    },
    data_records: [
        //{per date ang isang element sa data_records
            //date: '2018 Oct 31',
            //net: 0,
            //total_spent: 0,
            //items: [
                //{
                //    inout: 'Earn' or 'Spend',
                //    details: 'Example',
                //    category: 'Food and Drinks' or 'Salary',
                //    cost: 1000,
                //    time: '22:34:22'
                //}
            //],[

            //]
        //},{

        //}
    ]
}

const recordsReducer = (state = INITIAL_STATE,action) => {
    const {statistical_data,data_records,categorical_records} = state;
    switch(action.type) {
        case 'ADD_DATE':
            if (data_records.length == 0){
                data_records.unshift(
                    {
                        date: action.date,
                        net: 0,
                        total_spent: 0,
                        items: []
                    }
                );
            }
            while(
                data_records[0].date.getFullYear()!=action.date.getFullYear() &&
                data_records[0].date.getMonth()!=action.date.getMonth() &&
                data_records[0].date.getDate()!=action.date.getDate() &&
                data_records[0].date.getDay()!=action.date.getDay() ){
                    
                data_records.unshift(
                    {
                        date: new Date(new Date().setDate(data_records[0].date.getDate() + 1)),
                        net: 0,
                        total_spent: 0,
                        items: []
                    }
                );
            }

            return {statistical_data,data_records,categorical_records}
        case 'ADD_RECORD':
            data_records[0].items.unshift(action.payload);
            statistical_data.current = parseFloat(statistical_data.current) + (action.payload.inout == 'Earn') ? action.payload.cost : (-1)* action.payload.cost ;
            statistical_data.total_earned = parseFloat(statistical_data.total_earned) + ((action.payload.inout == 'Earn') ? action.payload.cost : 0);
            statistical_data.total_spent = parseFloat(statistical_data.total_spent) + ((action.payload.inout == 'Spend') ? action.payload.cost : 0);

            if (action.payload.inout=='Earn') {
                data_records[0].net = parseFloat(data_records[0].net) + action.payload.cost;
            }
            else{
                data_records[0].net = parseFloat(data_records[0].net) + (action.payload.cost*-1)
                data_records[0].total_spent = parseFloat(data_records[0].total_spent) + action.payload.cost
            }

            return {statistical_data,data_records,categorical_records}
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
        date: new Date(),
        payload: {
            inout: inout,
            details: details,
            category: category,
            cost: cost,
            time: new Date().toLocaleTimeString()
        }
    }
)

export const addDate = () => (
    {
        type: 'ADD_DATE',
        date: new Date()
    }
)

//"Food & Drinks", "Bills", "Transportation", "Grocery", "Shopping/Entertainment", "Maintenance/Repair", "Health/Medication"