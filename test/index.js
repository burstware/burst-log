const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

beforeEach(async () => {
})

describe('test', () => {
  it('passes successfully', async () => {
    const test = true
    test.should.equal(true)
  })
})
