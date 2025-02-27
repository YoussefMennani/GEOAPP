import React, { useState } from 'react';
import BannerUpTable from '../layouts/BannerUpTable';
import RuleCard from './RuleCard';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';

export const VehicleRules = () => {
  const [goupeRuleData, setGoupeRuleData] = useState([
    {
      ruleGroupName: 'Vehicle Alert Rules',
      organization: 'ehuihdusdsd',
      rules: [
        {
          id: '001',
          name: 'Speed Limit Exceeded',
          conditions: {
            parameter: 'speed',
            operator: '>',
            value: 100,
            unit: 'km/h',
          },
          actions: ['send_notification', 'log_event'],
          status: 'active',
        },
        {
          id: '002',
          name: 'Low Fuel Warning',
          conditions: {
            parameter: 'fuel_level',
            operator: '<',
            value: 10,
            unit: '%',
          },
          actions: ['send_sms', 'notify_dashboard'],
          status: 'active',
        },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [newRuleGroup, setNewRuleGroup] = useState({
    ruleGroupName: '',
    organization: '',
    rules: [],
  });
  const [isEditMode, setIsEditMode] = useState(false); // State to track if modal is in edit mode
  const [editIndex, setEditIndex] = useState(null); // State to track the index of the rule group being edited

  // Predefined list of rules
  const predefinedRules = [
    {
      id: '001',
      name: 'Speed Limit Exceeded',
      conditions: {
        parameter: 'speed',
        operator: '>',
        value: 100,
        unit: 'km/h',
      },
      actions: ['send_notification', 'log_event'],
      status: 'active',
    },
    {
      id: '002',
      name: 'Low Fuel Warning',
      conditions: {
        parameter: 'fuel_level',
        operator: '<',
        value: 10,
        unit: '%',
      },
      actions: ['send_sms', 'notify_dashboard'],
      status: 'active',
    },
    {
      id: '003',
      name: 'Geofence Breach',
      conditions: {
        parameter: 'location',
        operator: 'outside',
        value: 'geofence_id_123',
      },
      actions: ['send_notification', 'alert_security'],
      status: 'active',
    },
    {
      id: '004',
      name: 'Engine Idle Too Long',
      conditions: {
        parameter: 'idle_time',
        operator: '>',
        value: 30,
        unit: 'minutes',
      },
      actions: ['notify_manager'],
      status: 'active',
    },
  ];

  // Predefined list of operators
  const operators = ['>', '<', '==', '!=', 'outside', 'inside'];

  // Predefined list of actions
  const actions = ['send_notification', 'send_sms', 'log_event', 'notify_dashboard', 'alert_security', 'notify_manager'];

  const handleAddRuleGroup = () => {
    if (newRuleGroup.organization && newRuleGroup.ruleGroupName) {
      if (isEditMode) {
        // Update existing rule group
        const updatedRuleGroups = [...goupeRuleData];
        updatedRuleGroups[editIndex] = newRuleGroup;
        setGoupeRuleData(updatedRuleGroups);
        setIsEditMode(false);
        setEditIndex(null);
      } else {
        // Add new rule group
        setGoupeRuleData([...goupeRuleData, newRuleGroup]);
      }
      setIsModalOpen(false); // Close modal after adding/updating
      setNewRuleGroup({ ruleGroupName: '', organization: '', rules: [] }); // Reset form
    } else {
      toast.error("Fill all the required inputs");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRuleGroup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRuleToggle = (rule) => {
    setNewRuleGroup((prev) => {
      const isRuleSelected = prev.rules.some((r) => r.id === rule.id);
      return {
        ...prev,
        rules: isRuleSelected
          ? prev.rules.filter((r) => r.id !== rule.id) // Remove rule if already selected
          : [...prev.rules, { ...rule }], // Add rule if not selected
      };
    });
  };

  const handleConditionChange = (id, field, value) => {
    setNewRuleGroup((prev) => ({
      ...prev,
      rules: prev.rules.map((rule) =>
        rule.id === id
          ? {
            ...rule,
            conditions: { ...rule.conditions, [field]: value },
          }
          : rule
      ),
    }));
  };

  const handleActionChange = (id, selectedActions) => {
    setNewRuleGroup((prev) => ({
      ...prev,
      rules: prev.rules.map((rule) =>
        rule.id === id
          ? {
            ...rule,
            actions: selectedActions,
          }
          : rule
      ),
    }));
  };

  const handleDeleteRuleGroup = (index) => {
    const updatedRuleGroups = goupeRuleData.filter((_, i) => i !== index);
    setGoupeRuleData(updatedRuleGroups);
  };

  const handleEditRuleGroup = (index) => {
    const ruleGroupToEdit = goupeRuleData[index];
    setNewRuleGroup(ruleGroupToEdit);
    setIsEditMode(true);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <BannerUpTable
        parentPath="Vehicle"
        childPath="Rule Manager"
        imageButton="bx bxs-user-account"
        labelButton="Add Rule"
        setIsEdit={() => { }}
        setModelState={() => { }}
        onClickAddButton={() => {
          setIsModalOpen(true);
          setIsEditMode(false);
          setNewRuleGroup({ ruleGroupName: '', organization: '', rules: [] });
        }}
      />

      <div className="container-fluid p-3">
        <div className="row">
          {goupeRuleData.length > 0 ? (
            goupeRuleData.map((ruleData, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
                <RuleCard
                  ruleData={ruleData}
                  onDelete={() => handleDeleteRuleGroup(index)}
                  onEdit={() => handleEditRuleGroup(index)}
                />
              </div>
            ))
          ) : (
            <h3>No data found</h3>
          )}
        </div>
      </div>

      {/* MUI Modal for Adding/Editing Rule Group */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            {isEditMode ? 'Edit Rule Group' : 'Add New Rule Group'}
          </Typography>
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8 }}
            onClick={() => setIsModalOpen(false)}
          >
            <CloseIcon />
          </IconButton>

          <TextField
            fullWidth
            label="Rule Group Name"
            name="ruleGroupName"
            value={newRuleGroup.ruleGroupName}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Organization"
            name="organization"
            value={newRuleGroup.organization}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle1" gutterBottom>
            Add Rules
          </Typography>
          <List>
            {predefinedRules.map((rule) => {
              const isSelected = newRuleGroup.rules.some((r) => r.id === rule.id);
              return (
                <ListItem key={rule.id} sx={{ borderBottom: '1px solid #eee' }}>
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleRuleToggle(rule)}
                  />
                  <ListItemText
                    primary={rule.name}
                    secondary={
                      isSelected ? (
                        <>
                          <FormControl sx={{ mr: 2, width: '120px' }} size="small">
                            <InputLabel>Operator</InputLabel>
                            <Select
                              value={
                                newRuleGroup.rules.find((r) => r.id === rule.id)
                                  ?.conditions.operator
                              }
                              onChange={(e) =>
                                handleConditionChange(
                                  rule.id,
                                  'operator',
                                  e.target.value
                                )
                              }
                              label="Operator"
                              sx={{ height: '40px' }} // Set height to match TextField
                            >
                              {operators.map((operator) => (
                                <MenuItem key={operator} value={operator}>
                                  {operator}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <TextField
                            label="Value"
                            value={
                              newRuleGroup.rules.find((r) => r.id === rule.id)
                                ?.conditions.value
                            }
                            onChange={(e) =>
                              handleConditionChange(
                                rule.id,
                                'value',
                                e.target.value
                              )
                            }
                            sx={{ mr: 2, width: '100px', height: '40px' }} // Set height to match Select
                            size="small"
                          />
                          <TextField
                            label="Unit"
                            value={
                              newRuleGroup.rules.find((r) => r.id === rule.id)
                                ?.conditions.unit
                            }
                            onChange={(e) =>
                              handleConditionChange(
                                rule.id,
                                'unit',
                                e.target.value
                              )
                            }
                            sx={{ width: '100px', height: '40px' }} // Set height to match Select
                            size="small"
                          />
                          <FormControl sx={{ width: '200px', ml: 2 }} size="small">
                            <InputLabel>Actions</InputLabel>
                            <Select
                              multiple
                              value={
                                newRuleGroup.rules.find((r) => r.id === rule.id)
                                  ?.actions
                              }
                              onChange={(e) =>
                                handleActionChange(rule.id, e.target.value)
                              }
                              label="Actions"
                              sx={{ height: '40px' }} // Set height to match TextField
                            >
                              {actions.map((action) => (
                                <MenuItem key={action} value={action}>
                                  {action}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </>
                      ) : (
                        `Condition: ${rule.conditions.parameter} ${rule.conditions.operator} ${rule.conditions.value} ${rule.conditions.unit}`
                      )
                    }
                  />
                </ListItem>
              );
            })}
          </List>

          <Button
            variant="contained"
            fullWidth
            onClick={handleAddRuleGroup}
            sx={{ mt: 2 }}
          >
            {isEditMode ? 'Update Rule Group' : 'Save Rule Group'}
          </Button>
        </Box>
      </Modal>
    </>
  );
};