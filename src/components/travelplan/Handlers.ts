import { TravelPlanLocation } from "../../interfaces/TravelPlanLocation";

export const toUTCDate = (dateString: string): Date => {
    if (!dateString) {
        throw new Error("Invalid date string provided.");
    }
    const [year, month, day] = dateString.split('-');
    return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
};