import { TravelPlan } from "../../interfaces/TravelPlanContext";
import { TravelPlanLocation } from "../../interfaces/TravelPlanLocation";
import { axiosPrivate } from "../../common/axiosPrivate";
import { API_URL } from "../../consts/ApiUrl";
import { HttpStatusCode } from "axios";
import { BadRequestError, ForbiddenError, NotFoundError } from "../../errors/HttpErrors";

export async function createNewTravelPlan(data: TravelPlan): Promise<number> {
    const response = await axiosPrivate.post(API_URL + "plans", data);

    if (response.status == HttpStatusCode.BadRequest) {
        throw new BadRequestError("Invalid travel plan details.");
    } else if (response.status == HttpStatusCode.NotFound) {
        throw new NotFoundError("Travel plan not found.");
    } else if (response.status == HttpStatusCode.Forbidden) {
        throw new ForbiddenError("Invalid JWT.");
    }

    const travelPlan: TravelPlan = await response.data();
    return travelPlan.id as number;
}

export async function addTravelPlanLocation(data: TravelPlanLocation) {

}