const projects = require('../models/projectModel')

// add project 
exports.addProjectController = async (req, res) => {
    console.log('Inside addProjectController');
    const userId = req.userId
    console.log(userId);
    const { title, language, overview, github, website, } = req.body
    const projectImg = req.file.filename
    console.log(title, language, overview, github, website, projectImg);

    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json("Project  already exist in our collection... please upload another!!!!")
        } else {
            const newProject = new projects({
                title, language, overview, github, website, projectImg, userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    } catch (err) {
        res.status(401).json(err)
    }
}




// get home page project
exports.homePageProjectController = async (req, res) => {
    console.log("Inside homePageProjectController ");
    try {
        const allHomeProjects = await projects.find().limit(3)
        res.status(200).json(allHomeProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get all project -need of authorisation
exports.allProjectController = async (req, res) => {

    console.log("Inside allProjectController ");

    const searchkey = req.query.search
    console.log(searchkey);
    const query = {
        languages: {
            $regex: searchkey, $options: 'i'

        }
    }
    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get user project -need of authorisation
exports.userProjectController = async (req, res) => {

    console.log("Inside userProjectController ");
    const userId = req.userId
    try {
        const alluserProjects = await projects.find({ userId })
        res.status(200).json(alluserProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

// editproject - need authorisation


exports.editProjectController = async (req, res) => {
    console.log("Inside editProjectController ");
    const id = req.params.id
    const userId = req.userId
    const { title, language, overview, github, website, projectImg } = req.body
    const reUploadProjectImg = req.file ? req.file.filename : projectImg
    try {
        const updateProject = await projects.findByIdAndUpdate({ _id: id }, {
            title, language, overview, github, website, projectImg: reUploadProjectImg, userId
        }, { new: true })
        await updateProject.save()
        res.status(200).json(updateProject)
    } catch (err) {
        res.status(401).json(err)
    }
}

// removeproject - need auth
exports.removeProjectController = async (req, res) => {
    console.log("Inside removeProjectController ");
    const {id} = req.params
    try {
        const deleteProject = await projects.findByIdAndDelete({_id: id})
        res.status(200).json(deleteProject)
    } catch (err) {
        res.status(401).json(err)
    }
}


