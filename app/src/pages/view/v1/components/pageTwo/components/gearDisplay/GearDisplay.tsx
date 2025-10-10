import { GearInfo, GearObject } from '@vault/common/interfaces/v1/pageTwo/gearInterfaces'
import './GearDisplay.css'
import { useEffect, useState } from 'react'
import { InsertGearFunction, UpdateCashFunction, UpdateGearFunction } from '../../../../hooks/interfaces/pageTwoInterfaces/UpdateGearInterfaces'
import makeTempID from '../../../../../../../utilities/makeTempId'

interface Props {
    gearInfo: GearInfo,
    updateCash: UpdateCashFunction,
    updateGear: UpdateGearFunction,
    insertGear: InsertGearFunction
}

export default function GearDisplay({ gearInfo, updateCash, updateGear, insertGear }: Props) {
    const { copper, silver, gold, platinum, carry, gear } = gearInfo

    const [leftOver, setLeftOver] = useState(0)

    const [largeEncumbrance, setLargeEncumbrance] = useState(0)
    const [mediumEncumbrance, setMediumEncumbrance] = useState(0)
    const [smallEncumbrance, setSmallEncumbrance] = useState(0)

    useEffect(() => {
        setLeftOver(26 - gear.length)

        const encumbranceValue = calculateCarry(gear)

        const largeEncumbrance = Math.ceil(encumbranceValue / 9)
        const largeEncumbranceRemainder = encumbranceValue % 9

        const mediumEncumbrance = Math.ceil(largeEncumbranceRemainder / 3)
        const mediumEncumbranceRemainder = encumbranceValue % 3

        const smallEncumbrance = mediumEncumbranceRemainder

        setLargeEncumbrance(largeEncumbrance)
        setMediumEncumbrance(mediumEncumbrance)
        setSmallEncumbrance(smallEncumbrance)
    }, [gear])

    const [largeCarry, setLargeCarry] = useState(0)
    const [mediumCarry, setMediumCarry] = useState(0)
    const [smallCarry, setSmallCarry] = useState(0)

    useEffect(() => {
        const largeCarry = Math.ceil(carry / 9)
        const largeCarryRemainder = carry % 9

        const mediumCarry = Math.ceil(largeCarryRemainder / 3)
        const mediumCarryRemainder = carry % 3

        const smallCarry = mediumCarryRemainder

        setLargeCarry(largeCarry)
        setMediumCarry(mediumCarry)
        setSmallCarry(smallCarry)
    }, [carry])

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

    function insertRow(key: 'item' | 'size', event: any) {
        const tempGear: GearObject = {
            key: makeTempID(),
            [key]: event.target.value
        }

        const isValidObject = tempGear.item !== '' || tempGear.size !== ''

        if (isValidObject) {
            insertGear(tempGear)
            event.target.value = null
        }
    }

    function gearRow({ item, size, id, key }: GearObject, index: number) {
        return (
            <span key={id ?? key}>
                <input onChange={(event: any) => updateGear(index, {id, item: event.target.value, size})} defaultValue={item} />
                <input onChange={(event: any) => updateGear(index, {id, item, size: event.target.value})} defaultValue={size} />
            </span>
        )
    }

    return (
        <div className='gear-display-shell'>
            <span>
                <h2>Gear & Loot</h2>
                <div className='coins-shell'>
                    <span>
                        <strong>CC</strong>
                        <input onChange={(event: any) => updateCash('copper', +event.target.value)} defaultValue={copper} />
                    </span>
                    <span>
                        <strong>SC</strong>
                        <input onChange={(event: any) => updateCash('silver', +event.target.value)} defaultValue={silver} />
                    </span>
                    <span>
                        <strong>GC</strong>
                        <input onChange={(event: any) => updateCash('gold', +event.target.value)} defaultValue={gold} />
                    </span>
                    <span>
                        <strong>PC</strong>
                        <input onChange={(event: any) => updateCash('platinum', +event.target.value)} defaultValue={platinum} />
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
                {gear.map((gear, index) => gearRow(gear, index))}
                {leftOver > -1 &&
                    <span>
                        <input onBlur={(event: any) => insertRow('item', event)} />
                        <input onBlur={(event: any) => insertRow('size', event)} />
                    </span>
                }
                {leftOver > -1 && [...Array(leftOver).keys()].map(nullGearRow)}
                <span className='carry-info'>
                    <p>{smallEncumbrance}S {mediumEncumbrance}M {largeEncumbrance}L</p>
                    <strong>/</strong>
                    <strong>{smallCarry}S {mediumCarry}M {largeCarry}L</strong>
                </span>
            </div>
        </div>
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