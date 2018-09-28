import React from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core';
import bookListStyles from './../assets/jss/bookListStyles';

const BookItem = ({book, classes}) => {
    return (
        <div className={classNames(classes.bookContainer)}>
            <div>
                <img src={book.best_book.image_url} alt={book.best_book.title} />
            </div>
            <div className={classNames(classes.bookSectionDetail)}>
                <h3>{book.best_book.title}</h3>
                <h4>Author - {book.best_book.author.name}</h4>
                <div className={classNames(classes.bookCaption)}>
                    <span>Ratings: <strong>{book.ratings_count}</strong></span> &nbsp;
                    <span>Reviews: <strong>{book.text_reviews_count}</strong></span> &nbsp;
                    <span>Avg. Ratings: <strong>{book.average_rating}</strong></span>
                </div>
            </div>
        </div>
    );
}

export default withStyles(bookListStyles)(BookItem);