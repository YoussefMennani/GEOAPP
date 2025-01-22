import { Divider, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import LayersClearIcon from '@mui/icons-material/LayersClear';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuPermissionsRow from './MenuPermissionsRow'
import { getMenuProfilSlice, handleExpandMenu } from '../../../slices/profilSlice';

const MenuPermissions = () => {
    const { menuList } = useSelector((state) => state.profil);
    const dispatch = useDispatch();


    useEffect(() => {
        // dispatch(getMenuProfilSlice("menu1"))

    }, [])


    const handleChangeDisplay = (header) => {
        console.log(header, menuList)
        const updatedMenu = menuList.data.map((item) => {
            const newItem = { ...item }
            if (item.header == header) {
                newItem.collapsed = !newItem.collapsed
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


    const onChangeCheckBox = (header, operation, event) => {
        const isChecked = event.target.checked; // Get the checkbox's checked state
        console.log(header, menuList);
    
        const updatedMenu = menuList.data.map((item) => {
            if (item.header === header) {
                return {
                    ...item,
                    items: item.items ? changeSubItems(item.items, operation, isChecked) : [],
                    operation: {
                        ...item.operation,
                        [operation]: isChecked // Update only the relevant operation
                    }
                };
            }
            return item;
        });
    
        console.log(updatedMenu);
        dispatch(handleExpandMenu({
            menuName: menuList.menuName,
            data: updatedMenu
        }));
    };
    
    const changeSubItems = (subItems, operation, isChecked) => {
        console.log(subItems);
        const updatedSubItems = subItems?.map((item) => {
            console.log(item);
            const newOne = {
                ...item,
                operation: {
                    ...item.operation,
                    [operation]: isChecked // Update only the relevant operation
                }
            };
    
            // Recursively update submenu items if they exist
            if (item.submenu && item.submenu.length > 0) {
                newOne.submenu = changeSubItems(item.submenu, operation, isChecked);
            }
    
            return newOne;
        });
    
        console.log(updatedSubItems);
        return updatedSubItems;
    };


    return (

        <>


            {
                menuList.data && menuList.data.map((val) => {

                    return (
                        <div style={{ padding: "20px 0px", backgroundColor: "white",border:"1px solid #8080803d", borderRadius: "5px", margin: "10px 0px" }}>
                            <div className='row px-2'>

                                <div className="col-md-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }} >
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`create-${val?.header}`}
                                            checked={val?.operation?.create || false} // Checkbox state bound to the menu data
                                            onChange={(e) => onChangeCheckBox(val?.header, "create", e)} // Pass operation type as a parameter
                                        />
                                        <label className="form-check-label" htmlFor={`create-${val?.header}`}>
                                            Create
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`read-${val?.header}`}
                                            checked={val?.operation?.read || false} // Checkbox state bound to the menu data
                                            onChange={(e) => onChangeCheckBox(val?.header, "read", e)} // Pass operation type as a parameter
                                        />
                                        <label className="form-check-label" htmlFor={`read-${val?.header}`}>
                                            Read
                                        </label>
                                    </div>


                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`update-${val?.header}`}
                                            checked={val?.operation?.update || false} // Checkbox state bound to the menu data
                                            onChange={(e) => onChangeCheckBox(val?.header, "update", e)} // Pass operation type as a parameter
                                        />
                                        <label className="form-check-label" htmlFor={`update-${val?.header}`}>
                                            Update
                                        </label>
                                    </div>


                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`delete-${val?.header}`}
                                            checked={val?.operation?.delete || false} // Checkbox state bound to the menu data
                                            onChange={(e) => onChangeCheckBox(val?.header, "delete", e)} // Pass operation type as a parameter
                                        />
                                        <label className="form-check-label" htmlFor={`delete-${val?.header}`}>
                                            Delete
                                        </label>
                                    </div>
                                </div>

                                <div className='col-md-9 ' style={{ textAlign: "right" }} onClick={() => handleChangeDisplay(val.header)} >
                                    <h4 style={{ margin: " auto 20px" }}>  {
                                        val.collapsed ?
                                            <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleChangeDisplay(val.header)}>
                                                <KeyboardArrowDownIcon />
                                            </IconButton>
                                            :
                                            <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleChangeDisplay(val.header)} >
                                                <KeyboardArrowRightIcon />
                                            </IconButton>
                                    } {val.header}</h4>

                                </div>
                            </div>
                            {/* <Divider/> */}

                            {val.collapsed && <MenuPermissionsRow data={val.items} />}

                        </div>
                    )
                })
            }

        </>
    )
}

export default MenuPermissions