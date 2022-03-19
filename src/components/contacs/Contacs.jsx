import React from 'react'
import "./contacs.scss"
import imge from "../../assets/shake.svg"


export default function Contacs() {
  /* const nodemailer = nodemailer

  let trasporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "casellaindesiderata@gmail.com",
      pass: "Spam2019"
    },
    tls: {
      rejectUnauthorized: false
    }
  })
  let mailOptions = {
    from: "casellaindesiderata@gmail.com",
    to: "francescosardo91@gmail.com",
    subject: "Ciao",
    text: "provamail"
  }
  trasporter.sendMail(mailOptions, function(err, succes){
    if(err){
      console.log("errore")
    }else{
      console.log("mail invita")
    }
  }) */
  
  return (
    <div className='contacs' id='contacs'>
      <div className="left">
        <img src={imge} alt="" />
      </div>
      <div className="right">
        <h2>Contacs</h2>
        <form action="">
          <input type="text" placeholder='email' />
          <textarea /* name="" id="" cols="30" rows="10" */ placeholder='message'></textarea>
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}
