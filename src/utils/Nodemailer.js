const nodemailer = require('nodemailer');

// Crear el transporte de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Usando Gmail (puedes usar otro servicio)
    auth: {
        user: process.env.EMAIL_USER, // Utilizar la variable de entorno
        pass: process.env.EMAIL_PASS  // Utilizar la variable de entorno
    }
});

// Función para enviar correo
const detailReservationEmail = async (reserva) => {
    try {
        // Crear el contenido del correo
        const mailOptions = {
            from: process.env.EMAIL_USER, // Correo desde donde se enviará
            to: reserva.correo, // Correo al que se enviará
            subject: 'Reservación Sunrise Adventure',
            html: `
    <body >
        <h1>Detalles de tu reservación</h1>
        <p><strong>Fecha de Inicio:</strong> ${new Date(reserva.fechaInicio).toLocaleDateString()}</p>
        <p><strong>Fecha de Fin:</strong> ${new Date(reserva.fechaFin).toLocaleDateString()}</p>
        <p><strong>Tu reservacion es para:</strong> ${reserva.cantidadPersonas} persona(s)</p>
        <p><strong>Nombre:</strong> ${reserva.nombre}</p>
        <p><strong>Correo Electrónico:</strong> ${reserva.correo}</p>
        <p><strong>Teléfono:</strong> ${reserva.telefono}</p>
        <p><strong>Estado:</strong> ${reserva.estado}</p>
        <p><strong>Tu folio de reservacion es: </strong> ${reserva.folio}</p>
        <p>Te contactaremos via ${reserva.contactPref} .</p>
        <hr>
        <h3>Gracias por tu reservación, te esperamos pronto para disfrutar de la experiencia.</h3>
        <p>Para cualquier duda o modificación, no dudes en contactarnos.</p>
        <p>¡Nos vemos pronto!</p>
        <p>Atentamente,<br>El equipo de Reservas</p>
    </body>
`,

        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);
        console.log("Correo enviado con éxito");
    } catch (error) {
        console.error("Error al enviar el correo:", error);
    }
};

//correo para enviar detalles de reservaciones Tours
const detailReservationEmailTours = async (reserva) => {
    try {
        // Crear el contenido del correo
        const mailOptions = {
            from: process.env.EMAIL_USER, // Correo desde donde se enviará
            to: reserva.correo, // Correo al que se enviará
            subject: 'Reservación Sunrise Adventure',
            html: `
    <body >
        <h1>Detalles de tu reservación</h1>
        <p><strong>Elegiste el Tour :</strong> ${reserva.tourElegido}</p>
        <p><strong>Tu folio de reservacion es: </strong> ${reserva.folio}</p>
        <p><strong>Fecha de Inicio:</strong> ${new Date(reserva.fechaInicio).toLocaleDateString()}</p>
        <p><strong>Fecha de Fin:</strong> ${new Date(reserva.fechaFin).toLocaleDateString()}</p>
        <p><strong>Cantidad de personas: </strong> ${reserva.cantidadPersonas}</p>
        <p><strong>Nombre:</strong> ${reserva.nombre}</p>
        <p><strong>Correo Electrónico:</strong> ${reserva.correo}</p>
        <p><strong>Teléfono:</strong> ${reserva.telefono}</p>
        ${reserva.hospedaje ? `
            <p><strong>Elegiste ademas opcion de hospedaje<strong/></p>
            <p><strong>Tu hospedaje es del:</strong> ${new Date(reserva.hospedaje.fechaInicio).toLocaleDateString()} 
            <strong>al</strong> ${new Date(reserva.hospedaje.fechaFin).toLocaleDateString()}</p>
        ` : ''}
        <p><strong>Estado:</strong> ${reserva.estado}</p>
        
        <p>Te contactaremos via ${reserva.contactPref} .</p>
        <hr>
        <h3>Gracias por tu reservación, te esperamos pronto para disfrutar de la experiencia.</h3>
        <p>Para cualquier duda o modificación, no dudes en contactarnos.</p>
        <p>¡Nos vemos pronto!</p>
        <p>Atentamente,<br>El equipo de Reservas</p>
    </body>
`,

        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);
        console.log("Correo enviado con éxito");
    } catch (error) {
        console.error("Error al enviar el correo:", error);
    }
};

//correo para notificar modificaciones de reserva a clientes
const modifiedReservationEmail = async (reserva) => {
    try {
        // Crear el contenido del correo
        const mailOptions = {
            from: process.env.EMAIL_USER, // Correo desde donde se enviará
            to: reserva.correo, // Correo al que se enviará
            subject: 'Confirmación de Reservación',
            html: `
    <body >
        <h1>Detalles de tu reservación actualizada</h1>
        
        <p><strong>Fecha de Inicio:</strong> ${new Date(reserva.fechaInicio).toLocaleDateString()}</p>
        <p><strong>Fecha de Fin:</strong> ${new Date(reserva.fechaFin).toLocaleDateString()}</p>
        <p><strong>Tu reservacion es para:</strong> ${reserva.cantidadPersonas} persona(s)</p>
        <p><strong>Nombre:</strong> ${reserva.nombre}</p>
        <p><strong>Correo Electrónico:</strong> ${reserva.correo}</p>
        <p><strong>Teléfono:</strong> ${reserva.telefono}</p>
        <p><strong>Estado:</strong> ${reserva.estado}</p>
        <p><strong>Tu folio de reservacion es: </strong> ${reserva.folio}</p>
        <p>Te contactaremos via ${reserva.contactPref} .</p>
        <hr>
        <h3>Gracias por tu reservación, te esperamos pronto para disfrutar de la experiencia.</h3>
        <p>Para cualquier duda o modificación, no dudes en contactarnos.</p>
        <p>¡Nos vemos pronto!</p>
        <p>Atentamente,<br>Sunrise Adventure in MagBay</p>
    </body>
`,

        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);
        console.log("Correo enviado con éxito");
    } catch (error) {
        console.error("Error al enviar el correo:", error);
    }
};


//correo que llega al admin cuando hay una reservacion nueva
const notifyReservationAdmin = async (reserva) => {
    try {
        // Crear el contenido del correo
        const mailOptions = {
            from: process.env.EMAIL_USER, // Correo desde donde se enviará
            to: process.env.EMAIL_USER , // Correo al que se enviará
            subject: `Nueva reservacion entrante con folio: ${reserva.folio}`,
            html: `
    <body >
        <h1>Nueva reservacion entrante con folio: ${reserva.folio} </h1>
        
        <h2>Detalles de reservacion<h2/>
        <p><strong>Fecha de Inicio:</strong> ${new Date(reserva.fechaInicio).toLocaleDateString()}</p>
        <p><strong>Fecha de Fin:</strong> ${new Date(reserva.fechaFin).toLocaleDateString()}</p>
        <p><strong>Nombre:</strong> ${reserva.nombre}</p>
        <p><strong>Correo Electrónico:</strong> ${reserva.correo}</p>
        <p><strong>Teléfono:</strong> ${reserva.telefono}</p>
        <p><strong>Estado:</strong> ${reserva.estado}</p>
        <p><strong>Folio de reservacion es: </strong> ${reserva.folio}</p>
        <p>Te contactaremos via ${reserva.contactPref} .</p>
        <hr>
    </body>
`,

        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);
        console.log("Correo enviado con éxito");
    } catch (error) {
        console.error("Error al enviar el correo:", error);
    }
};


//correo para contacto con admin de form ---agregar correo para enviar desde alli----
const contactForm = async (mensaje) => {
    try {
        // Crear el contenido del correo
        const mailOptions = {
            from: process.env.EMAIL_USER, // Correo desde donde se enviará
            to: process.env.EMAIL_USER , // Correo al que se enviará
            subject: "Contacto desde plataforma",
            html: `
    <body >
        <h1>El cliente: <strong>${mensaje.nombre}</strong> </h1>
        
        <h2>Tiene este mensaje para ustedes: <h2/>
        <p>${mensaje.message}</p>
        <p><strong>Datos de contacto :</strong></p>
        <p><strong>Correo Electrónico:</strong> ${mensaje.email}</p>
        <p><strong>Teléfono:</strong> ${mensaje.celular}</p>
        
    </body>
`,

        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);
       
    } catch (error) {
        console.error("Error al enviar el correo:", error.message);
    }
};

module.exports = {
    detailReservationEmail,
    modifiedReservationEmail,
    notifyReservationAdmin,
    detailReservationEmailTours,
    contactForm
};
