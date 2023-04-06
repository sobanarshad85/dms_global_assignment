import moment, { Moment } from "moment";

const pastDateFormat = (date: string) => {
    const duration = moment.duration(moment().diff(moment(date)));
    const formattedDuration = `${duration.asWeeks().toFixed(0)}w ago`;
    return formattedDuration
}

export { pastDateFormat }