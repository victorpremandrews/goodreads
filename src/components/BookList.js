import React from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core';
import bookListStyles from './../assets/jss/bookListStyles';

import BookItem from './BookItem';
import Paginator from './Paginator';

const BookList = ({books, classes, pagination, onPageSelect}) => {
    return (
        <div>
            <Paginator pagination={pagination} onPageSelect={onPageSelect} />
            <div className={classNames(classes.bookListContainer)}>
                {books.map((book, key) => <BookItem key={key} book={book} />)}
            </div>
        </div>
    );
};

export default withStyles(bookListStyles)(BookList);