class AboutController{
    getProjectInfo(req, res){
        res.json({
            "applicationName":"Check-IA",
            "version":"v0.1.0"
        });
    }
}

module.exports = AboutController;