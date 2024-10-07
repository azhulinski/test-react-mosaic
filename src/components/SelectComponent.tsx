import React from 'react'
import "../css/app.css"

// @ts-ignore
export default ({data, handleSelect}) => {

    const handleChange = (value: string) => {
        handleSelect(value)
    }

    return (
        <div className="mr-8 object-left">
            <select name=""
                    id="company"
                    onChange={e => handleChange(e.target.value)}
                    className="flex mt-1 text-sm font-medium text-gray-900 dark:text-white"
            >
                <option defaultValue={""}></option>
                {data.map((option: { ticker: string; name: string; id: string }) => (
                    <option
                        value={option.id}
                        label={option.name}
                        key={option.ticker}
                    >
                    </option>
                ))}
            </select>
        </div>
    )
}