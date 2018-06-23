import React, { Component } from 'react';

import Loader from "./Loader";

export default function(DecoratedComponent) {
	class LoaderDecorator extends Component {
		render () {
			const isLoading = Object.keys(this.props).some(key => {
				return this.props[key] && this.props[key].loading;
			});

			if (isLoading) {
				return (
					<React.Fragment>
						<Loader />
						<DecoratedComponent {...this.props} />
					</React.Fragment>
				);
			}

			return (
				<DecoratedComponent {...this.props} />
			);
		}

	}
	return LoaderDecorator;
};