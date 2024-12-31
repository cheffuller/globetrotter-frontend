import { createContext, ReactNode, useState } from "react";

export interface TravelPlan {
  id?: number;
  accountId: number;
  isFavorited: boolean;
  isPublished: boolean;
}

// interface TravelPlanContextType {
//   //what would i need in general from the travel plan
//   travelPlan: TravelPlan | null;
//   travelPlans: TravelPlan[];
//   submitTravelPlan: (travelPlanData: TravelPlan) => void;
//   getTravelPlans: (travelPlans: TravelPlan[]) => void;
// }

// export const TravelPlanContext = createContext<TravelPlanContextType | undefined>(undefined);

// interface TravelPlanProviderProps {
//   children: ReactNode;
// }

// export const TravelPlanProvider: React.FC<TravelPlanProviderProps> = ({children}) => {
//   const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
//   const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);

//   const submitTravelPlan = (travelPlanData: TravelPlan) => {
//     setTravelPlan(travelPlanData);
//     setTravelPlans(existingTravelPlan => [...existingTravelPlan, travelPlanData]);
//   }

//   const getTravelPlans = (travelPlans: TravelPlan[]) => {
//     setTravelPlans(travelPlans);
//   }

//   return <TravelPlanContext.Provider value={{travelPlan, travelPlans, submitTravelPlan, getTravelPlans}}>
//     {children}
//   </TravelPlanContext.Provider>
// }