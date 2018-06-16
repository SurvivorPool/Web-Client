import React from 'react';
import LoginModal from './LoginModal';
import { shallow } from 'enzyme';

describe('LoginModal', () => {
	it('renders', () => {
		shallow(<LoginModal/>);
	});
});