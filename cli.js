#!/usr/bin/env babel-node

import cli from 'cli'
import lispToArray from './'
import fs from 'fs'
import _m from 'mal.json/miniMAL-node'
import repl from 'repl'

const m = _m()

cli.parse({
  output: ['o', 'File to save output to', 'file'],
  exec: ['e', 'Execute']
})

cli.setUsage('lispToArray [OPTIONS] [FILE]')

cli.main(function (args, options) {
  if (args.length) {
    if (args.length !== 1) {
      cli.error('Exactly 1 input file must be supplied')
      cli.getUsage()
    }
    fs.readFile(args[0], function (err, content) {
      var out

      if (err) {
        console.log(err)
        cli.fatal(`An error occured while reading "${args[0]}"`)
      }

      out = lispToArray(String(content))
      if (options.exec) {
        out = m.eval(out)
      }
      out = JSON.stringify(out)
      if (options.output) {
        fs.writeFile(options.output, out, function (err) {
          if (err) {
            console.log(err)
            cli.fatal(`An error occured while writing "${options.output}"`)
          }
        })
      } else {
        console.log(out)
      }
    })
  } else {
    if (options.output || options.exec) {
      cli.fatal('--output and --exec can\'t be used in REPL mode')
    }

    repl.start({
      eval: function (cmd, context, filename, callback) {
        try {
          callback(JSON.stringify(m.eval(lispToArray(cmd))))
        } catch(e) {
          callback(e)
          return
        }
      }
    }).on('exit', function () {
      process.exit()
    })
  }
})
