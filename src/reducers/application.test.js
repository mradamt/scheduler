import reducer from './application';

describe('Reducer error unit test', () => {
  it('throws an error with an unsupported type', () => {
    expect(() => reducer({}, {type: null})).toThrowError(/tried to reduce with unsupported action type/i)
  })
})