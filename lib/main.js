const exec = require('child_process').exec;

function execute(cmd, fn) {
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            console.error(`exec error: ${err}`)
            fn(err)
        }

        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
        fn()
    })
}

execute('go get github.com/mitchellh/gox', (err) => {
    if (err) {
        return
    }
    execute('$HOME/go/bin/gox -os="linux darwin windows" -arch="amd64" -ldflags "-X main.Rev=`git rev-parse --short HEAD` -X main.Version=`git describe --abbrev=0 --tags`" -verbose ./...', (err) => {
        return
    })
})
