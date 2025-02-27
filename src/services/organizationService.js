const toggleVisibility = (org, id) => {
    if (org.id === id) {
        org.visible = !org.visible;
    }
    if (org.children && org.children.length > 0) {
        org.children.forEach(child => toggleVisibility(child, id));
    }
    return org;
}

export default toggleVisibility;