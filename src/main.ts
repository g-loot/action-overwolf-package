import * as core from '@actions/core'

import {zip} from './archive'

async function run(): Promise<void> {
  try {
    const inputpath = core.getInput('path')
    const path = `${process.env.GITHUB_WORKSPACE}/${inputpath}`
    await zip(path)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
