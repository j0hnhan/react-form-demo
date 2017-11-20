import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { createPost } from '../actions/index';
import { connect } from 'react-redux';

class PostsNew extends React.Component {
	renderField(field) {
		const className = `form-group ${field.meta.touched && field.meta.error? 'has-danger': ''}`

		return (
			<div className={className}>
				<label>{field.label}</label>
				<input 
				className="form-control"
				type="text"
				{...field.input}/>
				<div className="text-help">
					{field.meta.touched? field.meta.error: ''}
				</div>
			</div>
		);
	}

	renderTextArea(field) {
		const className = `form-group ${field.meta.touched && field.meta.error? 'has-danger': ''}`
		return (
			<div className={className}>
				<label>{field.label}</label>
				<textarea {...field.input} className="form-control">
				</textarea>
				<div className="text-help">
					{field.meta.touched? field.meta.error: ''}
				</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.createPost(values, () => {
			this.props.history.push('/')
		});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field 
				 label="Title"
				 name="title"
				 component={this.renderField} />
				<Field 
				 label="Categories"
				 name="categories"
				 component={this.renderField} />
				<Field 
				 label="Content"
				 name="content"
				 component={this.renderTextArea} />
				 <button type="submit" className="btn btn-primary">Save</button>
				 <Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	if(!values.title) {
		errors.title = "Please enter a title";
	}
	if(!values.categories) {
		errors.categories = "Please enter a category";
	}
	if(!values.content) {
		errors.content = "Please enter your content";
	}


	return errors;
}

export default reduxForm({
	validate: validate,
	form: 'PostsNewForm'
})(
	connect(null, { createPost })(PostsNew)
);