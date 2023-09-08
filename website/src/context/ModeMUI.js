import React from "react";

const ModeMUIContext = React.createContext({
    mode: "dark",
    toggleMode: () => {
    }
})

export default ModeMUIContext;