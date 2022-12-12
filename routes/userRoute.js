const fs = require('fs')
const { join } = require('path')
const {uuid4} = require('uuid4')

const v4 = uuid4

const filePath = join(__dirname, 'users.json')

const getUsers = ()=> {
        const data = fs.existsSync(filePath)
        ?fs.readFileSync(filePath)
        :[]
    try {
        return JSON.parse(data)
    } catch (error) {
        return[]
    }
}

const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

const userRoute = (app) => {
    //Pagina Inicial
    app.get('/', (req, res) => res.send('Bem vindo'))
    //Pagina de Login
    app.get('/login', (req, res) => res.send('Faça o login'))
    //TENTATIVA DE LOGIN #FAIL
    app.post('/login',(req, res) =>{
   
        (saveUser.forEach(element => {
            if(element.email === req.body.email && element.senha === req.body.senha){
                res.status(200).send('Login Feito')
            }else{
                res.send('Usuario ou senha incorretos')
            }
        }));                
    })

    app.route('/users/:id?')
        //Mostra Usuarios Cadastrados
        .get((req, res) => {
            const users = getUsers()
            res.send({users})
        })  
        //Registrar Usuarios
        .post((req, res) => {
            const users = getUsers()       
            users.push(req.body)     
            saveUser(users)
            res.status(201).send('Usuario criado')
        })
        //Altera dado do Usuario #FAIL
        .put((req, res) => {
            const users = getUsers()
            saveUser(users.map(user => {
                if(user.id === req.params.id){
                    return{
                        ...user,
                        ...req.body
                    }
                }else{
                    return user
                }
            }))
            res.status(200).send('Ok')
        }) 
        //Deleta Usuario
        .delete((req, res) => {
            const users = getUsers()

            saveUser(users.filter(user => user.id !== req.params.id))
            res.status(200).send('Deletado')
        })  
}

module.exports = userRoute