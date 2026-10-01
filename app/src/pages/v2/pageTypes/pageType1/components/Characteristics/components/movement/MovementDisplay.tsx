import './Movement.css'
import { Movement } from "@vault/common/interfaces/v2/page1/movement";

interface Props {
    movement: Movement
}

export default function MovementDisplay({ movement }: Props) {
    const { crawl, walk, jog, run, sprint } = movement
    return (
        <div className="movement-v2">
            <div className="movement-header">
                <h1>Movement</h1>
                <p>ft / sec</p>
            </div>
            <div className='movement-category-row'>
                <strong>Crawl</strong>
                <p>{crawl}</p>
                <strong>∞</strong>
            </div>
            <div className='movement-category-row'>
                <strong>Walk</strong>
                <p>{walk}</p>
                <strong>∞</strong>
            </div>
            <div className='movement-category-row'>
                <strong>Jog</strong>
                <p>{jog}</p>
                <strong>∞</strong>
            </div>
            <div className='movement-category-row'>
                <strong>Run</strong>
                <p>{run}</p>
                <strong>10 Second Interval</strong>
            </div>
            <div className='movement-category-row'>
                <strong>Sprint</strong>
                <p>{sprint}</p>
                <strong>5 Second Interval</strong>
            </div>
        </div>
    )
}