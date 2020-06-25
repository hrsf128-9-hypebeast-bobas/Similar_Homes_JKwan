import { shallow, mount, render } from 'enzyme';
import App from '../Components/App.jsx'
import SimilarHomes from '../Components/SimilarHomes.jsx'

describe('SimilarHomes Component', () => {
  const wrapper = mount(<App />);
  it ('Should expect SimilarHomes to exist', ()=> {
    expect(wrapper.find(SimilarHomes).exists()).toEqual(true)
  })

  it('Should render header', () => {
    expect(wrapper.find('h2').exists()).toEqual(true)
  })

  it('Should expect an image to render', () => {
    expect(wrapper.find('img')).toHaveLength(1);
  })

  it('Should expect the property descriptions to render', () => {
    expect(wrapper.exists('carousel-caption')).toEqual(true);
  })
})