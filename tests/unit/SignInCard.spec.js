import { shallowMount } from '@vue/test-utils'
import SignInCard from '@/components/login/SignInCard.vue'

describe('Login button', () => {
  test('Should be disabled if email or password is empty', () => {
    const wrapper = shallowMount(SignInCard)
    const button = wrapper.find('v-btn')

    expect(button)
      .isVisible()
      .toBe.false()
  })
})
