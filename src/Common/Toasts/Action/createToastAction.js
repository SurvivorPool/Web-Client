const ACTION = 'TOAST_CREATE';

const actionCreator = payload => ({ type: ACTION, payload });

actionCreator.ACTION = ACTION;

export default actionCreator;