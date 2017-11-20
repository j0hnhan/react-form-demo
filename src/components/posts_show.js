import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost } from '../actions/index';
import { deletePost } from '../actions/index';

class PostsShow extends React.Component {
	componentDidMount() {
		if(!this.props.post) {
			const id = this.props.match.params.id;
			this.props.fetchPost(id);
		}
	}

	onDeleteClick() {
		this.props.deletePost(this.props.match.params.id, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const post = this.props.post;
		if(!post) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<Link to="/">Back to Index</Link>
				<button className="btn btn-danger pull-xs-right"
					onClick={this.onDeleteClick.bind(this)}>
					Delete Post
				</button>
				<h3>{post.title}</h3>
				<h6>{post.categories}</h6>
				<p>{post.content}</p>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return { post: state.posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);