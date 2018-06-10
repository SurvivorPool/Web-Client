const ACTION = 'USER_LOGIN_COMPLETED';

const actionCreator = payload => ({ type: ACTION, payload });

actionCreator.ACTION = ACTION;

export default actionCreator;