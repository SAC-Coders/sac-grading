import { useState } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap'
import icon from "../media/icon-red.png"
import { useHistory } from 'react-router-dom';


const NavigationBar = (props) => {

  const [gradingView, setGradingView] = useState("Membership")

  const history = useHistory();

  const handleSubmit = (e) => {

    const applicantID = e.target[0].value
    e.preventDefault()
    //todo get the correct application data and display it here
    if (applicantID.length === 0) {
      alert('No Applicant ID Entered')
    }
    else if (!isNaN(applicantID) && !isNaN(parseFloat(applicantID)) && parseInt(applicantID) > 0) {
      // console.log(`/${gradingView.toLowerCase()}/${applicantID}`)
      history.push(`/${gradingView.toLowerCase()}/${applicantID}`);
    }
    else {
      alert('Invalid Applicant ID: \nMust be integer greater than 0')
    }
  }
  return (
    <Navbar collapseOnSelect expand="md" bg="light" variant="light" className="m-3 shadow p-3 mb-5 rounded">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={icon}
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title={`SAC ${gradingView} Application Grading 2021-22`} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => setGradingView("Membership")}>Membership</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setGradingView("Scholarship")}>Scholarship</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Form className="d-flex" onSubmit={(e) => handleSubmit(e)}>
              <FormControl
                type="search"
                placeholder="Applicant ID"
                className="me-2"
              />
              <Button type="submit" variant="outline-primary">Go</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
