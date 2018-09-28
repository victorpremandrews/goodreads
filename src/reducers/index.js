import { SELECT_QUERY, SEARCH_BOOKS, RECEIVE_BOOKS, INVALIDATE_QUERY, SELECT_PAGE, PAGINATE, RESET_PAGINATE } from "../constants/ActionTypes";
import { combineReducers } from "redux";

const pageInitState = {
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: 0
};
const pagination = (state = pageInitState, action) => {
    switch(action.type) {
        case SELECT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case PAGINATE:
            return {
                ...state,
                itemsPerPage: action.size,
                currentPage: action.page,
                totalItems: action.items
            }
        case RESET_PAGINATE:
            return {
                ...state,
                currentPage: 1,
                totalItems: 0
            }
        default:
            return state;
    }
}

const selectedQuery = (state = 'cartoon', action) => {
    switch(action.type) {
        case SELECT_QUERY:
            return action.query;
        default:
            return state;
    }
};

const booksInitState = {
    isFetching: true,
    didInvalidate: false,
    totalItems: 0,
    books: []
};
const books = (state = booksInitState, action) => {
    switch(action.type) {
        case SEARCH_BOOKS:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_BOOKS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                totalItems: action.total,
                books: action.books
            }
        case INVALIDATE_QUERY:
            return {
                ...state,
                didInvalidate: true
            }
        default:
            return state;
    }
};

const booksByPage = (state = {}, action) => {
    switch(action.type) {
        case SEARCH_BOOKS:
        case RECEIVE_BOOKS:
        case INVALIDATE_QUERY:
            return {
                ...state,
                [action.page]: books(state[action.page], action)
            };
        default:
            return state;
    }
};

const booksByQuery = (state = {}, action) => {
    switch(action.type) {
        case SEARCH_BOOKS:
        case RECEIVE_BOOKS:
        case INVALIDATE_QUERY:
            return {
                ...state,
                [action.query]: booksByPage(state[action.query], action)
            }
        default: 
            return state;
    }
};

const rootReducer = combineReducers({
    selectedQuery,
    booksByQuery,
    pagination
});

export default rootReducer;