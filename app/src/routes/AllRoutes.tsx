import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import Home from "../pages/home/Home";
import View from "../pages/view/View";

interface Props {
}

export default function AllRoutes({  }: Props) {
    return (
        <Routes>
            <Route index element={
                <Loading>
                    <Home />
                </Loading>
            } />
            <Route path="view/:characterID" element={
                <Loading>
                    <View/>
                </Loading>
            } />
            <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
    )
}