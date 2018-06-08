const ACTION = 'USER_LOGIN';

const actionCreator = payload => ({ type: ACTION, payload });

actionCreator.ACTION = ACTION;

export default actionCreator;