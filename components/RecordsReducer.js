import { combineReducers } from 'redux'
import moment from 'moment'

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
    const {statistical_data,data_records} = state;
    const date_today = moment().format()
    switch(action.type) {
        case 'ADD_DATE':
            if (data_records.length == 0){
                data_records.unshift(
                    {
                        date: date_today,
                        net: 0,
                        total_spent: 0,
                        items: []
                    }
                );
            }
            while( data_records[0].date.substring(0,10)!=date_today.substring(0,10) ){
                    
                    data_records.unshift(
                        {
                            date: moment(data_records[0].date).add(1,'d').format(),
                            net: 0,
                            total_spent: 0,
                            items: []
                        }
                    );
            }
            return {statistical_data,data_records}
        case 'ADD_RECORD':
            while( data_records[0].date.substring(0,10)!=date_today.substring(0,10) ){
                    
                data_records.unshift(
                    {
                        date: moment(data_records[0].date).add(1,'d').format(),
                        net: 0,
                        total_spent: 0,
                        items: []
                    }
                );
            }
            data_records[0].items.unshift(action.payload);

            if (action.payload.inout=='Earn') {
                statistical_data.current = parseFloat(statistical_data.current) + action.payload.cost;
                statistical_data.total_earned = parseFloat(statistical_data.total_earned) + action.payload.cost;
                data_records[0].net = parseFloat( statistical_data.current);
            }
            else{
                statistical_data.current = parseFloat(statistical_data.current)-  action.payload.cost;
                statistical_data.total_spent = parseFloat(statistical_data.total_spent) + action.payload.cost;
                data_records[0].net = parseFloat( statistical_data.current);
                data_records[0].total_spent = parseFloat(data_records[0].total_spent) + action.payload.cost;
            }

            return {statistical_data,data_records}
        case 'DELETE_RECORD':
            let index = 0;
            //alert(JSON.stringify(action)+"\n\n"+JSON.stringify(data_records))
            while(data_records[index].date!=action.payload.date){
                index++;
            }

            let i = 0;

            while(data_records[index].items[i].time!=action.payload.time){
                i++;
            }            

            data_records[index].items.splice(i,1)

            return {statistical_data,data_records}
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
        payload: {
            inout: inout,
            details: details,
            category: category,
            cost: cost,
            time: moment().format('LTS')
        }
    }
)

export const addDate = () => (
    {
        type: 'ADD_DATE'
    }
)

export const removeRecord = (date, time) => (
    {
        type: 'DELETE_RECORD',
        payload: {
            date: date,
            time: time
        }
    }
)
//"Food & Drinks", "Bills", "Transportation", "Grocery", "Shopping/Entertainment", "Maintenance/Repair", "Health/Medication"