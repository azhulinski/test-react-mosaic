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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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