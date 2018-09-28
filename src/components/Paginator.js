import React from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core';
import ReactPaginate from 'react-paginate';

import paginatorStyles from './../assets/jss/paginatorStyles';

const Paginator = ({pagination, classes, onPageSelect}) => {
    let {totalItems, itemsPerPage} = pagination;
    let mod = Math.ceil(totalItems / itemsPerPage);

    const handlePageClick = e => {
        onPageSelect(e);
    }

    let jsx = 
        <div className={classNames(classes.paginatorContainer)}>
            <ReactPaginate previousLabel={"Prev"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={mod}
                marginPagesDisplayed={2}
                pageRangeDisplayed={10}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
        </div>
    ;
    console.log(totalItems, itemsPerPage);
    if(totalItems < itemsPerPage) jsx = '';

    return (
        jsx
    )
}

export default withStyles(paginatorStyles)(Paginator);