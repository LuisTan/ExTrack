<DatePicker
style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue'
}}
date={this.state.date}
mode="date"
placeholder="select date"
format="MM/DD/YYYY"
minDate={this.state.originalhistory[this.state.originalhistory.length - 1].date}
maxDate={this.state.originalhistory[0].date}
confirmBtnText="Confirm"
cancelBtnText="Cancel"
customStyles={{
dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0
},
dateInput: {
    marginLeft: 36
}
// ... You can check the source to find the other keys.
}}
onDateChange={(date) => {this.setState({date: date})}}
/>