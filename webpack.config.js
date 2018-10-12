const path = require('path');
let json = '';
module.exports = {
    mode: 'development',
    entry: './store.js',
    devtool: 'eval-source-map',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        watchContentBase: true,
        before: function(app) {
            app.get('/todo', function(req, res) {
                res.json(JSON.parse(json));
            });
            app.post('/todo', function(req, resp) {
                let all = ''
                req.on('data', function(data) {
                    console.log(data.toString());
                    all += data.toString();
                })
                req.on('end', function() {
                    json = all;
                    resp.end('finich');
                })
            })
        }
    }
}
