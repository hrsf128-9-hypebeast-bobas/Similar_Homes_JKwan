import { shallow, mount, render } from 'enzyme';
import App from '../Components/App.jsx'

describe('App Component', () => {
  const wrapper = shallow(<App />);

  it('Should return a div element', () => {
    expect(wrapper.type()).toEqual('div');
  });

  it('Should check componentDidMount()', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'componentDidMount');
    instance.componentDidMount();
    expect(instance.randomFunction).toHaveBeenCalledTimes(1);
  })
});
