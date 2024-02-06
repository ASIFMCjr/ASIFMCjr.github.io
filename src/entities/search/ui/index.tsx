import React, { useState } from 'react'
import search from 'assets/search.svg'
import './index.sass'

export const SearchBar = () => {
    const [input, setInput] = useState<string>('')
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        alert(input)
    }
    return (
        <form className='search' onSubmit={handleSubmit}>
            <input className='search-input' id="search" type="text" value={input} onChange={e => setInput(e.target.value)}/>
            <img onClick={handleSubmit} className='search-ico' alt='search' src={search} />
        </form>
    )
}
