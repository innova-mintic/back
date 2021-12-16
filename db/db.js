import mongoose from 'mongoose';

const conectarBD = async () => {
return await mongoose.connect(process.env.DATABASE_URL)
    .then((db)=>{
        console.log(process.env.DATABASE_URL)
        console.log('Conexion exitosa');

    })
    .catch((e)=>{
        console.error('Error conectando a la bd',e);
    });
};

export default conectarBD;



