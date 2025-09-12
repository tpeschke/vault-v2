import { GearObject } from '@vault/common/interfaces/v1/pageTwo/gearInterfaces'
import './GearDisplay.css'

interface Props {

}

export default function GearDisplay({ }: Props) {
    const gear: GearObject[] = [
        {
            id: 1,
            item: 'Sandals*',
        },
        {
            id: 2,
            item: 'Belt, Leather*',
        },
        {
            id: 3,
            item: 'Sheathe (M)*',
            size: ''
        },
        {
            id: 4,
            item: 'Shirt*',
            size: 'l'
        },
        {
            id: 5,
            item: 'Breeches*',
            size: '2S'
        },
        {
            id: 6,
            item: 'Armor*',
            size: 'M'
        },
        {
            id: 7,
            item: 'Backpack*',
            size: '+M'
        }
    ]

    const leftOver = 26 - gear.length

    function calculateCarry(gear: GearObject[]) {
        return gear.reduce((total, { size }) => {
            if (size && size?.includes('-')) {
                const [_, sizeString] = size.split('-')
                return total - getSizeValue(sizeString)
            } else if (size && size?.includes('+')) {
                const [_, sizeString] = size.split('+')
                return total - getSizeValue(sizeString)
            } else if (size) {
                return total + getSizeValue(size)
            }

            return total
        }, 0)
    }

    function getSizeValue(size: string): number {
        const sizeValueDictionary: { [key: string]: number } = {
            S: 1,
            M: 3,
            L: 9
        }

        const sizeArray = size.split('')

        if (sizeArray.length > 1) {
            const upperCaseSize = sizeArray[1].toUpperCase()
            return +sizeArray[0] * sizeValueDictionary[upperCaseSize]
        } else {
            const upperCaseSize = sizeArray[0].toUpperCase()
            return sizeValueDictionary[upperCaseSize]
        }
    }

    const carryValue = calculateCarry(gear)

    const largeCarry = Math.floor(carryValue / 9)
    const largeRemainder = carryValue % 9
    const mediumCarry = Math.floor(largeRemainder / 3)
    const mediumRemainder = carryValue % 3
    const smallCarry = mediumRemainder

    
    function placeholderFunction() {

    }

    return (
        <div className='gear-display-shell'>
            <span>
                <h2>Gear & Loot</h2>
                <div className='coins-shell'>
                    <span>
                        <strong>CC</strong>
                        <input onClick={placeholderFunction} defaultValue={0} />
                    </span>
                    <span>
                        <strong>SC</strong>
                        <input onClick={placeholderFunction} defaultValue={1} />
                    </span>
                    <span>
                        <strong>GC</strong>
                        <input onClick={placeholderFunction} defaultValue={2} />
                    </span>
                    <span>
                        <strong>PC</strong>
                        <input onClick={placeholderFunction} defaultValue={3} />
                    </span>
                </div>
            </span>
            <div className='gear-rows-shell gear-header-row'>
                <span>
                    <h3>Item</h3>
                    <h3>Size</h3>
                </span>
                <span>
                    <h3>Item</h3>
                    <h3>Size</h3>
                </span>
                <span>
                    <h3>Item</h3>
                    <h3>Size</h3>
                </span>
                <span>
                    <h3>Item</h3>
                    <h3>Size</h3>
                </span>
            </div>
            <div className='gear-rows-shell'>
                {gear.map(gearRow)}
                <span>
                    <input onClick={placeholderFunction} />
                    <input onClick={placeholderFunction} />
                </span>
                {[...Array(leftOver).keys()].map(nullGearRow)}
                <span className='carry-info'>
                    <p>{smallCarry}S {mediumCarry}M {largeCarry}L</p>
                    <strong>/</strong>
                    <strong>1S 2M 3L</strong>
                </span>
            </div>
        </div>
    )
}

function gearRow({ item, size, id }: GearObject) {
    
    function placeholderFunction() {

    }

    return (
        <span key={id}>
            <input onClick={placeholderFunction} defaultValue={item} />
            <input onClick={placeholderFunction} defaultValue={size} />
        </span>
    )
}

function nullGearRow(_: any, index: number) {
    return (
        <span key={index} className='gear-null-row'>
            <p></p>
            <p></p>
        </span>
    )
}