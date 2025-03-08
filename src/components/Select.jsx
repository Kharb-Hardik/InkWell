import React from 'react'

function Select({
    label,
    options,
    className,
    ...props
},ref) {
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''>{label}</label>}
        <select
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border-2 border-gray-300 w-full ${className}`} >
            {options?.map(option => (
                <option key={option} value={option.value}>{option.label}</option>
            ))}
            </select>
    </div>
  )
}

export default React.forwardRef(Select)