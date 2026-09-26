import type { ReactNode } from "react";

import "./Layout.css"

const Layout = ({children}: {children?: ReactNode}) => {
    return (
        <div className="layout">
            {children}
        </div>
    )
}

export default Layout;