module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    // 'vue/no-multiple-template-root': 'off',
  },
}
