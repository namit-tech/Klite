// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import applogo from "../../assets/app-logo.png";
// import {
//   faCaretDown,
//   faTachometerAlt,
//   faUsers,
//   faCog,
//   faChartBar,
//   faShoppingCart,
//   faUser,
//   faLifeRing,
//   faAngleUp,
//   faCircle,
// } from "@fortawesome/free-solid-svg-icons";
// import "./sidebar.css";

// const sidebarConfig = {
//   admin: [
//     { name: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
//     {
//       name: "Manage User",
//       path: "/users",
//       icon: faUsers,
//       options: [
//         { name: "Clients", path: "/clients" },
//         { name: "Users", path: "/users" },
//       ],
//     },
//     { name: "Subscriptions", path: "/settings", icon: faCog },
//     { name: "Reports", path: "/reports", icon: faChartBar },
//     { name: "Calendar", path: "/calendar", icon: faChartBar },
//     { name: "Payment", path: "/payment", icon: faChartBar },
//     { name: "Analytics", path: "/analytics", icon: faChartBar },
//   ],
//   client: [
//     { name: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
//     {
//       name: "Manage User",
//       icon: faUsers,
//       options: [
//         { name: "Users", path: "/users" },
//       ],
//     },
//     { name: "Calendar", path: "/dashboard", icon: faTachometerAlt },
//   ],
//   user: [
//     { name: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
//     { name: "Support", path: "/support", icon: faLifeRing },
//   ],
// };

// const Sidebar = () => {
//   const [role, setRole] = useState("");
//   const [dropdownStates, setDropdownStates] = useState({});
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decodedToken = JSON.parse(atob(token.split(".")[1]));
//         setRole(decodedToken.role);
//       } catch (error) {
//         console.error("Invalid token");
//       }
//     }
//   }, []);

//   const toggleDropdown = (key) => {
//     setDropdownStates((prevState) => {
//       const updatedDropdownStates = { ...prevState, [key]: !prevState[key] };
//       return updatedDropdownStates;
//     });
//   };

//   const menuItems = sidebarConfig[role] || [];

//   return (
//     <div className="sidebar">
//       <img src={applogo} alt="App Logo" />
//       <ul>
//         {menuItems.map((item, index) => (
//           <li key={index}>
//             {item.options ? (
//               <>
//                 <div
//                   className="feat-btn-admin"
//                   onClick={() => toggleDropdown(item.name)}
//                 >
//                   <FontAwesomeIcon icon={item.icon} className="label-icon" />
//                   {item.name}
//                   <FontAwesomeIcon
//                     icon={faAngleUp}
//                     className={`rotate ${
//                       dropdownStates[item.name] ? "rotate-open" : ""
//                     }`}
//                   />
//                 </div>
//                 <ul
//                   className={`feat-show-admin ${
//                     dropdownStates[item.name] ? "show" : ""
//                   }`}
//                 >
//                   {item.options.map((option, idx) => (
//                     <li key={idx}>
//                       <Link to={option.path}>
//                         <FontAwesomeIcon icon={faCircle} className="bullet" />
//                         {option.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             ) : (
//               <Link
//                 to={item.path}
//                 className={location.pathname === item.path ? "active" : ""}
//               >
//                 <FontAwesomeIcon icon={item.icon} className="label-icon" />
//                 {item.name}
//               </Link>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;



import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import applogo from "../../assets/app-logo.png";
import sidebarConfig from "../configs/Sidebarconfig";
import { getSidebarOptions } from "../configs/SidebarPermissions";
import "./sidebar.css";
import { faAngleUp, faCircle } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ role, customPermissions }) => {
  console.log("custompermi", customPermissions);
  const [dropdownStates, setDropdownStates] = useState({});

  const location = useLocation(); 
    // Make sure that both role and customPermissions are provided
    if (!role || !customPermissions) {
      console.error("Missing required props: role or customPermissions");
      return null;
    }
  
    const sidebarOptions = getSidebarOptions(role, customPermissions);
    console.log("sidebaroptions", sidebarOptions);

  const toggleDropdown = (key) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className="sidebar">
      <img src={applogo} alt="App Logo" />
      <ul>
        {sidebarOptions.map((item, index) => (
          <li key={index}>
            {item.options ? (
              <>
                <div className="feat-btn-admin" onClick={() => toggleDropdown(item.name)}>
                  <FontAwesomeIcon icon={item.icon} className="label-icon" />
                  {item.name}
                  <FontAwesomeIcon icon={faAngleUp} className={`rotate ${dropdownStates[item.name] ? "rotate-open" : ""}`} />
                </div>
                <ul className={`feat-show-admin ${dropdownStates[item.name] ? "show" : ""}`}>
                {item.options.map((subOption, idx) => (
                    <li key={idx}>
                      <Link to={subOption.path}>
                        <FontAwesomeIcon icon={faCircle} className="bullet" />
                        {subOption.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link to={item.path} className={location.pathname === item.path ? "active" : ""}>
                <FontAwesomeIcon icon={item.icon} className="label-icon" />
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;


// import React from "react";
// import { getSidebarOptions } from "../configs/SidebarPermissions"; // Adjust the import path

// const Sidebar = ({ role, customPermissions }) => {
//   console.log("custompermi", customPermissions);
  
//   // Make sure that both role and customPermissions are provided
//   if (!role || !customPermissions) {
//     console.error("Missing required props: role or customPermissions");
//     return null;
//   }

//   const sidebarOptions = getSidebarOptions(role, customPermissions);
//   console.log("sidebaroptions", sidebarOptions);
  

//   return (
//     <div>
//       <h2>{role.toUpperCase()} Sidebar</h2>
//       <ul>
//         {sidebarOptions.map((option) => (
//           <li key={option.name}>
//             <i className={option.icon}></i>
//             {option.name}
//             {option.options && (
//               <ul>
//                 {option.options.map((subOption) => (
//                   <li key={subOption.name}>{subOption.name}</li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;



