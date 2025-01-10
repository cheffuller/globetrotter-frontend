import { TravelPlan } from "../../interfaces/TravelPlan";
import { TravelPlanLocation } from "../../interfaces/TravelPlanLocation";
import { axiosPrivate } from "../../common/axiosPrivate";
import { API_ROOT_URL } from "../../consts/ApiUrl";
import { HttpStatusCode } from "axios";
import { BadRequestError, ForbiddenError, NotFoundError } from "../../errors/HttpErrors";
import { Post } from "../../interfaces/Post";

export async function createNewTravelPlan(data: TravelPlan): Promise<number> {
    const response = await axiosPrivate.post(API_ROOT_URL + "plans", data);

    if (response.status === HttpStatusCode.BadRequest) {
        throw new BadRequestError("Invalid travel plan details.");
    } else if (response.status === HttpStatusCode.NotFound) {
        throw new NotFoundError("Travel plan not found.");
    } else if (response.status === HttpStatusCode.Forbidden) {
        throw new ForbiddenError("Invalid JWT.");
    }

    const travelPlan: TravelPlan = await response.data;
    return travelPlan.id as number;
}

export async function addTravelPlanLocation(data: TravelPlanLocation) : Promise<TravelPlanLocation> {
    const response = await axiosPrivate.post(API_ROOT_URL + `plans/${data.travelPlanId}/locations`, data);

    if(response.status === HttpStatusCode.BadRequest) {
        throw new BadRequestError("Invalid travel plan location details.");
    } else if (response.status === HttpStatusCode.NotFound) {
        throw new NotFoundError("Travel plan not found.");
    } 

    const travelPlanLocation: TravelPlanLocation = await response.data;
    //what should we return here?
    //what would we need from travel plan location after we added it?
    return travelPlanLocation;
}
export async function updateTravelPlan(data: TravelPlan): Promise<number> {
    const response = await axiosPrivate.put(API_ROOT_URL + "plans", data);

    if (response.status === HttpStatusCode.BadRequest) {
        throw new BadRequestError("Invalid travel plan details.");
    } else if (response.status === HttpStatusCode.NotFound) {
        throw new NotFoundError("Travel plan not found.");
    } else if (response.status === HttpStatusCode.Forbidden) {
        throw new ForbiddenError("Invalid JWT.");
    }

    const travelPlan: TravelPlan = await response.data;
    return travelPlan.id as number;
}

export async function updateTravelPlanLocation(travelPlanId: number, data: TravelPlanLocation[]) : Promise<TravelPlanLocation[]> {
    const response = await axiosPrivate.put(API_ROOT_URL + `plans/${travelPlanId}/locations`, data);

    if(response.status === HttpStatusCode.BadRequest) {
        throw new BadRequestError("Invalid travel plan location details.");
    } else if (response.status === HttpStatusCode.NotFound) {
        throw new NotFoundError("Travel plan not found.");
    } 

    const travelPlanLocations: TravelPlanLocation[] = await response.data;
    return travelPlanLocations;
}

export async function deleteTravelPlan(id: number) : Promise<void> { // do we need to return a promise object here?
    const response = await axiosPrivate.delete(API_ROOT_URL + `plans/${id}`);

    if (response.status === HttpStatusCode.NotFound) {
        throw new NotFoundError("Travel plan not found.");
    } 

    return;
}

export async function getTravelPlan(id: number) : Promise<TravelPlan> {
    console.log("Plan ID being sent to backend ", id);
    const response = await axiosPrivate.get(API_ROOT_URL + `plans/${id}`);

    if (response.status === HttpStatusCode.NotFound) {
        throw new NotFoundError("Travel plan not found.");
    }

    return response.data; // do we need to return the whole travel plan object so that we can populate the fields if we search it?
}

export async function getTravelPlanLocations(id: number) : Promise<TravelPlanLocation[]> {
    const response = await axiosPrivate.get(API_ROOT_URL + `plans/${id}/locations`);

    if (response.status === HttpStatusCode.NotFound) {
        throw new NotFoundError("Travel plan not found.");
    }

    return response.data; // do we need to return the whole travel plan object so that we can populate the fields if we search it?
}

export async function deleteTravelPlanLocations(travelPlanId : number , locationId : number) : Promise<void> {
    const response = await axiosPrivate.delete(API_ROOT_URL + `plans/${travelPlanId}/locations/${locationId}`);

    if (response.status === HttpStatusCode.NotFound) {
        throw new NotFoundError("Travel plan not found.");
    }

    return;
}

export async function createPost(travelPlanId: number) : Promise<Post> {
    const post : Post = {travelPlanId: travelPlanId};
    const response = await axiosPrivate.post(API_ROOT_URL + "posts", post);

    if(response.status === HttpStatusCode.BadRequest) {
        throw new BadRequestError("Invalid post details.");
    } else if (response.status === HttpStatusCode.NotFound) {
        throw new NotFoundError("Travel plan not found.");
    } else if (response.status === HttpStatusCode.Forbidden) {
        throw new ForbiddenError("Invalid JWT.");
    }

    return response.data;
}