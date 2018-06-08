export default function actionCreator(params) {
	const ACTION = params.name;
	const ACTION_COMPLETED = params.name + "_COMPLETED";
	const ACTION_FAILED = params.name + "_FAILED";

	function createAction() {
		const params = [].slice.call(arguments);
		return {
			type: ACTION,
			params,
		};
	}

	function completeAction(data, params) {
		return {
			type: ACTION_COMPLETED,
			data,
			params,
		};
	}

	function failAction(error, params) {
		return {
			type: ACTION_FAILED,
			error,
			params,
		};
	}

	function defineAction() {
		const args = [].slice.call(arguments);

		return dispatch => {
			dispatch(createAction.apply(null, args));
			return params.action
				.apply(null, args)
				.then(data => {
					dispatch(completeAction(data, args));
					return data;
				})
				.catch(error => {
					dispatch(failAction(error, args));
					throw error;
				});
		};
	}

	defineAction.ACTION = ACTION;
	defineAction.ACTION_COMPLETED = ACTION_COMPLETED;
	defineAction.ACTION_FAILED = ACTION_FAILED;

	return defineAction;
}