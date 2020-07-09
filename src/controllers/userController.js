const express = require('express');
const app = express();
const path = require('path');
const dbPath = path.resolve(__dirname,'../../drawoft');
const appDao = new (require('../dataBase/appDao'))(dbPath);
const userRepository = new(require('../repository/userRepository'))(appDao);

app.get("/user/:id", async (req, res) => {
    let id = req.params.id
    try {
        let result = await userRepository.getById(id);
        
        if (!result) {
            res.status(400).json({
                ok:true,
                err:{
                    message: 'user not found'
                }
            });
        }; 
        
        res.json({
            ok:true,
            result
        });
    } catch (e){
        return res.status(500).json({
            ok:false,
            e
        })
    };
});


app.get('/user',async(req,res) => {
    let result;
    try {
        result = await userRepository.getFilter(req.query);
        if (!result) {
            res.status(400).json({
                ok:true,
                err:{
                    message: 'users not found'
                }
            });
        }; 
        res.json({
            ok:true,
            result
        }); 
    } catch (e){
        return res.status(500).json({
            ok:false,
            e
        })
    };
});

app.post('/user',async(req,res) => {
    let user = req.body;
    data = getData(user);
    try{
        let result = await userRepository.insert(data);
        res.json({
            ok:true,
            id:result.id
        }); 
    
    } catch(e){
        return res.status(500).json({
            ok:false,
            e
        })
    }
});

app.put('/users/:id',async (req,res) => {
    let id = req.params.id;
    try {
        let user = await userRepository.getById(id);
        if (user != null && user != {}){
            let body = getBody(user,req.body);
            let result = await userRepository.update(body);
            if (result){
                return res.json({
                    ok:true,
                    result
                })
            }
        };
        return res.status(400).json({
            ok:false,
            err:{
                message:'usuario not found'
            }
        });
    } catch(e){
        return res.status(500).json({
            ok:false,
            e
        }) 
    };
});

app.delete('/user/:id',async (req,res) => {
    let id = req.params.id;

    try {
        let result = await userRepository.delete(id);
        
        if (!result) {
            res.status(400).json({
                ok:true,
                err:{
                    message: 'user not found'
                }
            });
        }; 
        
        res.json({
            ok:true,
            result
        });
    } catch (e){
        return res.status(500).json({
            ok:false,
            e
        })
    };
    
});


function getData(body){
    let data=[];
    for(let key in body){
        data.push(body[key]);
    }
    return data;
};

function getBody(user,body){
    for(let key in user){
        if (body[key]){
          user[key] = body[key]   
        } 
    };
    return user;
}



module.exports = app;