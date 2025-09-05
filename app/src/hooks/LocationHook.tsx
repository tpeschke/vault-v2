import { useLocation } from "react-router-dom"

interface HookReturn {
    pathname: string,
}

export default function LocationHook(): HookReturn {
    const { pathname } = useLocation();

    return {
        pathname
    }
}