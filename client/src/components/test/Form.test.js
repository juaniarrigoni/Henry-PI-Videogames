import React from 'react';
// eslint-disable-next-line no-unused-vars
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

import Form from '../Form';

configure({ adapter: new Adapter() });

describe('<Form />', () => {

    describe('Estructura', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallow(<Form />);
        })
        it('Renderiza un <form>', () => {
            expect(wrapper.find('form')).toHaveLength(1)
        })
    })
})