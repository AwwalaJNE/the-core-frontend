export default {
  getTransaction: (state) => state,
  getTransactionOrigin: (state) => state.origin,
  getTransactionDestination: (state) => state.destination,
  getTransactionCalculator: (state) => state.calculator,
}
