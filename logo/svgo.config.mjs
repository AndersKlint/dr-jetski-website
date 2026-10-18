export default {
  plugins: [
    {
      name: 'preset-default',
      overrides: {
        cleanupNumericValues: { floatPrecision: 2 },
        convertPathData: { floatPrecision: 2 }
      }
    }
  ]
};
