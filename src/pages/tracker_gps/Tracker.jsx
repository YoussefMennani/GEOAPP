import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import BannerUpTable from '../layouts/BannerUpTable';
import ModalAddBrand from './modals/model/ModalAddModel';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrandsSlice, getAllModelsSlice, getAllTrackersSlice, openModalDeleteBrand, openModalDeleteModel, openModalDeleteTracker, openModalEditBrand, openModalEditModel, openModalEditTracker } from '../../slices/brandSlice';
import ModalAddModel from './modals/model/ModalAddModel';
import Badge from '../../components/atoms/Badges';
import ModalAddTracker from './modals/tracker/ModalAddTracker';
import ModalConfirmDeletion from './modals/tracker/ModalConfirmDeletion';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Tracker = () => {

  const dispatch = useDispatch();
  const { listTrackers, status } = useSelector((state) => state.trackers);

  const [entityState, setEntityState] = useState({
    id: "",
    imei: "",
    model: "",
    brand: "",
    simSerialNumber: "",
    simNumber: "",
    status:""
  });

  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllTrackersSlice());
      dispatch(getAllBrandsSlice());
      dispatch(getAllModelsSlice());

    }
  }, [status, dispatch]);



  const onClickDeleteModel = (trackerId, trackerImei) => {
    console.log(trackerId,trackerImei)


        // Update the brand state
        setEntityState(prevState => ({
          ...prevState,
          id: trackerId,
          imei: trackerImei
        }));

    dispatch(openModalDeleteTracker())
  }


  const onClickUpdateModel = (id, imei, model, brand, simNumber, simSerialNumber,status) => {

    setEntityState({
      id: id,
      imei: imei,
      model: model,
      brand: brand,
      simSerialNumber: simSerialNumber,
      simNumber: simNumber,
      status:status
    })
    setIsEdit(true)
    dispatch(openModalEditTracker())

  };


  const onClickAddButton = () => {
    dispatch(openModalEditTracker())
    setEntityState({
      id: "",
      imei: "",
      model: "",
      brand: "",
      simSerialNumber: "",
      simNumber: "",
      status:""
    })
    setIsEdit(false)
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
        accessorKey: 'imei',
        header: 'IMEI',
        size: 150,
      },
      {
        accessorKey: 'simNumber',
        header: 'Sim Number',
        size: 100,
      },
      {
        accessorKey: 'simSerialNumber',
        header: 'Sim Seria lNumber',
        size: 150,
      },
      {
        accessorKey: 'isMoving',
        header: 'IsMoving',
        size: 50,
        Cell: ({ row }) => {
          return (
            <div
              className={`spinner-grow spinner-grow-sm ${
                row.original.isMoving ? 'text-success' : 'text-danger'
              }`}
              role="status"
            >
              <span className="visually-hidden">
                {row.original.isMoving ? 'Moving' : 'Not Moving'}
              </span>
            </div>
          );
        },
      },
      
      {
        accessorKey: 'model.brand.brandName',
        header: 'Brand',
        size: 100,
      },
      
      {
        accessorKey: 'model.modelName',
        header: 'Model',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        Cell: ({row})=>{
          return <Badge type={`label-${
            row.original.status =="WORKING" ? 'success' : row.original.status =="INACTIVE" ?  'dark' : 'danger'
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

      {
        id: 'actions',
        header: 'Actions',
        size: 100,
        Cell: ({ row }) => (
          <div class="d-grid gap-2 d-md-flex">


            <button
              type="button"
              className="btn btn-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#modalCenter"
              onClick={() => {
                console.log("updating brand ....")
                onClickUpdateModel(row.original.id, row.original.imei, row.original.model.id, row.original.model.brand.id, row.original.simNumber, row.original.simSerialNumber, row.original.status);

              }}
            >
              <span className="tf-icons bx bxs-pencil"></span>
            </button>

            <button
              type="button"
              className="btn btn-danger btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#modalToggle"
              onClick={() => onClickDeleteModel(row.original.id, row.original.imei)}
            >
              <span className="tf-icons bx bx-trash"></span>
            </button>

          


          </div>
        ),
      },
    ],
    []
  );



  return (
    <>

      <BannerUpTable
        parentPath="Gps Tracker"
        childPath="Tracker Manager"
        imageButton="bx bx-layer-plus"
        labelButton="Add Tracker"

        setIsEdit={setIsEdit}
        setModelState={setEntityState}

        onClickAddButton={onClickAddButton}

      />
      <ModalAddTracker entityState={entityState} isEdit={isEdit} setEntityState={setEntityState} />
      <ModalConfirmDeletion entity={entityState}
      />
      <MaterialReactTable columns={columns} data={listTrackers} state={{ isLoading: status != "succeeded" ? true : false }}
      />;
    </>
  );
};

export default Tracker;
