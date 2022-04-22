const { Tasks } = require("../models/models")
const ApiError = require('../error/ApiError')
const uuid = require("uuid")
const path = require("path")

class TaskController {

    async getTasks(req, res) {
        let {limit = 3, page = 1, sort_direction =  "asc", sort_field = "id"} = req.body;
        console.log(req.body)
        let offset = page * limit - limit;

        const tasks = await Tasks.findAndCountAll({limit, offset, order: [[sort_field, sort_direction]]})
        return res.json(tasks);
    }
    async getTask(req, res, next) {
        let {id} = req.params;

        const task = await Tasks.findOne({where: {id}})
        if (task) {
            return res.json(task);
        } else {
            return next(ApiError.internal("Таск не знайдено"))
        }
        
    }

    async createTask(req, res, next) {
        let pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        let filename;
        console.log(req.body)
        let { email, username, text, status } = req.body
        console.log(req.files)
        if (req.files?.img) {
            const {img} = req.files
            console.log(img)
            filename = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, "..", "static", filename))
        }
        
        if (!email?.length || !username?.length || !text?.length || !(status >= 0)) {
            return next(ApiError.badRequest("Пусте значення обовязкового поля"))
        }
        if (!pattern.test(email)) {
            return next(ApiError.badRequest("Неправильний формат email:" + email))
        }

        const type = await Tasks.create({ email, username, text, status, image_path:filename })
        return res.json(type);
    }

    async updateTask(req, res) {
        let filename;
        console.log(req.body)
        let {id} = req.params
        let { text, status } = req.body
        console.log(req.files)
        if (req.files?.img) {
            const {img} = req.files
            console.log(img)
            filename = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, "..", "static", filename))
        }
        
        if (!text?.length || !(status >= 0)) {
            return next(ApiError.badRequest("Пусте значення обовязкового поля"))
        }

        const type = await Tasks.update({text: text, status:status}, {where: {id}})
        return res.json(type);
    }

    async deleteTask(req, res) {
        let {id} = req.params;
        const destroy = await Tasks.destroy({where: {id}})
        return res.json({message:"Таск видалено"});
    }   
}

module.exports = new TaskController();