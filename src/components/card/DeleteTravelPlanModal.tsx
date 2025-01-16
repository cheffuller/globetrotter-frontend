import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { axiosPrivate } from '../../common/axiosPrivate';
import { API_ROOT_URL } from '../../consts/ApiUrl';
import { TravelPlanDetail } from '../../interfaces/TravelPlanDetail';

type DeleteTravelPlanModalProps = {
  deleteTravelPlanToggle: boolean;
  setDeleteTravelPlanToggle: React.Dispatch<React.SetStateAction<boolean>>;
  travelPlanId: number;
  travelPlans: TravelPlanDetail[];
  setTravelPlans: React.Dispatch<React.SetStateAction<TravelPlanDetail[]>>;
};

const DeleteTravelPlanModal = ({
    deleteTravelPlanToggle,
    setDeleteTravelPlanToggle,
    travelPlanId,
    travelPlans,
    setTravelPlans,
}: DeleteTravelPlanModalProps) => {
  const handleClose = () => setDeleteTravelPlanToggle(false);

  const handleConfirm = () => {
    const deleteTravelPlan = async (travelPlanId: number) => {
      try {
      if (travelPlanId) {
        await axiosPrivate.delete(`${API_ROOT_URL}plans/${travelPlanId}`);
      }
      const newTravelPlans = travelPlans.filter((plan) => plan.id !== travelPlanId)
      setTravelPlans(newTravelPlans);
    } catch (err) {
      console.log(err);
      }
    };
    deleteTravelPlan(travelPlanId);
    handleClose();
  };

  return (
    <>
      <Modal show={deleteTravelPlanToggle} onHide={handleClose}>
        <Modal.Body className='delete-text text-center'>Are you sure you want to delete this Travel Plan?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary btn-primary' onClick={handleClose}>
            Cancel
          </Button>
          <Button className='delete-button' onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteTravelPlanModal;