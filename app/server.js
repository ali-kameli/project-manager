const { AllRoutes } = require('./routes/router.routes');

module.exports = class Application {
    #express = require('express');
    #app = this.#express();

    constructor(PORT, DB_URL) {
        this.configDataBase(DB_URL);
        this.configApplication();
        this.createRoutes();
        this.createServer(PORT);
        this.errorHandler();
    }
    configApplication() {
        const path = require('path');

        this.#app.use(this.#express.urlencoded({ extended: true }));
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.static(path.join(__dirname, "..", 'public')));
    }
    createServer(PORT) {
        const http = require('http');
        const server = http.createServer(this.#app);
        server.listen(PORT, () => console.log(`Server Run on > http://localhost:${PORT}`));
    }
    configDataBase(DB_URL) {
        const mongoose = require('mongoose');
        mongoose.connect(DB_URL).then(() => console.log('Connected to MongoDB...'))
    }
    errorHandler() {
        //! 404 
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'page or address not found ! '
            });
        })
        //! 500
        this.#app.use((error, req, res, next) => {
            const status = error?.status || 500;
            const message = error?.message || 'Internal Server Error';
            return res.status(500).json({
                status,
                success: false,
                message
            });
        });
    }
    createRoutes() {
        this.#app.get('/', (req, res, next) => {
            return res.json({
                message: 'New App'
            })
        })
        this.#app.use(AllRoutes) 
        // this.#app.use((err, req, res, next) => {
        //     try {
        //     } catch (error) {
        //         next(error)
        //     }
        // })
    }
}