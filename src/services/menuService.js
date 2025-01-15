// menuService.js

const addOperationField = (menuList) => {
  
    const updatedMenu = menuList.data.map((item) => ({
      ...item,
      operation : {
        create: false,
        read: false,
        update: false,
        delete: false,
      },
      items: onChangeSubCheckBox(item.items),
    }));
  
    return {
      menuName: menuList.menuName,
      data: updatedMenu,
    };
  };
  
  const onChangeSubCheckBox = (menuList) => {
    return menuList.map((item) => {
      const newItem = { ...item }; // Shallow copy for immutability
  

        newItem.operation = {
          create: false,
          read: false,
          update: false,
          delete: false,
        };
      
  
      if (newItem.submenu) {
        newItem.submenu = onChangeSubCheckBox(newItem.submenu);
      }
  
      return newItem;
    });
  };
  
  // Use ES6 export
  export { addOperationField };
  