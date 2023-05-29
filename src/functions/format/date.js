import moment from "moment";
import momentTZ from 'moment-timezone';

export const formatDate = (date) => {
    let d;
    d = new moment(date)
    return d.format('MM-DD-YYYY');
}

export const formatDate2 = (date) => {
    let d;
    d = new moment(date)
    return d.format('MM/DD/YYYY');
}

export const formatDateString = (date) => {
    let d;
    d = new moment(date)
    return d.format('MMMM DD, YYYY');
}

export const formatDateAPI = (date) => {
    let d;
    d = new moment(date)
    return d.format('MM-DD-YYYY');
}
export const formatDateAPI1 = (date) => {
    let d;
    d = new moment(date)
    return d.format('YYYY-MM-DD');
}

export const FeedESTDateToString = (date, timezone="America/New_York") => {
    let d;
    d = new moment(date).tz(timezone)
    return d.format('MM-DD-YYYY');
}