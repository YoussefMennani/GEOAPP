import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Button, Box, Modal, TextField } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CheckIcon from "@mui/icons-material/Check";
import BannerUpTable from "../layouts/BannerUpTable";
import CardPlan from "./CardPlan";
import DoneIcon from '@mui/icons-material/Done';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlans, createPlan, updatePlan, deletePlan } from "../../slices/subscription";

const SubscriptionPlans = () => {
  const dispatch = useDispatch();
  const { plans, status } = useSelector(state => state.subscription);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newPlan, setNewPlan] = useState({
    name: "",
    price: "",
    vehicles: "",
    gpsTrackers: "",
    users: "",
  });

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  const handleAddPlan = () => {
    if (newPlan.name && newPlan.price && newPlan.vehicles && newPlan.gpsTrackers && newPlan.users) {
      dispatch(createPlan(newPlan));
      setIsModalOpen(false);
      setNewPlan({
        name: "",
        price: "",
        vehicles: "",
        gpsTrackers: "",
        users: "",
      });
    } else {
      toast.error("Fill all the required inputs");
    }
  };

  const handleEditPlan = (index) => {
    setNewPlan(plans[index]);
    setIsEditMode(true);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleUpdatePlan = () => {
    dispatch(updatePlan({ id: plans[editIndex].id, planDetails: newPlan }));
    setIsModalOpen(false);
    setNewPlan({
      name: "",
      price: "",
      vehicles: "",
      gpsTrackers: "",
      users: "",
    });
    setIsEditMode(false);
    setEditIndex(null);
  };

  const handleDeletePlan = (index) => {
    dispatch(deletePlan(plans[index].id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlan({ ...newPlan, [name]: value });
  };

  return (
    <>
      <BannerUpTable
        parentPath="Subscription"
        childPath="Plan Manager"
        imageButton="bx bxs-user-account"
        labelButton="Add Plan"
        setIsEdit={() => { }}
        setModelState={() => { }}
        onClickAddButton={() => {
          setIsModalOpen(true);
          setIsEditMode(false);
          setNewPlan({
            name: "",
            price: "",
            vehicles: "",
            gpsTrackers: "",
            users: "",
          });
        }}
      />

      <div style={{ padding: "20px 0px", backgroundColor: "white", borderRadius: "5px", padding: "20px", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <CardPlan plan={plan} onEdit={() => handleEditPlan(index)} onDelete={() => handleDeletePlan(index)} />
          </Grid>
        ))}
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: "5px" }}>
          <Typography variant="h6" component="h2">
            {isEditMode ? "Edit Plan" : "Add Plan"}
          </Typography>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={newPlan.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={newPlan.price}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Vehicles"
            name="vehicles"
            value={newPlan.vehicles}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="GPS Trackers"
            name="gpsTrackers"
            value={newPlan.gpsTrackers}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Users"
            name="users"
            value={newPlan.users}
            onChange={handleChange}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={isEditMode ? handleUpdatePlan : handleAddPlan}
            sx={{ mt: 2, float: "right", p: 1 }}
          >
            {isEditMode ? "Update Plan" : "Add Plan"} <DoneIcon />
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default SubscriptionPlans;