import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrganization, getOrganizationByIdSlice, openModalAddOrganizationHeader, saveChnagesTargetOrg, setTargetEntity } from '../../slices/organizationSlice';
import { toast } from 'react-toastify';

const OrganizationRow = ({ data }) => {
    const { organizationTarget } = useSelector((state) => state.organization);
    const dispatch = useDispatch();
    const [editState, setEditState] = useState({ id: null, name: '' });

    // Handle editing an organization
    const handleEdit = (id, name) => {
        setEditState({ id, name });
    };

    // // Save changes after editing
    // const handleSaveEdit = (id) => {
    //     if (!editState.name) {
    //         toast.error('Name is required');
    //         return;
    //     }

    //     const updatedOrganization = {
    //         ...organizationTarget,
    //         children: updateOrganizationName(organizationTarget.children, id, editState.name),
    //     };

    //     dispatch(saveChnagesTargetOrg(updatedOrganization));
    //     setEditState({ id: null, name: '' });
    // };

    // Helper function to recursively update organization name
    const updateOrganizationName = (children, id, newName) => {
        return children.map((child) => {
            if (child.id === id) {
                return { ...child, name: newName };
            } else if (child.children.length > 0) {
                return {
                    ...child,
                    children: updateOrganizationName(child.children, id, newName),
                };
            }
            return child;
        });
    };

    // Delete an organization
    const handleDelete = async (id) => {
        await dispatch(deleteOrganization(id)).unwrap();
        dispatch(getOrganizationByIdSlice(organizationTarget.id));

    };


    const addChildEntity = (organizationData) =>{
        dispatch(setTargetEntity(organizationData))
        dispatch(openModalAddOrganizationHeader())
    }

    const toggleCollapse = (id) => {
        const updatedOrganization = {
          ...organizationTarget,
          children: toggleCollapseInOrganization(organizationTarget.children, id),
        };
    
        dispatch(saveChnagesTargetOrg(updatedOrganization));
      };

      const toggleCollapseInOrganization = (children, id) => {
        return children.map((child) => {
          if (child.id === id) {
            return {
              ...child,
              collapsed: !child.collapsed,
            };
          } else if (child.children.length > 0) {
            return {
              ...child,
              children: toggleCollapseInOrganization(child.children, id),
            };
          }
          return child;
        });
      };

      

    return (
        <>
            {data.map((org) => (
                <div
                    key={org.id}
                    className="row p-3 m-3"
                    style={{ border: '1px solid rgb(231 233 235 / 57%)', borderRadius: '3px', backgroundColor: 'rgb(231 233 235 / 51%)' }}
                >
                    <div className="col-md-1" style={{ margin: 'auto' }}>
                        {org.children.length > 0 && (
                            <IconButton
                                color="secondary"
                                aria-label="add an alarm"
                                onClick={() => toggleCollapse(org.id)}
                            >
                                {org.collapsed ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                            </IconButton>
                        )}
                    </div>
                    <div className="col-md-9" style={{ margin: 'auto 0', fontSize: '16px' }}>
                        Name: {org.name}
                    </div>
                    <div className="col-md-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                       
                            <>
                                <IconButton color="success" aria-label="add" onClick={() => addChildEntity(org)}>
                                    <AddIcon />
                                </IconButton>
                                <IconButton color="primary" aria-label="edit" onClick={() => handleEdit(org.id, org.name)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="warning" aria-label="delete" onClick={() => handleDelete(org.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        
                    </div>
                    {org.collapsed && org.children.length > 0 && (
                        <div className="p-3 mt-3" style={{ backgroundColor: 'white' }}>
                            <OrganizationRow data={org.children} />
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};

export default OrganizationRow;