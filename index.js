
const Joi =  require('joi');
const express=require('express');

const app=express();
app.use(express.json());

const books = [
    
        {id:1, name:"java"},
        {id:2, name:'dart'},
        {id:3, name:'python'}
    
];


app.get('/',(req,res)=>{
    res.send('hello world!!!');

});

app.get('/api/bok',(req,res)=>{
res.send([1,3,6])});

//PORT

// /api/course/1

app.get('/api/book/:id',(req,res)=>{
    res.send(req.params.id);
});

app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.params);
    // res.send(req.query);

});

app.get('/api/book',(req,res)=>{
    const book = books.find(c=>c.id==parseInt(req.params.id));
    // if(!book) res.status(404).send('no data with that id');
        
    res.send(book);
});



app.post('/api/book',(req,res)=>{

    const {error}=validateCourse(req.body);
    if(error){
        res.status(400).send("error.details[0].message");
        return;
    }
    // const schema={
    //  name:Joi.string().min(4).required()
    // };
    // const result=Joi.valid(req.body,schema);
    // // console.log(result);

// if(result.error){
//    res.status(400).send(result.error.);
//     return;
// }
    if(req.body.name==null||req.body.name<3){
        //400 bad request
        res.status(400).send('name is requires and shoud be minimum 3 character');
        return;
    }
    const course= {
        id:books.length+1,
        name:req.body.name
    };
    books.push(course);
    res.send(course);

});


//update

app.put('/api/book/:id',(req,res)=>{
    const book = books.find(c=>c.id==parseInt(req.params.id));
    if(!book) return res.status(404).send('no data with that id');
        
    const result=validateCourse(req.body);
    const {error}=validateCourse(req.body);
    if(error) return  res.status(400).send("error.details[0].message");
     
    book.name=req.body.name;
    res.send(book);

});

//delete


app.delete('/api/book/:id',(req,res)=>{

    const book = books.find(c=>c.id==parseInt(req.params.id));
    if(!book)return res.status(404).send('no data with that id');
        

    books.indexOf(book);
    books.splice(2,1);
    res.send(book);

})



const port=process.env.PORT||3000;
app.listen(port,()=>
    console.log(`listening to ${port}..`)
    );


function  validateCourse(course) {
    const schema={
        name:Joi.string().min(3).required()
    };
    return Joi.valid(course,schema);
    
}
