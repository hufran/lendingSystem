module.exports = {
    plugins: [
        new webpack.LoaderOptionsPlugin({  
            options: {  
                postcss: function(){  
                    return [  
                        require("autoprefixer")({  
                            browsers: ['ie>=8','>1% in CN']  
                        })  
                    ]  
                }  
            }  
        }) 
    ]
}