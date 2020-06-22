import { shallow, mount, render } from 'enzyme';
import App from '../Components/App.jsx'

describe('App Component', () => {
  const wrapper = shallow(<App />);

  it('Should return a div element', () => {
    expect(wrapper.type()).toEqual('div');
  });

  it('Should return text of header', () => {
    expect(wrapper.find('h1').text()).toBe('Hello Juice Wrld')
  })
});
