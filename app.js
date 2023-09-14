const http = require("http");
const {createLogger, transports, format} = require('winston')
const url = require('node:url');
const PORT = 3000;

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console()
    ]
})
const groceries = []
const server = http.createServer((req, res) => {
    
    if (req.method === 'GET' && req.url === '/api/data') {
        
        logger.info("getting data")

        res.writeHead(200, { 'Content-Type': 'application/json'})
        
        res.end(JSON.stringify(groceries))

    } else if (req.method === 'POST' && req.url === '/api/data') {
        logger.info("its working")
        //const { headers, method, url } = req;
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
            
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            groceries.push(data)
            logger.info(
                `Resource created. \nName: ${data.name}\nQuantity: ${data.quantity}\nPrice: ${data.price}\nBrought: ${data.brought}`);
            res.writeHead(201, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Resource Created Successfully!'}))
        }) 
    } else if (req.method === 'PUT' && req.url === '/api/data'){
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
            logger.info("body: " + body)
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            logger.info("data: " + data)
            for(let i = 0; i < groceries.length; i++) {
                if (data.name === groceries[i].name) {
                    groceries[i] = data
                    console.log(groceries[i])
                }
            }

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Resource Updated Successfully!'}));
        });
    }else if(req.method === "DELETE"){
        const requestUrl = url.parse(req.url).query;
        // name of deleted item would be in url
        // delete item
        for(let i = 0; i < groceries.length; i++) {
            
            if (requestUrl === groceries[i].name) {
                groceries.splice(i, 1)
                
            }
        }
        console.log(requestUrl);

        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Resource Deleted Successfully!'}));
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
    
   /*
    const {headers, method, url} = request;
    let body = [];
    request.on('error', err => {
        logger.error(err)
    })
    .on('data', chunk => {
        body.push(chunk);
    })
    */
})



server.listen(PORT, () => {
    logger.info(`Server is listening on http://localhost:${PORT}`);
})

