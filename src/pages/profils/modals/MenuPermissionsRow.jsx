import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LoupeIcon from '@mui/icons-material/Loupe';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import { toast } from 'react-toastify';
import { handleExpandMenu } from '../../../slices/profilSlice';

const MenuPermissionsRow = ({ data }) => {
    const { menuList } = useSelector((state) => state.profil);

    const dispatch = useDispatch();

    //////////////////////////////////////////// UPDATE collapsed
    const handleChangeDisplay = (id) => {
        console.log(menuList)
        const updatedMenu = menuList.data.map((item) => {
            return { header: item.header, items: getItem(item.items, id), collapsed: item.collapsed }
        })
        console.log(updatedMenu);
        dispatch(handleExpandMenu({
            menuName: menuList.menuName,
            data: updatedMenu
        }))
    }

    const getItem = (menuList, targetId) => {
        return menuList.map(item => {
            // Create a shallow copy of the item to avoid mutation
            const newItem = { ...item };

            if (newItem.id === targetId) {
                console.log("found !!!!!!!!!!");
                newItem.collapsed = !newItem.collapsed; // Update the copy, not the original
            }

            if (newItem.submenu) {
                // Recursively process the submenu
                newItem.submenu = getItem(newItem.submenu, targetId);
            }

            return newItem;
        });
    };

    const addMenu = (targetId) => {
        console.log(targetId, menuList)
        const updatedMenu = menuList.data.map((item) => {
            return { header: item.header, items: addItem(item.items, targetId) }
        })
        console.log(updatedMenu);
        dispatch(handleExpandMenu({
            menuName: menuList.menuName,
            data: updatedMenu
        }))
        // handleChangeDisplay(targetId)
    }

    const addItem = (menuList, targetId) => {
        return menuList.map(item => {
            // Create a shallow copy of the item to avoid mutation
            const newItem = { ...item };

            if (newItem.id === targetId) {
                console.log("found !!!!!!!!!!");

                // Ensure submenu is an array and replace it with a new array
                newItem.collapsed = true
                newItem.submenu = [
                    ...(newItem.submenu || []),

                    {
                        id: Math.random(),
                        text: null,
                        available: true,
                        link: null,
                        collapsed: false
                    }
                ];
            }

            if (newItem.submenu) {
                // Recursively process the submenu
                newItem.submenu = addItem(newItem.submenu, targetId); // Recursive call
            }

            return newItem;
        });
    };

    const [menuState, setMenuState] = useState({
        text: null,
        link: null
    })

    const [errorsList, setErrorsList] = useState({
        text: "",
        link: ""
    })
    const [isTouched, setisTouched] = useState(false)

    const onChangeForm = (event) => {

        if (isTouched == false)
            setisTouched(true)
        const { name, value } = event.target;

        setMenuState(prevState => ({
            ...prevState,
            [name]: value
        }));

        setErrorsList(prevErrors => ({
            ...prevErrors,
            [name]: ""
        }));

    };


    // ---------------------------------------------- add MENU ----------------------------------------------
    const onClickValidateAddMenu = (id) => {
        console.log(menuList, menuState)
        if (menuState.link != null && menuState.text != null) {

            const updatedMenu = menuList.data.map((item) => {
                return { header: item.header, items: updateItem(item.items, id) }
            })

            console.log(updatedMenu);
            dispatch(saveMenuSlice(
                {
                    menuName: menuList.menuName,
                    data: updatedMenu
                }))
            setMenuState((prev) => ({ ...prev, link: "", text: "" }))
        } else {
            let errors = { text: "", link: "" };

            if (!menuState.text || menuState.text.trim() === "") {
                errors.text = "text is required.";
            }

            if (!menuState.link || menuState.link.trim() === "") {
                errors.link = "link is required.";
            }

            setErrorsList(errors); // Update errors state


            toast.error("fill all the required inputs")
        }
    }

    const updateItem = (menuList, targetId) => {
        return menuList.map(item => {
            // Create a shallow copy of the item to avoid mutation
            const newItem = { ...item };

            if (newItem.id === targetId) {
                console.log(newItem)
                console.log("found !!!!!!!!!!");
                newItem.text = menuState.text; // Update the copy, not the original
                newItem.link = menuState.link; // Update the copy, not the original
            }

            if (newItem.submenu) {
                // Recursively process the submenu
                newItem.submenu = updateItem(newItem.submenu, targetId);
            }

            return newItem;
        });
    };

    const handleEditMenu = (id, text, link) => {
        console.log(id, text, link)
        console.log(menuList)
        const updatedMenu = menuList.map((item) => {
            return { header: item.header, items: updateisEdit(item.items, id) }
        })
        console.log(updatedMenu);
        setMenuState((prev) => ({ ...prev, text: text, link: link }))
        dispatch(saveMenuSlice(updatedMenu))
    }

    const updateisEdit = (menuList, targetId) => {
        return menuList.map(item => {
            // Create a shallow copy of the item to avoid mutation
            const newItem = { ...item };

            if (newItem.id === targetId) {
                console.log("found !!!!!!!!!!");
                newItem.isEdit = !newItem.isEdit; // Update the copy, not the original
            }

            if (newItem.submenu) {
                // Recursively process the submenu
                newItem.submenu = updateisEdit(newItem.submenu, targetId);
            }

            return newItem;
        });
    };

    const onChangeCheckBox = (id, operation, event) => {
        const isChecked = event.target.checked; // Get the checkbox state
        console.log(id, operation, isChecked);
    
        const updatedMenu = menuList.data.map((item) => ({
            ...item,
            items: onChangeSubCheckBox(item.items, id, operation, isChecked),
        }));
    
        dispatch(
            handleExpandMenu({
                menuName: menuList.menuName,
                data: updatedMenu,
            })
        );
    };
    
    const onChangeSubCheckBox = (menuList, targetId, operation, isChecked) => {
        return menuList.map((item) => {
            const newItem = { ...item }; // Shallow copy for immutability
    
            if (newItem.id === targetId) {
                console.log(`operation update for item: ${targetId}`);
                // Update operation dynamically
                newItem.operation = {
                    ...newItem.operation,
                    [operation]: isChecked, // Toggle specific permission
                };
            }
    
            if (newItem.submenu) {
                // Recursively process submenus
                newItem.submenu = onChangeSubCheckBox(newItem.submenu, targetId, operation, isChecked);
            }
    
            return newItem;
        });
    };
    

    const deleteMenu = (id) => {
        console.log("delete");
        console.log(menuList);

        const updatedMenu = menuList.data.map((item) => {
            return { header: item.header, items: deleteSubMenu(item.items, id) };
        });

        console.log(updatedMenu);
        dispatch(saveMenuSlice({
            menuName: menuList.menuName,
            data: updatedMenu
        }));
    };

    const deleteSubMenu = (menuList, targetId) => {
        console.log("deleteSubMenu");

        return menuList
            .filter(item => item.id !== targetId) // Remove the target item
            .map(item => {
                // If there's a submenu, process it recursively
                if (item.submenu) {
                    return {
                        ...item,
                        submenu: deleteSubMenu(item.submenu, targetId)
                    };
                }

                return item;
            });
    };


    
    return (

        data?.map((menuData) => {

            return (
                <div className='row p-3 m-3' style={{ border: "1px solid rgb(231 233 235 / 57%)", borderRadius: "3px", backgroundColor: "rgb(231 233 235 / 51%)" }}>

                    <div className='col-md-1' style={{ margin: "auto" }}>
                        {
                            menuData?.submenu && menuData?.submenu.length > 0 ? (
                                menuData.collapsed ?
                                    <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleChangeDisplay(menuData.id)}>
                                        <KeyboardArrowDownIcon />
                                    </IconButton>
                                    :
                                    <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleChangeDisplay(menuData.id)} >
                                        <KeyboardArrowRightIcon />
                                    </IconButton>
                            )
                                :
                                <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleChangeDisplay(menuData.id)} disabled={true}>
                                    <KeyboardArrowRightIcon />
                                </IconButton>
                        }
                    </div>
                    <div className='col-md-4' style={{ margin: "auto 0", fontSize: "16px" }}>
                        {
                            (menuData?.text != null && menuData?.link != null && menuData?.isEdit != true) ? `Name : ${menuData?.text}` :
                                <input
                                    type="text"
                                    id="text"
                                    name="text"
                                    className={`form-control ${errorsList.text ? "is-invalid" : ""}`}
                                    placeholder="Enter the name"
                                    value={menuState.text || ""}
                                    onChange={onChangeForm}
                                />
                        }
                    </div>
                    <div className='col-md-4' style={{ margin: "auto 0", fontSize: "16px" }}>

                        {
                            (menuData?.text != null && menuData?.link != null && menuData?.isEdit != true) ? `Link : ${menuData?.link}` :
                                <input
                                    type="text"
                                    id="link"
                                    name="link"
                                    className={`form-control ${errorsList.link ? "is-invalid" : ""}`}
                                    placeholder="Enter the link"
                                    value={menuState.link || ""}
                                    onChange={onChangeForm}
                                />
                        }
                    </div>
                    <div className="col-md-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }} >
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`create-${menuData?.id}`}
                                            checked={menuData?.operation?.create || false} // Checkbox state bound to the menu data
                                            onChange={(e) => onChangeCheckBox(menuData?.id, "create", e)} // Pass operation type as a parameter
                                        />
                                        <label className="form-check-label" htmlFor={`create-${menuData?.id}`}>
                                            Create
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`read-${menuData?.id}`}
                                            checked={menuData?.operation?.read || false} // Checkbox state bound to the menu data
                                            onChange={(e) => onChangeCheckBox(menuData?.id, "read", e)} // Pass operation type as a parameter
                                        />
                                        <label className="form-check-label" htmlFor={`read-${menuData?.id}`}>
                                            Read
                                        </label>
                                    </div>


                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`update-${menuData?.id}`}
                                            checked={menuData?.operation?.update || false} // Checkbox state bound to the menu data
                                            onChange={(e) => onChangeCheckBox(menuData?.id, "update", e)} // Pass operation type as a parameter
                                        />
                                        <label className="form-check-label" htmlFor={`update-${menuData?.id}`}>
                                            Update
                                        </label>
                                    </div>


                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`delete-${menuData?.id}`}
                                            checked={menuData?.operation?.delete || false} // Checkbox state bound to the menu data
                                            onChange={(e) => onChangeCheckBox(menuData?.id, "delete", e)} // Pass operation type as a parameter
                                        />
                                        <label className="form-check-label" htmlFor={`delete-${menuData?.id}`}>
                                            Delete
                                        </label>
                                    </div>
                                </div>

                    {menuData?.submenu && <div className='p-3 mt-3' style={{ backgroundColor: "white", display: menuData.collapsed ? "block" : "none" }}>
                        {menuData.submenu && <MenuPermissionsRow data={menuData.submenu} />}
                    </div>}


                </div>)

        })


    )
}

export default MenuPermissionsRow