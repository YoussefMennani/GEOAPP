import { Box, Chip, CircularProgress, IconButton } from "@mui/material";
import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from "react-redux";
import toggleVisibility from "../../services/organizationService";
import { toggleVisibilityReducer } from "../../slices/organizationSlice";
import FaceIcon from '@mui/icons-material/Face';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
// Sample hierarchical data
const organizationData = {
    name: "Company XYZ",
    employees: ["CEO"],
    vehicles: ["1332-A-12", "9774-B-32"],
    subdivisions: [
        {
            name: "Division A",
            employees: ["Manager A1", "Manager A2"],
            vehicles: ["1332-A-12", "9774-B-32"],
            subdivisions: [
                {
                    name: "Team A1",
                    employees: ["Employee A1-1", "Employee A1-2"],
                    vehicles: ["1332-A-12", "9774-B-32"],
                    subdivisions: [],
                },
                {
                    name: "Team A2",
                    employees: ["Employee A2-1", "Employee A2-2"],
                    vehicles: ["1332-A-12", "9774-B-32"],
                    subdivisions: [],
                },
            ],
        },
        {
            name: "Division B",
            employees: ["Manager B1"],
            vehicles: ["1332-A-12", "9774-B-32"],
            subdivisions: [
                {
                    name: "Team B1",
                    employees: ["Employee B1-1"],
                    vehicles: ["1332-A-12", "9774-B-32"],
                    subdivisions: [],
                },
            ],
        },
    ],
};




// Recursive function to render nodes
const OrganizationTreeNode = ({ node,handleUpdateVisibility }) => (

    <TreeNode
        label={
            <div style={{ border: "1px solid #7ea7f4", padding: "0px", borderRadius: "5px", width: "250px", marginLeft: "auto", marginRight: "auto" }}>
                <div style={{ padding: "5px", border: "1px solid #7ea7f4", borderTopLeftRadius: "4px", borderTopRightRadius: "4px", backgroundColor: "#7ea7f4", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ margin: "auto",color:"white" }}>{node.name}</span>
                    <IconButton aria-label="fingerprint" onClick={()=>handleUpdateVisibility(node.id)}>
                        <MoreHorizIcon />
                    </IconButton>
                </div>
                <hr style={{ margin: "0px" }} />
                { node.visible &&  <div style={{ padding: "10px", borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px", backgroundColor: "white", textAlign: "left" }}>
                    {/* <label style={{backgroundColor:"gray",padding:"5px",border:"1px solid "}}>+ Users</label> */}
                    <ul style={{ paddingLeft: "15px", marginTop: "5px", textAlign: "left",marginLeft:"15px" }}>
                        { node?.users?.length > 0 && node.users.map((emp, index) => (
                            // <li key={index}>{emp.firstName + " "+ emp.lastName}</li>
                            <Chip icon={<FaceIcon />} label={emp.firstName + " "+ emp.lastName} variant="outlined" sx={{margin:"2px 0px"}} />

                        ))}
                        

                    </ul>

                    {/* <label>+ Vehicles</label> */}
                    <ul style={{ paddingLeft: "15px", marginTop: "5px", textAlign: "left" }}>
                        { node?.vehicles?.length > 0 && node.vehicles.map((vl, index) => (
                            // <li key={index}>{emp}</li>
                            <Chip icon={<DirectionsCarIcon />} label={vl.licensePlate}  sx={{margin:"2px 0px"}}/>

                        ))}
                    </ul>

                </div>}
            </div>
        }
    >
        {node.children.map((sub, index) => (
            <OrganizationTreeNode key={index} node={sub} handleUpdateVisibility  ={handleUpdateVisibility} />
        ))}
    </TreeNode>
);

const OrgChartOrganization = () => {

    const { orgChartData } = useSelector((state) => state.organization)
    const dispatch = useDispatch();

    const handleUpdateVisibility = (idOrg) =>{
        dispatch(toggleVisibilityReducer(idOrg))
    }
    return (
        orgChartData.name ? <Tree
            label={
                <div style={{ width: "200px", marginLeft: "auto", marginRight: "auto" }}>
                    <div style={{ padding: "5px", border: "1px solid #f4b17e", borderTopLeftRadius: "5px", borderTopRightRadius: "5px", backgroundColor: "#f4b17e", display: "flex", justifyContent: "space-between" }}>
                        <span style={{ margin: "auto",color:"white" }}>{orgChartData.name}</span>
                        <IconButton aria-label="fingerprint"  onClick={()=>handleUpdateVisibility(orgChartData.id)}>
                            <MoreHorizIcon />
                        </IconButton>
                    </div>
                    { orgChartData.visible && <div style={{ padding: "10px", border: "1px solid #f4b17e", borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px", backgroundColor: "white", textAlign: "left" }}>
                        {/* <label>+ Persons</label> */}
                        <ul style={{ paddingLeft: "15px", marginTop: "5px", textAlign: "left",marginLeft:"15px"  }}>
                            { orgChartData.employees?.length > 0 && orgChartData.employees.map((emp, index) => (
                                <Chip icon={<FaceIcon />} label={emp.firstName + " "+ emp.lastName} variant="outlined"  sx={{margin:"2px 0px"}}/>

                            ))}

                        </ul>

                        {/* <label>+ Vehicles</label> */}
                        <ul style={{ paddingLeft: "15px", marginTop: "5px", textAlign: "left",marginLeft:"15px"  }}>
                            { orgChartData.vehicles?.length > 0 && orgChartData.vehicles.map((vl, index) => (
                                // <li key={index}>{vl.licensePlate}</li>
                                <Chip icon={<DirectionsCarIcon />} label={vl.licensePlate} sx={{margin:"2px 0px"}} />

                            ))}
                        </ul>

                    </div>}
                </div>
            }
        >
            {orgChartData?.children?.length > 0 && orgChartData.children.map((sub, index) => (
                <OrganizationTreeNode key={index} node={sub}  handleUpdateVisibility  ={handleUpdateVisibility}/>
            ))}

        </Tree> : 
            <p style={{textAlign:"center"}}>
            <CircularProgress />
          </p>
    );
}

export default OrgChartOrganization;
