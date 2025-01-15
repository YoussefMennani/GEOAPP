import { Divider, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMenuSlice, handleExpandMenu, openModalMenu, saveMenuSlice } from '../../slices/menuSlice'
import BannerUpTable from '../layouts/BannerUpTable'
import ModalAddMenuHeader from './modal/ModalAddMenuHeader'
import OrganizationRow from './OrganizationRow'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useLocation, useNavigate } from 'react-router-dom'
import { getOrganizationByIdSlice, openModalAddOrganizationHeader, saveChnagesOrganization, saveChnagesTargetOrg, saveOrganizationSlice } from '../../slices/organizationSlice'

const Organization = () => {
    const { organizationTarget } = useSelector((state) => state.organization);
    const location = useLocation();
    const navigate = useNavigate();

    const { organizationData } = location.state || {}; 



    const dispatch = useDispatch();

    const onClickAddHeaderMenu = () => {
        dispatch(openModalAddOrganizationHeader())
    }

    useEffect(() => {
        // Redirect to fallback page if organizationData is missing
        if (!organizationData) {
          navigate('/organization');
        }
      }, [organizationData, navigate]);


useEffect(() => {
    if (organizationData) {
        console.log(organizationData);
        dispatch(getOrganizationByIdSlice(organizationData.id));
    }
}, [organizationData, dispatch]);



    const addMenu = (header) => {
        console.log(header, organizationTarget)
        const updatedMenu = organizationTarget.data.map((item) => {
            const newItem = { ...item }
            if (newItem.header == header) {
                newItem.collapsed = true
                newItem.items = [
                    ...(newItem.items || []),
                    {
                        id: Math.random(),
                        name: null,
                        collapsed: false,
                        items: []
                    }
                ];
            }
            return newItem
        })
        console.log(updatedMenu);
        dispatch(saveChnagesTargetOrg({
            ...organizationData,
            data: updatedMenu
        }))
        // handleChangeDisplay(targetId)
    }

    const deleteHeader = (headerName) => {
        const updatedMenu = organizationTarget.data.filter((item) => item.header != headerName)
        console.log(updatedMenu)
        dispatch(saveOrganizationSlice({
            ...organizationTarget,
            data: updatedMenu
        }))
        dispatch(saveChnagesTargetOrg({
            ...organizationTarget,
            data: updatedMenu
        }))

    }


    
    const handleChangeDisplay = (header) => {
    
        const updatedMenu = organizationTarget.data.map((item) => {
            const newItem = { ...item}
            if(item.header == header){
                newItem.collapsed=!newItem.collapsed
            }
            return newItem
        })
        console.log(updatedMenu);
        dispatch(saveChnagesTargetOrg({

           ...organizationTarget,
            data: updatedMenu
        }))
        // handleChangeDisplay(targetId)
    }


    return (

        <>


            <div class="d-flex justify-content-between  align-items-end my-3">
                <div className="fs-5">
                    <span className="text-muted fw-light"> Organization /</span> Organization Manager / {organizationData?.name || ''}
                </div>

                <div className="">
                    <button
                        type="button"
                        className="btn btn-dark "
                        onClick={() => onClickAddHeaderMenu()}
                    >
                        <span className={`tf-icons bx bx bxs-add-to-queue me-2`}></span> Add Menu
                    </button>

                </div>
            </div>



            {
                organizationTarget.data && organizationTarget.data.map((val,index) => {

                    return (
                        <div style={{ padding: "20px 0px", backgroundColor: "white", borderRadius: "5px", margin: "10px 0px" }}
                        key={val.header || index}

                        >
                            <div className='row px-2'>

                                <div className='col-md-2' >
                                   
                                    <IconButton color="primary" aria-label="add an alarm" style={{ backgroundColor: "#b3b3f1db", margin: "auto 10px" }} onClick={() => addMenu(val.header)} >
                                        <PlaylistAddIcon />
                                    </IconButton>
                                    <IconButton color="warning" aria-label="add an alarm" style={{ backgroundColor: "#ff000026" }} onClick={() => deleteHeader(val.header)} >
                                        <LayersClearIcon />
                                    </IconButton>
                                </div>
                                <div className='col-md-10 ' style={{ textAlign: "right" }} onClick={() => handleChangeDisplay(val.header)} >
                                    <h4 style={{ margin: " auto 20px" }}>  {
                                         val.collapsed ?
                                         <IconButton color="secondary" aria-label="add an alarm"  onClick={() => handleChangeDisplay(val.header)}>
                                             <KeyboardArrowDownIcon />
                                         </IconButton>
                                         :  
                                         <IconButton color="secondary" aria-label="add an alarm"  onClick={() => handleChangeDisplay(val.header)} disabled={  (val?.items  && val?.items.length > 0) == false } >
                                             <KeyboardArrowRightIcon />
                                         </IconButton>
                                    } {val.header}</h4>

                                </div>
                            </div>
                            {/* <Divider/> */}
                            { val.collapsed  && <OrganizationRow data={val.items} />}
                        
                        </div>
                    )
                })
            }

            <ModalAddMenuHeader />
        </>
    )
}

export default Organization