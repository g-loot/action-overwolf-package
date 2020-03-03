import {zip} from '../src/archive'

test('writes folder', async () => {
  const zipname = await zip(`${__dirname}/testdata`)
  expect(zipname).toContain('Sample App-0.0.1.opk')
})
