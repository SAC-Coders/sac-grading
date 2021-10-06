import config from '../config'
import { auth } from '../firebase.config'
import { signOut } from 'firebase/auth'
import { Button } from 'react-bootstrap';
import { useContext } from 'react'
import { AuthContext } from './Auth';

const footerStyle = {
  backgroundColor: "#fcfcfc",
  fontSize: "12px",
  color: "black",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "6px",
  position: "fixed",
  bottom: "0",
  width: "100%"
};


const Footer = () => {

  const { currentUser } = useContext(AuthContext)


  return (

    <div style={footerStyle}>
      <span className="justify-content-center">Contact {config.membership_contact} for grading questions. Contact {config.website_contact} for website issues.</span>
      <Button variant="secondary" disabled={!currentUser} onClick={() => signOut(auth)} style={{ float: 'left', fontSize: '12px', padding: '1px 4px' }}>Log Out</Button>
    </div >

  )
}

export default Footer
