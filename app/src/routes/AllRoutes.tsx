import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import Home from "../pages/home/Home";
import View from "../pages/view/View";

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
                    <View />
                </Loading>
            } />
            <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
    )
}