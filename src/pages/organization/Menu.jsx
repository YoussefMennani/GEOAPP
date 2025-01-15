import { Divider, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMenuSlice, handleExpandMenu, openModalMenu, saveMenuSlice } from '../../slices/menuSlice'
import BannerUpTable from '../layouts/BannerUpTable'
import ModalAddMenuHeader from './modal/ModalAddMenuHeader'
import OrganizationRow from './MenuRow'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Menu = () => {
    const { menuList } = useSelector((state) => state.menu);
    const dispatch = useDispatch();

    const onClickAddHeaderMenu = () => {
        dispatch(openModalMenu())
    }


    useEffect(() => {
        dispatch(getMenuSlice("menu1"))

    }, [])



    const addMenu = (header) => {
        console.log(header, menuList)
        const updatedMenu = menuList.data.map((item) => {
            const newItem = { ...item }
            if (newItem.header == header) {
                newItem.items = [
                    ...(newItem.items || []),
                    {
                        id: Math.random(),
                        text: null,
                        available: true,
                        link: null,
                        collapsed: false,
                        items: []
                    }
                ];
            }
            return newItem
        })
        console.log(updatedMenu);
        dispatch(handleExpandMenu({
            menuName: menuList.menuName,
            data: updatedMenu
        }))
        // handleChangeDisplay(targetId)
    }

    const deleteHeader = (headerName) => {
        const updatedMenu = menuList.data.filter((item) => item.header != headerName)
        console.log(updatedMenu)
        dispatch(saveMenuSlice({
            menuName: menuList.menuName,
            data: updatedMenu
        }))
    }


    
    const handleChangeDisplay = (header) => {
        console.log(header, menuList)
        const updatedMenu = menuList.data.map((item) => {
            const newItem = { ...item}
            if(item.header == header){
                newItem.collapsed=!newItem.collapsed
            }
            return newItem
        })
        console.log(updatedMenu);
        dispatch(handleExpandMenu({
            menuName: menuList.menuName,
            data: updatedMenu
        }))
        // handleChangeDisplay(targetId)
    }


    return (

        <>


            <div class="d-flex justify-content-between  align-items-end my-3">
                <div className="fs-5">
                    <span className="text-muted fw-light"> Menu /</span> Menu Manager
                </div>

                <div className="">
                    <button
                        type="button"
                        className="btn btn-dark "
                        onClick={() => onClickAddHeaderMenu()}
                    >
                        <span className={`tf-icons bx bx bxs-add-to-queue me-2`}></span> Add Header
                    </button>

                </div>
            </div>



            {
                menuList.data && menuList.data.map((val) => {

                    return (
                        <div style={{ padding: "20px 0px", backgroundColor: "white", borderRadius: "5px", margin: "10px 0px" }}>
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
                                         <IconButton color="secondary" aria-label="add an alarm"  onClick={() => handleChangeDisplay(val.header)} >
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

export default Menu