import {connect} from 'mongoose';

const conectarBD = async () => {
return await connect("mongodb+srv://innova:admin@cluster0.7qzcg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    )
    .then(()=>{
        console.log('Conexion exitosa');

    })
    .catch((e)=>{
        console.error('Error conectando a la bd',e);
    });
};

export default conectarBD;



