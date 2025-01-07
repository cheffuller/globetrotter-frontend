export interface TravelPlanDetail {
    id?: number;
    accountId: number;
    isFavorited: boolean;
    isPublished: boolean;
    post: {
        comments: [];
        id: number;
        locations: [{
            id: number;
            city: string;
            country: string;
            endDate: Date;
            startDate: Date;
            travelPlanId: number;
        }];
        numberOfLikes: number;
        timestamp: Date;
        travelPlanId: number;
        username: string;
    }
  }