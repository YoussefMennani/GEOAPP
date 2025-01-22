import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton, Divider } from '@mui/material';
import {
    deleteOrganization,
  getOrganizationByIdSlice,
  openModalAddOrganizationHeader,
  saveChnagesTargetOrg,
  saveOrganizationSlice,
  setTargetEntity,
} from '../../slices/organizationSlice';
import OrganizationRow from './OrganizationRow';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ModalAddMenuHeader from './modal/ModalAddMenuHeader';

const Organization = () => {
  const { organizationTarget } = useSelector((state) => state.organization);
  const location = useLocation();
  const navigate = useNavigate();
  const { organizationData } = location.state || {};
  const dispatch = useDispatch();

  // Redirect if organizationData is missing
  useEffect(() => {
    if (!organizationData) {
      navigate('/organization');
    }
  }, [organizationData, navigate]);

  // Fetch organization data
  useEffect(() => {
    if (organizationData) {
      dispatch(getOrganizationByIdSlice(organizationData.id));
    }
  }, [organizationData, dispatch]);

  // Add a new child organization
  const addChildOrganization = (organizationData) => {
    dispatch(setTargetEntity(organizationData))
    dispatch(openModalAddOrganizationHeader())
  };

  // Helper function to recursively add a child
  const addChildToOrganization = (children, parentId, newChild) => {
    return children.map((child) => {
      if (child.id === parentId) {
        return {
          ...child,
          children: [...child.children, newChild],
        };
      } else if (child.children.length > 0) {
        return {
          ...child,
          children: addChildToOrganization(child.children, parentId, newChild),
        };
      }
      return child;
    });
  };

  // Delete an organization
  const handleDelete = (id) => {
    dispatch(deleteOrganization(id));
};

  // Helper function to recursively delete a child
  const deleteChildFromOrganization = (children, id) => {
    return children
      .filter((child) => child.id !== id) // Remove the target organization
      .map((child) => ({
        ...child,
        children: deleteChildFromOrganization(child.children, id), // Recursively process children
      }));
  };

  // Toggle collapse/expand for an organization
  const toggleCollapse = (id) => {
    const updatedOrganization = {
      ...organizationTarget,
      children: toggleCollapseInOrganization(organizationTarget.children, id),
    };

    dispatch(saveChnagesTargetOrg(updatedOrganization));
  };

  // Helper function to recursively toggle collapse
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


  const onClickShowModalAddEntity = () =>{
    console.log(organizationData)
    dispatch(setTargetEntity(organizationData))
    dispatch(openModalAddOrganizationHeader())
  }
  return (
    <>
      <div className="d-flex justify-content-between align-items-end my-3">
        <div className="fs-5">
          <span className="text-muted fw-light">Organization /</span> Organization Manager /{' '}
          {organizationData?.name || ''}
        </div>
        <div>
          <button
            type="button"
            className="btn btn-dark"
            onClick={onClickShowModalAddEntity}
          >
            <span className="tf-icons bx bx bxs-add-to-queue me-2"></span> Add Organization
          </button>
        </div>
      </div>

      {organizationTarget.children &&
        organizationTarget.children.map((org, index) => (
          <div
            key={org.id || index}
            style={{ padding: '20px 0px', backgroundColor: 'white', borderRadius: '5px', margin: '10px 0px' }}
          >
            <div className="row px-2">
              <div className="col-md-2">
                <IconButton
                  color="primary"
                  aria-label="add an alarm"
                  style={{ backgroundColor: '#b3b3f1db', margin: 'auto 10px' }}
                  onClick={() => addChildOrganization(org)}
                >
                  <PlaylistAddIcon />
                </IconButton>
                <IconButton
                  color="warning"
                  aria-label="add an alarm"
                  style={{ backgroundColor: '#ff000026' }}
                  onClick={() => handleDelete(org.id)}
                >
                  <LayersClearIcon />
                </IconButton>
              </div>
              <div className="col-md-10" style={{ textAlign: 'right' }} onClick={() => toggleCollapse(org.id)}>
                <h4 style={{ margin: 'auto 20px' }}>
                  {org.collapsed ? (
                    <IconButton color="secondary" aria-label="add an alarm" onClick={() => toggleCollapse(org.id)}>
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      color="secondary"
                      aria-label="add an alarm"
                      onClick={() => toggleCollapse(org.id)}
                      disabled={org.children.length === 0}
                    >
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  )}{' '}
                  {org.name}
                </h4>
              </div>
            </div>
            {org.collapsed && <OrganizationRow data={org.children} />}
          </div>
        ))}

      <ModalAddMenuHeader/>
    </>
  );
};

export default Organization;