import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import BannerUpTable from '../layouts/BannerUpTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrandsSlice, getAllModelsSlice, getAllTrackersSlice, openModalDeleteTracker, openModalEditTracker } from '../../slices/brandSlice';
import Badge from '../../components/atoms/Badges';
import ModalConfirmDeletion from './modals/ModalConfirmDeletion';
import ModalAddVehicle from './modals/ModalAddVehicle';
import { getAllVehiclesSlice, openModalAssignVehicle, openModalDeleteVehicle, openModalEditVehicle, openModalShowDriverInfo } from '../../slices/vehicleSlice';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { color, Stack } from '@mui/system';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FormatColorFillSharpIcon from '@mui/icons-material/FormatColorFillSharp';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import { Fab, Icon, MenuItem } from '@mui/material';
import keycloak from '../../keycloak/keycloak';
import ModalAssignVehicle from './modals/ModalAssignVehicle';
import DriverModalInfo from './modals/DriverModalInfo';
import { getAllDriversSlice } from '../../slices/driverSlice';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';


const Vehicles = () => {

  const dispatch = useDispatch();
  // const { listTrackers } = useSelector((state) => state.trackers);
  const { listVehicles, status } = useSelector((state) => state.vehicles);
  const [entityState, setEntityState] = useState({
    id: "",
    licensePlate: "",
    modelVehicle: "",
    brandVehicle: "",
    year: "",
    color: "",
    fuelType: "",
    status: "",
    // currentDriver:"",
    // lastPosition:"",
    tracker: "",
    organization: "",
    imgPath:""
  });

  const [driverTarget, setDriverTarget] = useState({})

  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllTrackersSlice());
      dispatch(getAllVehiclesSlice(keycloak.token))
      dispatch(getAllBrandsSlice());
      dispatch(getAllDriversSlice(keycloak.token))
      dispatch(getAllModelsSlice());

    }
  }, [status, dispatch]);



  const onClickAssignVlModel = (vehicleId, licensePlate) => {
    console.log(vehicleId, licensePlate)
    // Update the brand state
    setEntityState(prevState => ({
      ...prevState,
      id: vehicleId,
      licensePlate: licensePlate
    }));

    dispatch(openModalAssignVehicle())
  }


  const onClickUpdateModel = (id, licensePlate, modelVehicle, brandVehicle, year, color, fuelType, status, tracker, organization) => {

    setEntityState({
      id: id,
      licensePlate: licensePlate,
      modelVehicle: modelVehicle,
      brandVehicle: brandVehicle,
      year: year,
      color: color,
      fuelType: fuelType,
      status: status,
      tracker: tracker.trackerId,
      organization: organization
    })
    setIsEdit(true)
    dispatch(openModalEditVehicle())

  };


  const onClickAddButton = () => {
    dispatch(openModalEditVehicle())
    clearState()
    setIsEdit(false)
  }

  const onClickShowDriverInfo = (driverData, vehicleId) => {
    console.log("gfgggg")
    setDriverTarget(driverData)
    setVehicleTarget(vehicleId)
    dispatch(openModalShowDriverInfo())

  }
  const clearState = () => {
    setEntityState({
      id: "",
      licensePlate: "",
      modelVehicle: "",
      brandVehicle: "",
      year: "",
      color: "",
      fuelType: "",
      status: "",
      tracker: "",
      organization: ""
    })
  }
  const columns = useMemo(
    () => [

      // modelId: "",
      // modelName: "",
      // features: "",
      // batteryLife: "",
      // networkType: "",
      // brand: "",

      {
        accessorKey: 'licensePlate',
        header: 'license Plate',
        size: 150,
      },
      {
        accessorKey: 'modelVehicle',
        header: 'model',
        size: 100,
      },
      {
        accessorKey: 'brandVehicle',
        header: 'brand',
        size: 150,
      },
      {
        accessorKey: 'isMoving',
        header: 'moving',
        size: 50,
        Cell: ({ row }) => (
          row.original.isMoving ?
            <span className="spinner-grow spinner-grow-sm text-success" role="status"></span> :
            <FiberManualRecordIcon sx={{ color: 'red' }} />
        ),
      },


      {
        accessorKey: 'year',
        header: 'year',
        size: 100,
      },
      {
        accessorKey: 'color',
        header: 'color',
        size: 150,
        Cell: ({ row }) => {
          return (
            <Badge type="label-secondary" rounded><ColorLensTwoToneIcon sx={{ color: `${row.original.color}` }} /></Badge>
          )
        }
      },
      {
        accessorKey: 'fuelType',
        header: 'fuelType',
        size: 150,
      },
      {
        accessorKey: 'organization',
        header: 'organization',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'status',
        size: 100,
        Cell: ({ row }) => {
          return <Badge type={`label-${row.original.status == "WORKING" ? 'success' : row.original.status == "INACTIVE" ? 'dark' : 'danger'
            }`}
            rounded><b>{row.original.status}</b></Badge>
        }
      },
      // {
      //   accessorKey: 'features',
      //   header: 'Features',
      //   size: 150,
      //   Cell: ({ row }) => (
      //     row.original.features && row.original.features.map( feature =>{

      //         return <Badge  type="label-dark"  rounded>{feature}</Badge>

      //     })

      //   )
      // },

      // {
      //   id: 'actions',
      //   header: 'actions',
      //   size: 100,
      //   Cell: ({ row }) => (
      //     <div class="d-grid gap-2 d-md-flex">



      //       {
      //         row?.original?.currentDriver != null ?
      //           <button
      //             type="button"
      //             className="btn btn-success btn-sm"
      //             data-bs-toggle="modal"
      //             data-bs-target="#modalToggle"
      //             onClick={() => onClickShowDriverInfo(row?.original?.currentDriver, row?.original?.id)}
      //           >
      //             <i class='bx bxs-user-circle'></i>
      //           </button>
      //           :
      //           <button
      //             type="button"
      //             className="btn btn-dark btn-sm"
      //             data-bs-toggle="modal"
      //             data-bs-target="#modalToggle"
      //             onClick={() => onClickAssignVlModel(row.original.id, row.original.licensePlate)}
      //           >
      //             <i class='bx bx-link-alt'></i>
      //           </button>
      //       }



      //       <button
      //         type="button"
      //         className="btn btn-primary btn-sm"
      //         data-bs-toggle="modal"
      //         data-bs-target="#modalCenter"
      //         onClick={() => {
      //           console.log("updating brand ....")
      //           onClickUpdateModel(row.original.id, row.original.licensePlate, row.original.modelVehicle, row.original.brandVehicle, row.original.year,
      //             row.original.color, row.original.fuelType, row.original.status, row.original.tracker, row.original.organization);

      //         }}
      //       >
      //         <span className="tf-icons bx bxs-pencil"></span>
      //       </button>

      //       <button
      //         type="button"
      //         className="btn btn-danger btn-sm"
      //         data-bs-toggle="modal"
      //         data-bs-target="#modalToggle"
      //         onClick={() => onClickDeleteModel(row.original.id, row.original.licensePlate)}
      //       >
      //         <span className="tf-icons bx bx-trash"></span>
      //       </button>




      //     </div>
      //   ),
      // },
    ],
    []
  );


  const onClickDeleteModel = (id,licensePlate)=>{

    setEntityState(prevState => ({
      ...prevState,
      id: id,
      licensePlate: licensePlate
    }));

    dispatch(openModalDeleteVehicle())
  }


  const [vehicleTarget, setVehicleTarget] = useState("");

  return (
    <>

      <BannerUpTable
        parentPath="Vehicle"
        childPath="Vehicle Manager"
        imageButton="bx bx-layer-plus"
        labelButton="Add Vehicle"

        setIsEdit={setIsEdit}
        setModelState={setEntityState}

        onClickAddButton={onClickAddButton}

      />
      <ModalAddVehicle entityState={entityState} isEdit={isEdit} setEntityState={setEntityState} />
      <ModalConfirmDeletion entity={entityState} />
      <ModalAssignVehicle entity={entityState} />
      <MaterialReactTable columns={columns} data={listVehicles} state={{ isLoading: status != "succeeded" ? true : false }}
        enableRowActions
        renderRowActionMenuItems={({ row }) => [
          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
              <List>
                
            {
              row?.original?.currentDriver != null ?
                <ListItem disablePadding  onClick={() => onClickShowDriverInfo(row?.original?.currentDriver, row?.original?.id)} >
                  <ListItemButton>
                    <ListItemIcon>
                      <AccountCircleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Driver" />
                  </ListItemButton>
                </ListItem> :
                 <ListItem disablePadding onClick={() => onClickAssignVlModel(row.original.id, row.original.licensePlate)} >
                 <ListItemButton>
                   <ListItemIcon>
                     <NoAccountsIcon/>
                   </ListItemIcon>
                   <ListItemText primary="Assign Driver" />
                 </ListItemButton>
               </ListItem> 
        }
                <ListItem disablePadding  onClick={() => {
                console.log("updating brand ....")
                onClickUpdateModel(row.original.id, row.original.licensePlate, row.original.modelVehicle, row.original.brandVehicle, row.original.year,
                  row.original.color, row.original.fuelType, row.original.status, row.original.tracker, row.original.organization);

              }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Edit" sx />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => onClickDeleteModel(row.original.id, row.original.licensePlate)} >
                  <ListItemButton>
                    <ListItemIcon>
                      <DeleteIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                  </ListItemButton>
                </ListItem>

              </List>
            </nav>
          </Box>
        ]}
      />;
      <DriverModalInfo driverInfo={driverTarget} vehicleId={vehicleTarget} />
    </>
  );
};

export default Vehicles;
