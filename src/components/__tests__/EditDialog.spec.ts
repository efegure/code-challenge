import { describe, it, expect, beforeEach, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import EditDialog from '../EditDialog.vue'
import type { Car } from '@/types/Car'
import { nextTick } from 'vue'

const mockData: Car = {
  carId: 'ABC',
  color: 'red',
  horsePower: 55,
  inStock: false,
  price: {
    amount: 10,
    symbol: '$'
  }
}
const id = 0
let MockObserverInstance: ResizeObserver

describe('EditDialog', () => {
  beforeEach(() => {
    MockObserverInstance = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    }
    global.ResizeObserver = vi.fn().mockImplementation(() => MockObserverInstance)
  })

  it('gets props properly', () => {
    const wrapper = mount(EditDialog, { props: { id: id.toString(), car: mockData, isOpen: true } })
    expect(wrapper.props().id).toEqual(id.toString())
    expect(wrapper.props().car).toEqual(mockData)
    expect(wrapper.props().isOpen).toEqual(true)
  })
  it('renders properly on prop change', async () => {
    const wrapper = mount(EditDialog, {
      props: { id: id.toString(), car: mockData, isOpen: false }
    })
    expect(wrapper.find('div').exists()).toBe(false)
    await wrapper.setProps({ isOpen: true })
    expect(wrapper.find('div').exists()).toBe(true)
  })
})
