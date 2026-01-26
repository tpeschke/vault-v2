import './DoubleColumn.css'
import { JSX, Children } from "react";

interface Props {
    children: JSX.Element | JSX.Element[],
}
export default function DoubleColumn({ children }: Props) {
    return (
        <div className="double-column">
            {Children.map(children, (child, index) => {
                return (
                    <div key={index} className={index % 2 ? 'right-column' : 'left-column'}>
                        {child}
                    </div>
                )
            })}
        </div>
    )
}