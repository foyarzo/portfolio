document.addEventListener('DOMContentLoaded', () => {
    const showFormBtn = document.getElementById('show-form-btn');

    showFormBtn.addEventListener('click', () => {
        Swal.fire({
            title: 'Contacto',
            html: `
            <form id="contact-form">
            <div class="form-group">
                <label for="name" class="form-label">
                    <i class="fas fa-user"></i> Nombre
                </label>
                <input type="text" class="swal2-input" id="name" required>
            </div>
            <div class="form-group">
                <label for="email" class="form-label">
                    <i class="fas fa-envelope"></i> Correo Electrónico
                </label>
                <input type="email" class="swal2-input" id="email" placeholder="correo@example.cl" required>
            </div>
            <div class="form-group">
                <label for="phone" class="form-label">
                    <i class="fas fa-phone"></i> Teléfono
                </label>
                <input type="tel" class="swal2-input" id="phone" placeholder="+56 9 xxxx xxxx" >
            </div>
            <div class="form-group">
                <label for="subject" class="form-label">
                    <i class="fas fa-tag"></i> Asunto
                </label>
                <input type="text" class="swal2-input" id="subject">
            </div>
            <div class="form-group">
                <label for="message" class="form-label">
                    <i class="fas fa-comment-dots"></i> Mensaje
                </label>
                <textarea class="swal2-textarea" id="message" rows="4" placeholder="Deje su mensaje..." required></textarea>
            </div>
        </form>
        
            `,
            confirmButtonText: 'Enviar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            customClass: {
                container: 'custom-swal-container',
                popup: 'custom-swal-popup',
                confirmButton: 'custom-swal-confirm',
                cancelButton: 'custom-swal-cancel'
            },
            preConfirm: () => {
                const form = document.getElementById('contact-form');
                const name = form.querySelector('#name').value;
                const email = form.querySelector('#email').value;
                const phone = form.querySelector('#phone').value;
                const subject = form.querySelector('#subject').value;
                const message = form.querySelector('#message').value;

                if (!name || !email || !message) {
                    Swal.showValidationMessage('Por favor complete todos los campos obligatorios');
                    return false;
                }

                return { name, email, phone, subject, message };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Formulario Enviado',
                    text: `Gracias, ${result.value.name}. Hemos recibido tu mensaje.`,
                });
            }
        });
    });
});