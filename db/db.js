import mongoose from 'mongoose';


const conectarBD = () => {
    return  mongoose.connect(process.env.DATABASE_URL)
        .catch((e)=>{
            console.error('Error conectando a la bd',e);
        })
        .then(()=>{
            console.log('Conexion exitosa');
        });

};

export { conectarBD };