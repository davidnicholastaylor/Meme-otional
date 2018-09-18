const DayDate = {}

DayDate.getTime = () => {
    let time = "";
    let currentTime = new Date()
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    time += hours + ":" + minutes + " ";
    if(hours > 11){
        time += "PM"
    } else {
        time += "AM"
    }
    return time;
}

DayDate.getDate = () => {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if( dd < 10 ) {
        dd = "0" + dd
    };
    if( mm < 10 ) {
        mm = "0" + mm
    };
    date = mm + "/" + dd + "/" + yyyy + " at " + DayDate.getTime();
    return date;
}

export default DayDate;
