import moment, { Moment } from "moment";

const pastDateFormat = (date: string) => {
    const duration = moment.duration(moment().diff(moment(date)));
    const formattedDuration = `${duration.asWeeks().toFixed(0)}w ago`;
    return formattedDuration
}
const randomNumber = () => Math.floor(Math.random() * 10) + 1;

export { pastDateFormat, randomNumber }