import { 
    SELECT_QUERY, 
    INVALIDATE_QUERY, 
    SEARCH_BOOKS, 
    RECEIVE_BOOKS, 
    PAGINATE,
    SELECT_PAGE,
    RESET_PAGINATE
} from './../constants/ActionTypes';
import { GR_SER_URL } from '../constants/AppConstants';

export const selectQuery = query => ({
    type: SELECT_QUERY,
    query
});

export const invalidateQuery = query => ({
    type: INVALIDATE_QUERY,
    query
});

const searchBooks = (query, page) => ({
    type: SEARCH_BOOKS,
    query,
    page
});

const receiveBooks = (query, json, page, total) => ({
    type: RECEIVE_BOOKS,
    query,
    books: json,
    page,
    receivedAt: Date.now(),
    total
});

export const selectPage = page => ({
    type: SELECT_PAGE,
    page
});

const paginate = (items, page, size = 20) => ({
    type: PAGINATE,
    page,
    size,
    items
});

export const resetPaginate = () => ({
    type: RESET_PAGINATE
})

export const fetchBooks = (query, page = 1) => (dispatch, getState) => {
    const endPoint = 'books';
    const payload = `?q=${query}&page=${page}`;

    const { booksByQuery } = getState();
    const books = booksByQuery[query] ? booksByQuery[query][page] : null;

    if(!books) {
        dispatch(searchBooks(query, page));
        return fetch(`${GR_SER_URL}${endPoint}${payload}`)
            .then(res => res.json())
            .then(json => {
                if(json.results && json.results.work) {
                    let books = json.results.work;
                    if(!Array.isArray(books)) books = [books];
                    dispatch(receiveBooks(query, books, page, Number(json['total-results'])));
                    dispatch(paginate(Number(json['total-results']), page));
                }
            }
        );
    } else {
        dispatch(paginate(books.totalItems, page));
    }
};