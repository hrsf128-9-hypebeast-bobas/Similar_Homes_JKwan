import { shallow, mount, render } from 'enzyme'
import App from '../Components/App.jsx'
import axios from 'axios'

describe('App Component', () => {
  const wrapper = shallow(<App />);

  it('Should return a div element', () => {
    expect(wrapper.type()).toEqual('div');
  });

  it('Should call componentDidMount', () => {
    jest.spyOn(App.prototype, 'componentDidMount');
    const wrapper = shallow(<App />);
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1);
  })

  it('Should fetch a list of listings', () => {
    const getSpy = jest.spyOn(axios, 'get')
    const wrapper = shallow(<App />)
    expect(getSpy).toBeCalled()
  })

});
