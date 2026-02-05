module.exports = {
  testEnvironment: 'node',
  injectGlobals: true,
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    // code ထဲက .js extension import တွေကို handle လုပ်ဖို့
    '^(\\.\\.?\\/.+)\\.js$': '$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
};