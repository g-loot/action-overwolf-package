/* eslint-disable no-console */
import {createWriteStream, readFileSync} from 'fs'
import * as core from '@actions/core'
import archiver from 'archiver'

//let archiver = require('archiver');

export async function zip(path: string): Promise<string> {
  return new Promise(resolve => {
    // Do the archival work here.
    const manifestfile = readFileSync(`${path}/manifest.json`, 'utf-8')
    const manifest = JSON.parse(manifestfile)
    /*
    {"meta": {
      "name": "Sample App",
      "version": "0.0.1",
      "minimum-overwolf-version": "0.92.300.0",
      "author": "Overwolf",
      "icon": "icon.png",
      "icon_gray": "icon_gray.png",
      "description": """
     },
    }*/
    const appname = manifest.meta.name
    const appversion = manifest.meta.version
    const zipname = `${appname}-${appversion}.opk`

    const zippath = `${__dirname}/${zipname}`
    const output = createWriteStream(zippath)
    const archive = archiver('zip')

    archive.on('warning', function (err: Error) {
      throw err
    })

    archive.on('error', function (err: Error) {
      throw err
    })

    output.on('close', function () {
      console.log(`${archive.pointer()} bytes written `)
      core.setOutput('zippath', zippath)
      core.setOutput('zipname', zipname)
      resolve(zippath)
    })

    archive.pipe(output)
    console.log(path)
    archive.directory(path, false)
    archive.finalize()
  })
}
