const{contactForm} = require("../utils/Nodemailer")
//EndPoint para formulario contacto:

const formContact = async (req, res) => {
    try {

        const{nombre, celular, email, message} = req.body;

        if(!nombre || !celular || !email || !message){
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }
    
        const mensaje = { ...req.body };
        
    
        await contactForm(mensaje)
        res.status(201).json({ msg: "Mensaje enviado con exito"});

    } catch (error) {
        res.status(400).send({ msg: "error al enviar el correo de contacto", error: error.message });
    }

}

module.exports= {
    formContact
}