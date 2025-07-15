import React, {useState} from 'react';

const SearchBar = ({onSearch}) => {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className='p-4'>
            <input type="text"
            value={query}
            onChange={handleSearch}
            placeholder='Search...'
            className='w-full p-2 border rounded' 
            />
        </div>
    );
};

export default SearchBar;