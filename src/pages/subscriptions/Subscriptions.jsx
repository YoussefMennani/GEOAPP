import React, { useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Edit, Delete, CheckCircle, Cancel } from "@mui/icons-material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from 'dayjs';
import BannerUpTable from "../layouts/BannerUpTable";
import { useSelector, useDispatch } from "react-redux";
import { 
  fetchSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  enableSubscription,
  disableSubscription,
  fetchPlans,
 } from "../../slices/subscription";
import { getOrganizationRootSlice } from "../../slices/organizationSlice";

const Subscriptions = () => {
  const dispatch = useDispatch();
  const { subscriptions, status, error } = useSelector((state) => state.subscription);
  const { plans } = useSelector((state) => state.subscription);
  const { organizationRoot } = useSelector((state) => state.organization);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);

  // Form State
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("");
  const [startDate, setStartDate] = useState(dayjs().startOf('day'));
  const [endDate, setEndDate] = useState(dayjs().startOf('day'));
  const [discount, setDiscount] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

  // Fetch subscriptions on component mount
  useEffect(() => {
    dispatch(fetchSubscriptions());
    dispatch(getOrganizationRootSlice());
    dispatch(fetchPlans());
  }, [dispatch]);

  // Open Modal for Add/Edit
  const handleOpen = (subscription = null) => {
    if (subscription) {
      setCurrentSubscription(subscription);
      setName(subscription.organization.name);
      setPlan(subscription.plan.name);
      setStartDate(dayjs(subscription.startDate));
      setEndDate(dayjs(subscription.endDate));
      setDiscount(subscription.discount);
      setFinalPrice(subscription.finalPrice);
      setEditMode(true);
    } else {
      setCurrentSubscription(null);
      setName("");
      setPlan("");
      setStartDate(dayjs().startOf('day'));
      setEndDate(dayjs().startOf('day'));
      setDiscount("");
      setFinalPrice("");
      setEditMode(false);
    }
    setOpen(true);
  };

  // Close Modal
  const handleClose = () => {
    setOpen(false);
    setCurrentSubscription(null);
  };

  // Delete Subscription
  const handleDelete = (id) => {
    dispatch(deleteSubscription(id));
  };

  // Enable Subscription
  const handleEnable = (id) => {
    dispatch(enableSubscription(id));
  };

  // Disable Subscription
  const handleDisable = (id) => {
    dispatch(disableSubscription(id));
  };

  // Calculate Final Price
  const calculateFinalPrice = (planName, discount) => {
    const selectedPlan = plans.find((p) => p.name === planName);
    if (!selectedPlan) return "0";
    const price = parseFloat(selectedPlan.price);
    const discountValue = parseFloat(discount || 0);
    return (price - (price * discountValue) / 100).toFixed(2);
  };

  // Update Final Price when Plan or Discount changes
  useEffect(() => {
    const newFinalPrice = calculateFinalPrice(plan, discount);
    setFinalPrice(newFinalPrice);
  }, [plan, discount]);

  // Handle Form Submission (Add/Edit)
  const handleSubmit = (event) => {
    event.preventDefault();
    const subscriptionData = {
      organization: organizationRoot.find((org) => org.name === name),
      plan: plans.find((p) => p.name === plan),
      startDate: startDate.format("YYYY-MM-DDTHH:mm"),
      endDate: endDate.format("YYYY-MM-DDTHH:mm"),
      discount: parseFloat(discount),
      finalPrice: parseFloat(finalPrice),
    };

    if (editMode) {
      dispatch(updateSubscription({ id: currentSubscription.id, subscriptionData }));
    } else {
      dispatch(createSubscription(subscriptionData));
    }
    handleClose();
  };

  // Table Columns
  const columns = [
    { accessorKey: "organization.name", header: "Organization Name" },
    { accessorKey: "plan.name", header: "Plan" },
    { accessorKey: "startDate", header: "Start Date" },
    { accessorKey: "endDate", header: "End Date" },
    { accessorKey: "discount", header: "Discount" },
    { accessorKey: "finalPrice", header: "Final Price" },
    {
      accessorKey: "enabled",
      header: "Status",
      Cell: ({ row }) => (
        <Box>
          {row.original.enabled ? (
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircle />}
              onClick={() => handleDisable(row.original.id)}
            >
              Enabled
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              startIcon={<Cancel />}
              onClick={() => handleEnable(row.original.id)}
            >
              Disabled
            </Button>
          )}
        </Box>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <Box>
          <IconButton onClick={() => handleOpen(row.original)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.original.id)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Material-React-Table Configuration
  const table = useMaterialReactTable({
    columns,
    data: subscriptions,
    renderRowActions: ({ row }) => (
      <Box>
        <IconButton onClick={() => handleOpen(row.original)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => handleDelete(row.original.id)}>
          <Delete />
        </IconButton>
      </Box>
    ),
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <Box>
      <BannerUpTable
        parentPath="Subscription"
        childPath="subscription Manager"
        imageButton="bx bxs-user-account"
        labelButton="Add Subscription"
        onClickAddButton={() => handleOpen()}
      />

      <MaterialReactTable table={table} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Edit" : "Add"} Subscription</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscriptionForm">
            <div className="row">
              <div className="col-md-12">
                <TextField
                  name="name"
                  label="Organization Name"
                  select
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                >
                  {organizationRoot.map((org) => (
                    <MenuItem key={org.id} value={org.name}>
                      {org.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-md-12">
                <TextField
                  name="plan"
                  label="Plan"
                  select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                >
                  {plans.map((plan) => (
                    <MenuItem key={plan.name} value={plan.name}>
                      {plan.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-md-12 my-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                      if (endDate.isBefore(newValue)) {
                        setEndDate(newValue);
                      }
                    }}
                    format="YYYY-MM-DD HH:mm"
                    ampm={false}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth margin="normal" required />
                    )}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </div>
              <div className="col-md-12 my-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    minDateTime={startDate}
                    format="YYYY-MM-DD HH:mm"
                    ampm={false}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth margin="normal" required />
                    )}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </div>
              <div className="col-md-12">
                <TextField
                  name="discount"
                  label="Discount"
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </div>
              <div className="col-md-12">
                <TextField
                  name="finalPrice"
                  label="Final Price"
                  type="number"
                  value={finalPrice}
                  fullWidth
                  margin="normal"
                  required
                  disabled
                />
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} size="large">
            Cancel
          </Button>
          <Button type="submit" form="subscriptionForm" variant="contained" size="large">
            {editMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Subscriptions;