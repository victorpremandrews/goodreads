import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { fetchBooks, selectQuery, selectPage, resetPaginate } from './actions';
import BookSearch from './components/BookSearch';
import BookList from './components/BookList';

class App extends Component {
	
	componentDidMount() {
		let {dispatch, selectedQuery} = this.props;
		dispatch(fetchBooks(selectedQuery));
	}

	onBookSearch = query => {
		let { dispatch } = this.props;
		dispatch(selectQuery(query));
		dispatch(resetPaginate());
		dispatch(fetchBooks(query));
	};

	onPageSelect = page => {
		let { dispatch, selectedQuery } = this.props;
		let selected = Number(page.selected) + 1;
		console.log('Sel Page', selected);
		dispatch(selectPage(selected));
		dispatch(fetchBooks(selectedQuery, selected));
	}

	render() {
		let { books, pagination } = this.props;
		return (
			<div className="App">
				<header className="App-header">
					<h3>Good Reads</h3>
					<BookSearch onSearch={this.onBookSearch} />
					<h6>Search by Book Name/ Author Name/ ISBN</h6>
				</header>
				<main className="main">
					<BookList books={books} pagination={pagination} onPageSelect={this.onPageSelect} />
				</main>
			</div>
		);
  	}
}

const mapStateToProps = state => {
	const booksLoading = {
		isFetching: true,
		didInvalidate: false,
		books: []
	};
	
	const { selectedQuery, booksByQuery, pagination } = state;
	const booksObj = booksByQuery[selectedQuery] 
		? booksByQuery[selectedQuery][pagination.currentPage] : booksLoading;
	const { books, didInvalidate, isFetching } = booksObj || booksLoading;
	
	return {
		isFetching,
		didInvalidate,
		selectedQuery,
		books,
		pagination
	};
};



export default connect(mapStateToProps)(App);