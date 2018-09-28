import React from 'react';

const BookSearch = ({onSearch}) => {

    const inpRef = React.createRef();

    const handleSubmit = e => {
        e.preventDefault();
        onSearch(inpRef.current.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="searchContainer">
                <input type="text" ref={inpRef} 
                    placeholder="Book Search" 
                    name="bookSearch" />
            </div>
        </form>
    );
}

export default BookSearch;