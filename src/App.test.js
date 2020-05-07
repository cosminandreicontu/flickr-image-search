/* Dependencies */
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

/* Components */
import App from './App'

// Configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() })

describe('Initial components', () => {
  it('should render title inside h1 tag', () => {
    const wrapper = mount(<App />)
    const title = wrapper.find('h1')
    expect(title).toHaveLength(1)
    expect(title.text()).toEqual('Flickr Image Search')
  })

  it('should render search bar inside input tag', () => {
    const wrapper = mount(<App />)
    const input = wrapper.find('input')
    expect(input).toHaveLength(1)
    expect(input.text()).toEqual('')
  })

  it('should render message inside div tag', () => {
    const wrapper = mount(<App />)
    const div = wrapper.find('div.infinite-scroll-component')
    expect(div).toHaveLength(1)
    expect(div.text()).toEqual('Type in search bar to get images')
  })

  it('should not display any images', () => {
    const wrapper = mount(<App />)
    const img = wrapper.find('img')
    expect(img).toHaveLength(0)
  })
  
})


describe('Search bar', () => {
  it('should match with the user input', () => {
    const wrapper = mount(<App />)
    wrapper.find('input').simulate('change', { target: { value: '1234567890' } });
    expect(wrapper.find('input').props().value).toBe("1234567890");
  })

  it('should not match with the user input', () => {
    const wrapper = mount(<App />)
    wrapper.find('input').simulate('change', { target: { value: '1234567890' } });
    expect(wrapper.find('input').props().value).not.toBe("123456789");
  })
})