import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = "http://localhost:8222";

// Fetch all plans
export const fetchPlans = createAsyncThunk('plans/fetchPlans', async (_, { getState }) => {
  try {
    const state = getState();
    const token = state.user.auth.token;
    const res = await axios.get(`${apiUrl}/api/v1/subscription/plans`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    toast.error("Failed to fetch plans");
    throw error;
  }
});

// Create a new plan
export const createPlan = createAsyncThunk('plans/createPlan', async (plan, { getState }) => {
  try {
    const state = getState();
    const token = state.user.auth.token;
    const res = await axios.post(`${apiUrl}/api/v1/subscription/plans`, plan, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    toast.success("Plan created successfully");
    return res.data;
  } catch (error) {
    toast.error("Failed to create plan");
    throw error;
  }
});

// Update an existing plan
export const updatePlan = createAsyncThunk('plans/updatePlan', async ({ id, planDetails }, { getState }) => {
  try {
    const state = getState();
    const token = state.user.auth.token;
    const res = await axios.put(`${apiUrl}/api/v1/subscription/plans/${id}`, planDetails, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    toast.success("Plan updated successfully");
    return res.data;
  } catch (error) {
    toast.error("Failed to update plan");
    throw error;
  }
});

// Delete a plan
export const deletePlan = createAsyncThunk('plans/deletePlan', async (id, { getState }) => {
  try {
    const state = getState();
    const token = state.user.auth.token;
    await axios.delete(`${apiUrl}/api/v1/subscription/plans/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    toast.success("Plan deleted successfully");
    return id;
  } catch (error) {
    toast.error("Failed to delete plan");
    throw error;
  }
});


// Fetch all subscriptions
export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetchSubscriptions',
  async (_, { getState }) => {
    try {
      const state = getState();
      const token = state.user.auth.token; // Assuming you store the token in the user slice
      const response = await axios.get(`${apiUrl}/api/v1/subscription/subscriptions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch subscriptions');
      throw error;
    }
  }
);

// Create a new subscription
export const createSubscription = createAsyncThunk(
  'subscriptions/createSubscription',
  async (subscriptionData, { getState }) => {
    try {
      const state = getState();
      const token = state.user.auth.token;
      const response = await axios.post(`${apiUrl}/api/v1/subscription/subscriptions`, subscriptionData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Subscription created successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to create subscription');
      throw error;
    }
  }
);

// Update an existing subscription
export const updateSubscription = createAsyncThunk(
  'subscriptions/updateSubscription',
  async ({ id, subscriptionData }, { getState }) => {
    try {
      const state = getState();
      const token = state.user.auth.token;
      const response = await axios.put(`${apiUrl}/api/v1/subscription/subscriptions/${id}`, subscriptionData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Subscription updated successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to update subscription');
      throw error;
    }
  }
);

// Delete a subscription
export const deleteSubscription = createAsyncThunk(
  'subscriptions/deleteSubscription',
  async (id, { getState }) => {
    try {
      const state = getState();
      const token = state.user.auth.token;
      await axios.delete(`${apiUrl}/api/v1/subscription/subscriptions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Subscription deleted successfully');
      return id;
    } catch (error) {
      toast.error('Failed to delete subscription');
      throw error;
    }
  }
);


export const enableSubscription = createAsyncThunk(
  "subscription/enableSubscription",
  async (id, { getState }) => {
    try {
      const state = getState();
      const token = state.user.auth.token;
      const response = await axios.put(
        `${apiUrl}/api/v1/subscription/subscriptions/${id}/enable`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        });
      toast.warning('Subscription enabled successfully');

      return response.data;
    } catch (error) {
      toast.error('Failed to enable subscription');
      throw error;
      // throw new Error(error.response?.data?.message || "Failed to enable subscription");
    }
  }
);

export const disableSubscription = createAsyncThunk(
  "subscription/disableSubscription",
  async (id, { getState }) => {
    try {
      const state = getState();
      const token = state.user.auth.token;
      const response = await axios.put(
        `${apiUrl}/api/v1/subscription/subscriptions/${id}/disable`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        });
      toast.warning('Subscription disaabled successfully');

      return response.data;
    } catch (error) {
      toast.error('Failed to disable subscription');
      throw error;
      // throw new Error(error.response?.data?.message || "Failed to disable subscription");
    }
  }
);

const subscriptionSlice = createSlice({
  name: 'subscriotion',
  initialState: {
    plans: [],
    subscriptions: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.plans.push(action.payload);
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        const index = state.plans.findIndex(plan => plan.id === action.payload.id);
        if (index !== -1) {
          state.plans[index] = action.payload;
        }
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.plans = state.plans.filter(plan => plan.id !== action.payload);
      })

      // Fetch subscriptions
      .addCase(fetchSubscriptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Create subscription
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.subscriptions.push(action.payload);
      })

      // Update subscription
      .addCase(updateSubscription.fulfilled, (state, action) => {
        const index = state.subscriptions.findIndex(
          (subscription) => subscription.id === action.payload.id
        );
        if (index !== -1) {
          state.subscriptions[index] = action.payload;
        }
      })

      // Delete subscription
      .addCase(deleteSubscription.fulfilled, (state, action) => {
        state.subscriptions = state.subscriptions.filter(
          (subscription) => subscription.id !== action.payload
        );
      })
      .addCase(enableSubscription.fulfilled, (state, action) => {
        const index = state.subscriptions.findIndex(
          (sub) => sub.id === action.payload.id
        );
        if (index !== -1) {
          state.subscriptions[index] = action.payload;
        }
      })
      .addCase(enableSubscription.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(disableSubscription.fulfilled, (state, action) => {
        const index = state.subscriptions.findIndex(
          (sub) => sub.id === action.payload.id
        );
        if (index !== -1) {
          state.subscriptions[index] = action.payload;
        }
      })
      .addCase(disableSubscription.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default subscriptionSlice.reducer;