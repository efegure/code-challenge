import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CarTable from '../CarTable.vue'
import type { Car } from '@/types/Car'

const mockData: Array<Car> = [
  {
    carId: 'ABC',
    color: 'red',
    horsePower: 55,
    inStock: false,
    price: {
      amount: 10,
      symbol: '$'
    }
  }
]

describe('CarTable', () => {
  it('renders properly', () => {
    const wrapper = mount(CarTable, { props: { data: mockData } })
    expect(wrapper.text()).toContain('Car Id')
    expect(wrapper.text()).toContain('In Stock')
    expect(wrapper.text()).toContain('HorsePower')
    expect(wrapper.text()).toContain('Color')
    expect(wrapper.text()).toContain('Price')
    expect(wrapper.text()).toContain('Edit')
    expect(wrapper.text()).toContain('Go to page:')
    expect(wrapper.text()).toContain('Page')
  })
  it('gets props properly', () => {
    const wrapper = mount(CarTable, { props: { data: mockData } })
    expect(wrapper.props().data).toEqual(mockData)
    expect(wrapper.props().data.length).toEqual(mockData.length)
  })
  it('renders rows properly', () => {
    const wrapper = mount(CarTable, { props: { data: mockData } })
    expect(wrapper.text()).toContain('ABC')
    expect(wrapper.text()).toContain('red')
    expect(wrapper.text()).toContain(55)
    expect(wrapper.text()).toContain(false)
    expect(wrapper.text()).toContain(10)
    expect(wrapper.text()).toContain('$')
  })
  it('emits events properly', () => {
    const wrapper = mount(CarTable, { props: { data: mockData } })
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('edit')
    expect(wrapper.emitted().edit).toHaveLength(1)
    expect(wrapper.emitted().edit[0]).toEqual(['ABC', '0'])
  })
})
