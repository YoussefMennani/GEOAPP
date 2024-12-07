import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import BannerUpTable from '../layouts/BannerUpTable';
import ModalAddBrand from './modals/model/ModalAddModel';
import ModalConfirmDeletion from './modals/model/ModalConfirmDeletion';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrandsSlice, getAllModelsSlice, openModalDeleteBrand, openModalDeleteModel, openModalEditBrand, openModalEditModel } from '../../slices/brandSlice';
import ModalAddModel from './modals/model/ModalAddModel';
import Badge from '../../components/atoms/Badges';


const Model = () => {

  const dispatch = useDispatch();
  const { listModel, status } = useSelector((state) => state.trackers.model);

  const [modelState, setModelState] = useState({
    modelId: "",
    modelName: "",
    features: [],
    batteryLife: "",
    networkType: "",
    brand: "",
    status:""
  });

  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllModelsSlice());
      // dispatch(getAllBrandsSlice());

    }
  }, [status, dispatch]);



  const onClickDeleteModel = (modelIdTarget, modelNameTarget) => {
    console.log(modelIdTarget)
    setModelState({
      modelId: modelIdTarget,
      modelName: modelNameTarget
    })
    dispatch(openModalDeleteModel())
  }


  const onClickUpdateModel = (modelIdTarget, modelName, features,batteryLife,networkType,brand) => {

    setModelState({
      modelId: modelIdTarget,
      modelName: modelName,
      features: features,
      batteryLife:batteryLife,
      networkType:networkType,
      brand:brand.id
    })
    setIsEdit(true)
    dispatch(openModalEditModel())
    console.log(`Update row ${modelIdTarget}`);
  };


  const onClickAddButton = () => {
    dispatch(openModalEditModel())
    setModelState({
      modelId: "",
      modelName: "",
      features: [],
      batteryLife: "",
      networkType: "",
      brand: "",
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
        accessorKey: 'modelName',
        header: 'Model Name',
        size: 150,
      },
      {
        accessorKey: 'batteryLife',
        header: 'Battery Life',
        size: 150,
      },
      {
        accessorKey: 'networkType',
        header: 'Network Type',
        size: 150,
        Cell: ({ row }) => (
              <Badge type="label-primary"  rounded><b>{row.original.networkType}</b></Badge>
          )        
      },
      {
        accessorKey: 'brand.brandName',
        header: 'Brand',
        size: 150,
      },
      {
        accessorKey: 'features',
        header: 'Features',
        size: 150,
        Cell: ({ row }) => (
          row.original.features && row.original.features.map( feature =>{
              return <Badge  type="label-dark"  rounded>{feature}</Badge>
          })
        )
      },

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
                onClickUpdateModel(row.original.id, row.original.modelName, row.original.features,row.original.batteryLife, row.original.networkType, row.original.brand);

                // modelId: "",
                // modelName: "",
                // features: [],
                // batteryLife: "",
                // networkType: "",
                // brand: "",

              }}
            >
              <span className="tf-icons bx bxs-pencil"></span>
            </button>

            <button
              type="button"
              className="btn btn-danger btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#modalToggle"
              onClick={() => onClickDeleteModel(row.original.id, row.original.modelName)}
            >
              <span className="tf-icons bx bx-trash"></span>
            </button>

            {/* <Button onClick={handleOpen}>Open modal</Button> */}


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
        childPath="Model"
        imageButton="bx bx-layer-plus"
        labelButton="Add Brand"

        setIsEdit={setIsEdit}
        setModelState={setModelState}

        onClickAddButton={onClickAddButton}

      />
      <ModalAddModel modelState={modelState} isEdit={isEdit} setModelState={setModelState} />
      <ModalConfirmDeletion model={modelState}
      />
      <MaterialReactTable columns={columns} data={listModel} state={{ isLoading: status != "succeeded" ? true : false }}
      />;
    </>
  );
};

export default Model;
