import React, { createContext, useState} from 'react'
import { TravelPlan } from '../../interfaces/TravelPlan'

interface TravelPlanContextType {
    travelPlan: TravelPlan | null;
    setTravelPlan: (travelPlan: TravelPlan) => void;
    clearTravelPlan: () => void;    
}

export const TravelPlanContext = createContext<TravelPlanContextType | undefined>(undefined)

interface TravelPlanProviderProps {
    children: React.ReactNode;
}

export const TravelPlanProvider: React.FC<TravelPlanProviderProps> = ({children}) => {
    const [travelPlan, setTravelPlanState] = useState<TravelPlan | null>(null);
    
    const setTravelPlan = (plan: TravelPlan) => {
        setTravelPlanState(plan);
    }

    const clearTravelPlan = () => {
        setTravelPlanState(null);
    }
    return (
        <TravelPlanContext.Provider value={{travelPlan, setTravelPlan, clearTravelPlan}}>
            {children}
        </TravelPlanContext.Provider>
  )
}

export default TravelPlanContext