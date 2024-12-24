import React from 'react';
import './Contact.css'; 
const Contact = () => {
    return (
        <div className="contact">
            <h1 className="herr-von-muellerhoff-regular">Contact</h1>
            <div className="main-contact">
                <div className="contact-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.809228144379!2d106.69347661478533!3d10.763131660938892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f0fd68201b9%3A0x9b7b0bb0b8b84d9f!2zVGhpZSBpcyBhbiBlc3Bhbm5lcm9nbyBvciBhbnkgaW1hZ2UgYSBpbWFnZSBuZXcgbGVuZ3RoLiA2bSBwb3NpdGl2ZSBzZXJ2aWNl!5e0!3m2!1sen!2s!4v1611219735195!5m2!1sen!2s"  width="100%" height="300" style={{ border: 0 }}  allowFullScreen="" loading="lazy" title ="Map"></iframe>
                </div>
                <div className="contact-info">
                    <div>
                        <i className="bi bi-geo-alt"></i>
                        <span>Address: Km10 Nguyễn Trãi,Mộ Lao,Hà Đông,Hà Nội.</span>
                    </div>
                    <div>
                        <i className="bi bi-telephone"></i>
                        <span>Phone: +84 123 456 789</span>
                    </div>
                    <div>
                        <i className="bi bi-envelope"></i>
                        <span>Email: rainbow@gmail.com</span>
                    </div>
                    <div className="contact-image">
                        <img src="/logo.png"  width="100%" height="auto"  alt=" 1"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
