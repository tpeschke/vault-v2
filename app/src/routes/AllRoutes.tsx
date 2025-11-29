import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import Home from "../pages/home/Home";
import V1View from "../pages/view/v1/V1View";
import V2View from "../pages/view/v2/V2View";

interface Props {
    pathname: string
}

export default function AllRoutes({ pathname }: Props) {
    return (
        <Routes>
            <Route index element={
                <Loading>
                    <Home pathname={pathname} />
                </Loading>
            } />
            <Route path="view/:characterID" element={
                <Loading>
                    <V1View pathname={pathname} />
                </Loading>
            } />
            <Route path="v/:characterID" element={
                <Loading>
                    <V2View pathname={pathname} />
                </Loading>
            } />
            <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
    )
}