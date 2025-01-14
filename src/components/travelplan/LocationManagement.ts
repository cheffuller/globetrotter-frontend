import { useState } from 'react';
import { TravelPlanLocation } from '../../interfaces/TravelPlanLocation';

export function useLocationManagement(initialLocations: TravelPlanLocation[] = []) {
  const [locations, setLocations] = useState<TravelPlanLocation[]>(initialLocations);

  const addNewLocation = () => {
    const newId = locations.length > 0 ? Math.min(...locations.map(loc => loc.id ?? 0), 0) - 1 : -1;
    setLocations([
      ...locations,
      {
        id: newId,
        city: '',
        country: '',
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
        travelPlanId: 0, // Placeholder; will be set when saved.
      },
    ]);
  };

  const removeLocation = (id: number) => {
    setLocations(locations.filter(location => location.id !== id));
  };

  const updateLocationField = (id: number, field: keyof TravelPlanLocation, value: any) => {
    setLocations(
      locations.map(location => (location.id === id ? { ...location, [field]: value } : location))
    );
  };

  const validateLocations = () => {
    for (const location of locations) {
      if (!location.city || !location.country || !location.startDate || !location.endDate) {
        return false;
      }

      if (location.startDate > location.endDate) {
        return false;
      }
    }
    return true;
  }

  return { locations, setLocations, addNewLocation, removeLocation, updateLocationField, validateLocations };
}
