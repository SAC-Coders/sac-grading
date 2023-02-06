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

  const getFooter = () => {
    if (config.membership_enabled && config.scholarship_enabled) {
      return (<span className="justify-content-center"> Contact {config.membership_contact} for membership grading questions.  Contact {config.scholarship_contact} for scholarship grading questions. </span>)
    } else if(config.membership_enabled) {
      return (<span className="justify-content-center"> Contact {config.membership_contact} for membership grading questions. </span>)
    } else if(config.scholarship_enabled) {
      return (<span className="justify-content-center"> Contact {config.scholarship_contact} for scholarship grading questions. </span>)
    }
  }
  
  return (

    <div style={footerStyle}>
      {getFooter()}
      <span className="justify-content-center"> Contact {config.website_contact} for website issues. Website created by Jeff Bonner.</span>
      <Button variant="secondary" disabled={!currentUser} onClick={() => signOut(auth)} style={{ float: 'left', fontSize: '12px', padding: '1px 4px' }}>Log Out</Button>
    </div >

  )
}

export default Footer
