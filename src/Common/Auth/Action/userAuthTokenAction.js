const ACTION = 'USER_SET_TOKEN';

const actionCreator = payload => ({ type: ACTION, payload });

actionCreator.ACTION = ACTION;

export default actionCreator;