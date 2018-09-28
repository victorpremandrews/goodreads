import React from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core';
import ReactPaginate from 'react-paginate';

import paginatorStyles from './../assets/jss/paginatorStyles';

const Paginator = ({pagination, classes, onPageSelect}) => {
    let {totalItems, itemsPerPage, currentPage} = pagination;
    let mod = Math.ceil(totalItems / itemsPerPage);
    console.log(currentPage);
    const handlePageClick = e => {
        onPageSelect(e);
    }

    let jsx = 
        <div className={classNames(classes.paginatorContainer)}>
            <ReactPaginate
                forcePage={currentPage - 1}
                previousLabel={"Prev"}
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
    if(totalItems < itemsPerPage) jsx = '';

    return (
        jsx
    )
}

export default withStyles(paginatorStyles)(Paginator);