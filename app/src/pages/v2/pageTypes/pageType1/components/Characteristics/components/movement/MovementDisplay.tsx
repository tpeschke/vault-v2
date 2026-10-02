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
                <p className="character-value">{crawl}</p>
                <strong>∞</strong>
            </div>
            <div className='movement-category-row'>
                <strong>Walk</strong>
                <p className="character-value">{walk}</p>
                <strong>∞</strong>
            </div>
            <div className='movement-category-row'>
                <strong>Jog</strong>
                <p className="character-value">{jog}</p>
                <strong>∞</strong>
            </div>
            <div className='movement-category-row'>
                <strong>Run</strong>
                <p className="character-value">{run}</p>
                <strong>10 Second Interval</strong>
            </div>
            <div className='movement-category-row'>
                <strong>Sprint</strong>
                <p className="character-value">{sprint}</p>
                <strong>5 Second Interval</strong>
            </div>
        </div>
    )
}