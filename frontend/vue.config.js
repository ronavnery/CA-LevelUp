module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `
            @import "@/styles/setup/_functions.scss";
            @import "@/styles/setup/_mixins.scss";
            @import "@/styles/setup/_variables.scss";
            
            @import "@/styles/basics/_layout.scss";
            @import "@/styles/basics/_base.scss";
            @import "@/styles/basics/_buttons.scss";
            @import "@/styles/basics/_helpers.scss";
            @import "@/styles/basics/_links.scss";
            @import "@/styles/basics/_typography.scss";

    
            @import "@/styles/global.scss";
            
            `
            }
        }
    }
};