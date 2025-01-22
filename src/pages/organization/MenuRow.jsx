import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LoupeIcon from '@mui/icons-material/Loupe';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { handleExpandMenu, saveMenuSlice } from '../../slices/menuSlice';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import { toast } from 'react-toastify';

const MenuRow = ({ data }) => {
    const { menuList } = useSelector((state) => state.menu);

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
            return { header: item.header, items: addItem(item.items, targetId), collapsed: item.collapsed }
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
                        icon:null,
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
        link: null,
        icon:null,
    })

    const [errorsList, setErrorsList] = useState({
        text: "",
        link: "",
        icon:"",
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
        if (menuState.link != null && menuState.text != null  && menuState.icon != null) {

            const updatedMenu = menuList.data.map((item) => {
                return { header: item.header, items: updateItem(item.items, id) }
            })

            console.log(updatedMenu);
            dispatch(saveMenuSlice(
                {
                    menuName: menuList.menuName,
                    data: updatedMenu
                }))
            setMenuState((prev) => ({ ...prev, link: "", text: "",icon:"" }))
        } else {
            let errors = { text: "", link: "" , icon:"" };

            if (!menuState.text || menuState.text.trim() === "") {
                errors.text = "text is required.";
            }

            if (!menuState.link || menuState.link.trim() === "") {
                errors.link = "link is required.";
            }

            if (!menuState.icon || menuState.icon.trim() === "") {
                errors.icon = "link is required.";
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
                newItem.icon = menuState.icon
            }

            if (newItem.submenu) {
                // Recursively process the submenu
                newItem.submenu = updateItem(newItem.submenu, targetId);
            }

            return newItem;
        });
    };

    const handleEditMenu = (id, text, link,icon) => {
        console.log(id, text, link,icon)
        console.log(menuList)
        const updatedMenu = menuList.data.map((item) => {
            return {  ...item, header: item.header, items: updateisEdit(item.items, id) }
        })
        console.log( { menuName:menuList.menuName,data:updatedMenu});
         setMenuState((prev) => ({ ...prev, text: text, link: link, icon:icon }))
        dispatch(handleExpandMenu({ menuName:menuList.menuName,data:updatedMenu}))
    }

    const updateisEdit = (menuList, targetId) => {
        return menuList.map(item => {
            // Create a shallow copy of the item to avoid mutation
            const newItem = { ...item };

            if (newItem.id === targetId) {
                console.log("found !!!!!!!!!!");
                newItem.isEdit = !newItem.isEdit; // Update the copy, not the original
                newItem.collapsed = menuState.collapsed

            }

            if (newItem.submenu) {
                // Recursively process the submenu
                newItem.submenu = updateisEdit(newItem.submenu, targetId);
            }

            return newItem;
        });
    };

    const handleUpdateMenu = (id, text, link) => {
        const updatedMenu = menuList.data.map((item) => {
            return { header: item.header, items: handleUpdateSubMenu(item.items, id) }
        })
        dispatch(handleExpandMenu({
            menuName: menuList.menuName,
            data: updatedMenu
        }))
    }
    const handleUpdateSubMenu = (menuList, targetId) => {
        return menuList.map(item => {
            // Create a shallow copy of the item to avoid mutation
            const newItem = { ...item };

            if (newItem.id === targetId) {
                console.log("found !!!!!!!!!!");
                newItem.isEdit = !newItem.isEdit;
                newItem.text = menuState.text;
                newItem.link = menuState.link;
                newItem.icon = menuState.icon;
                // newItem.collapsed = menuState.collapsed
            }

            if (newItem.submenu) {
                // Recursively process the submenu
                newItem.submenu = handleUpdateSubMenu(newItem.submenu, targetId);
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
                    <div className='col-md-3' style={{ margin: "auto 0", fontSize: "16px" }}>
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
                    <div className='col-md-3' style={{ margin: "auto 0", fontSize: "16px" }}>

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

                    <div className='col-md-3' style={{ margin: "auto 0", fontSize: "16px" }}>

                        {
                            (menuData?.icon != null && menuData?.icon != null && menuData?.isEdit != true) ? `Icon : ${menuData?.icon}` :
                                <input
                                    type="text"
                                    id="icon"
                                    name="icon"
                                    className={`form-control ${errorsList.icon ? "is-invalid" : ""}`}
                                    placeholder="Enter the icon"
                                    value={menuState.icon || ""}
                                    onChange={onChangeForm}
                                />
                        }
                    </div>

                    <div className='col-md-2' style={{
                        display: "flex",
                        justifyContent: "space-between",

                    }} >
                        {menuData?.text == null || menuData?.link == null ?
                            <IconButton color="primary" aria-label="add an alarm" style={{ backgroundColor: "#b3b3f1db" }} onClick={() => onClickValidateAddMenu(menuData.id)}>
                                <CheckIcon />
                            </IconButton>
                            :
                            <>
                                <IconButton color="success" aria-label="add an alarm" style={{ backgroundColor: "#a5eaa5c7" }} onClick={() => addMenu(menuData.id)}>
                                    <AddIcon />
                                </IconButton>
                                {
                                    menuData.isEdit ?
                                        <IconButton color="primary" aria-label="add an alarm" style={{ backgroundColor: "#b3b3f1db" }}>
                                            <CheckIcon onClick={() => handleUpdateMenu(menuData.id, menuData.text, menuData.link,menuData.icon)} />
                                        </IconButton>
                                        :
                                        <IconButton color="primary" aria-label="add an alarm" style={{ backgroundColor: "#b3b3f1db" }}>
                                            <EditIcon onClick={() => handleEditMenu(menuData.id, menuData.text, menuData.link,menuData.icon)} />
                                        </IconButton>
                                }


                                <IconButton color="warning" aria-label="add an alarm" style={{ backgroundColor: "#ff000026" }}>
                                    <DeleteIcon onClick={() => deleteMenu(menuData.id)} />
                                </IconButton>
                            </>


                        }

                    </div>

                    {menuData?.submenu && <div className='p-3 mt-3' style={{ backgroundColor: "white", display: menuData.collapsed ? "block" : "none" }}>
                        {menuData && menuData.submenu.length > 0 && <MenuRow data={menuData.submenu} />}
                    </div>}


                </div>)

        })


    )
}

export default MenuRow